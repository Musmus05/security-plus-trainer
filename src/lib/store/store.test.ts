import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { XP } from '@/domain/gamification';
import { createFixedClock } from '@/lib/clock';

import { STORE_VERSION } from './migrations';
import { INITIAL_GAMIFICATION, MAX_EXAM_HISTORY } from './progress.schema';
import { DEFAULT_SETTINGS } from './settings.schema';
import { setClockForTests, STORAGE_KEY, useAppStore } from './store';

/** Write a persisted blob in the shape zustand's `persist` middleware expects. */
function seedStorage(state: unknown, version: number = STORE_VERSION): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, version }));
}

function reset(): void {
  useAppStore.setState({
    settings: { ...DEFAULT_SETTINGS },
    gamification: INITIAL_GAMIFICATION,
    progress: {},
    srs: {},
    currentExam: null,
    examHistory: [],
    seenQuestions: {},
    lastStreakOutcome: null,
  });
}

describe('settings', () => {
  beforeEach(() => {
    localStorage.clear();
    reset();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts from the defaults', () => {
    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('updates one setting without disturbing the others', () => {
    useAppStore.getState().setLocale('en');

    expect(useAppStore.getState().settings).toEqual({ ...DEFAULT_SETTINGS, locale: 'en' });
  });

  it('persists only data, never the actions or the transient outcome', () => {
    useAppStore.getState().setTheme('dark');

    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {
      state?: Record<string, unknown>;
    };

    expect(Object.keys(persisted.state ?? {}).sort()).toEqual([
      'currentExam',
      'examHistory',
      'gamification',
      'progress',
      'seenQuestions',
      'settings',
      'srs',
    ]);
  });

  it('repairs a partially corrupt blob instead of discarding it', () => {
    seedStorage({ settings: { locale: 'en', theme: 'banana', dailyGoalXp: 'lots' } });

    void useAppStore.persist.rehydrate();

    const { settings } = useAppStore.getState();
    expect(settings.locale).toBe('en');
    expect(settings.theme).toBe(DEFAULT_SETTINGS.theme);
    expect(settings.dailyGoalXp).toBe(DEFAULT_SETTINGS.dailyGoalXp);
  });

  it('falls back to defaults for a state written by a newer build', () => {
    seedStorage({ settings: { locale: 'en' } }, STORE_VERSION + 1);

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('migrates a version 1 blob without losing the learner’s settings', () => {
    // Version 1 held settings only. The 1 → 2 migration is additive, and this is the test that
    // proves the additive case does not quietly reset anything.
    seedStorage({ settings: { ...DEFAULT_SETTINGS, locale: 'en', dailyGoalXp: 250 } }, 1);

    void useAppStore.persist.rehydrate();

    const state = useAppStore.getState();
    expect(state.settings.locale).toBe('en');
    expect(state.settings.dailyGoalXp).toBe(250);
    expect(state.gamification).toEqual(INITIAL_GAMIFICATION);
    expect(state.progress).toEqual({});
    expect(state.srs).toEqual({});
  });

  it('migrates a version 2 blob without losing XP, streak or progress', () => {
    /*
     * Version 2 predates the review schedule. Losing a learner's streak and XP to a deployment is
     * the failure this whole migration machinery exists to prevent, so the fixture carries real
     * values rather than the initial state — an assertion against the defaults would pass even if
     * the migration wiped everything.
     */
    seedStorage(
      {
        settings: { ...DEFAULT_SETTINGS, locale: 'en' },
        gamification: {
          totalXp: 480,
          streak: { current: 6, longest: 9, lastCompletedDay: '2026-03-11', freezes: 1 },
          ledger: { '2026-03-11': 55 },
        },
        progress: { '1.1': { lessonRead: true, quizAttempts: 3, bestAccuracy: 0.9 } },
      },
      2,
    );

    void useAppStore.persist.rehydrate();

    const state = useAppStore.getState();
    expect(state.gamification.totalXp).toBe(480);
    expect(state.gamification.streak.current).toBe(6);
    expect(state.progress['1.1']?.bestAccuracy).toBe(0.9);
    // The new key is simply absent from the old blob and coerces to an empty schedule.
    expect(state.srs).toEqual({});
  });
});

describe('progress and XP', () => {
  beforeEach(() => {
    localStorage.clear();
    reset();
    setClockForTests(createFixedClock('2026-08-05T10:00:00Z'));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('pays for a lesson the first time and never again', () => {
    // Re-reading paying XP would make refreshing a page the cheapest route to a streak.
    const store = useAppStore.getState();
    store.markLessonRead('1.1');
    const afterFirst = useAppStore.getState().gamification.totalXp;

    useAppStore.getState().markLessonRead('1.1');

    expect(afterFirst).toBe(XP.lessonRead);
    expect(useAppStore.getState().gamification.totalXp).toBe(XP.lessonRead);
  });

  it('records a quiz attempt and keeps the best accuracy, not the latest', () => {
    useAppStore.getState().recordQuizAttempt('2.3', 9, 10);
    useAppStore.getState().recordQuizAttempt('2.3', 4, 10);

    const record = useAppStore.getState().progress['2.3'];
    expect(record?.quizAttempts).toBe(2);
    expect(record?.bestAccuracy).toBe(0.9);
  });

  it('treats taking a quiz as having read the lesson', () => {
    useAppStore.getState().recordQuizAttempt('3.1', 5, 10);

    expect(useAppStore.getState().progress['3.1']?.lessonRead).toBe(true);
  });

  it('ignores a quiz with no questions rather than dividing by zero', () => {
    useAppStore.getState().recordQuizAttempt('3.1', 0, 0);

    expect(useAppStore.getState().progress['3.1']).toBeUndefined();
    expect(useAppStore.getState().gamification.totalXp).toBe(0);
  });

  it('accumulates XP in the day’s ledger', () => {
    useAppStore.getState().markLessonRead('1.1');
    useAppStore.getState().markLessonRead('1.2');

    expect(useAppStore.getState().gamification.ledger['2026-08-05']).toBe(XP.lessonRead * 2);
  });

  it('pays the daily-goal bonus exactly once, however much XP follows', () => {
    /*
     * The bonus itself adds XP, so an unguarded implementation pays again on every award that lands
     * after the goal is reached. With a 50 XP goal, lessons at 20 XP each cross it on the third, so
     * the fourth is the one that would trigger a second payment.
     */
    useAppStore.getState().setDailyGoalXp(50);

    useAppStore.getState().markLessonRead('1.1');
    useAppStore.getState().markLessonRead('1.2');
    useAppStore.getState().markLessonRead('1.3');
    useAppStore.getState().markLessonRead('1.4');

    const expected = XP.lessonRead * 4 + XP.dailyGoalMet;
    expect(useAppStore.getState().gamification.totalXp).toBe(expected);
  });

  it('starts the streak once the goal is met, and not before', () => {
    // Two lessons at 20 XP each land exactly on a 40 XP goal, so this also covers the boundary.
    useAppStore.getState().setDailyGoalXp(40);

    useAppStore.getState().markLessonRead('1.1');
    expect(useAppStore.getState().gamification.streak.current).toBe(0);
    expect(useAppStore.getState().lastStreakOutcome).toBe('incomplete');

    useAppStore.getState().markLessonRead('1.2');
    expect(useAppStore.getState().gamification.streak.current).toBe(1);
    expect(useAppStore.getState().lastStreakOutcome).toBe('started');
  });

  it('extends the streak on a following day', () => {
    useAppStore.getState().setDailyGoalXp(20);

    useAppStore.getState().markLessonRead('1.1');
    expect(useAppStore.getState().gamification.streak.current).toBe(1);

    setClockForTests(createFixedClock('2026-08-06T10:00:00Z'));
    useAppStore.getState().markLessonRead('1.2');

    expect(useAppStore.getState().gamification.streak.current).toBe(2);
    expect(useAppStore.getState().lastStreakOutcome).toBe('extended');
  });

  it('does not double-count a day when more XP arrives after the goal', () => {
    useAppStore.getState().setDailyGoalXp(20);

    useAppStore.getState().markLessonRead('1.1');
    useAppStore.getState().markLessonRead('1.2');
    useAppStore.getState().markLessonRead('1.3');

    expect(useAppStore.getState().gamification.streak.current).toBe(1);
  });

  it('records a passed exam with its bonus', () => {
    useAppStore.getState().finishExam({
      scope: 'full',
      correct: 80,
      total: 90,
      unanswered: 0,
      scaled: 811,
      passed: true,
      byDomain: [{ domain: 1, correct: 10, total: 11 }],
    });

    expect(useAppStore.getState().gamification.totalXp).toBeGreaterThanOrEqual(
      XP.examCompleted + XP.examPassed,
    );
  });

  it('restores gamification state and progress across a rehydrate', () => {
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: {
        totalXp: 1240,
        streak: { current: 7, longest: 12, lastCompletedDay: '2026-08-04', freezes: 1 },
        ledger: { '2026-08-04': 160 },
      },
      progress: { '4.6': { lessonRead: true, quizAttempts: 2, bestAccuracy: 0.9 } },
    });

    void useAppStore.persist.rehydrate();

    const state = useAppStore.getState();
    expect(state.gamification.totalXp).toBe(1240);
    expect(state.gamification.streak.longest).toBe(12);
    expect(state.progress['4.6']?.bestAccuracy).toBe(0.9);
  });

  it('keeps the XP total when the streak record is corrupt', () => {
    // Total XP is the one number a learner would genuinely mourn, so it survives its neighbours.
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: { totalXp: 5000, streak: 'nonsense', ledger: { bad: 'data' } },
      progress: {},
    });

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().gamification.totalXp).toBe(5000);
    expect(useAppStore.getState().gamification.streak).toEqual(INITIAL_GAMIFICATION.streak);
  });

  it('drops only the broken progress entries', () => {
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: INITIAL_GAMIFICATION,
      progress: {
        '1.1': { lessonRead: true, quizAttempts: 1, bestAccuracy: 0.8 },
        '9.9': { lessonRead: true, quizAttempts: 1, bestAccuracy: 0.8 },
        '1.2': { lessonRead: 'yes' },
      },
    });

    void useAppStore.persist.rehydrate();

    expect(Object.keys(useAppStore.getState().progress)).toEqual(['1.1']);
  });

  it('resetAll clears progress, gamification and the review schedule', () => {
    useAppStore.getState().markLessonRead('1.1');
    useAppStore.getState().gradeCard('acr:AAA', 'good');
    useAppStore.getState().setLocale('en');

    useAppStore.getState().resetAll();

    const state = useAppStore.getState();
    expect(state.settings).toEqual(DEFAULT_SETTINGS);
    expect(state.gamification).toEqual(INITIAL_GAMIFICATION);
    expect(state.progress).toEqual({});
    expect(state.srs).toEqual({});
  });
});

describe('questions already met', () => {
  beforeEach(() => {
    localStorage.clear();
    reset();
    setClockForTests(createFixedClock('2026-03-12T09:00:00Z'));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('counts sightings rather than flagging them', () => {
    // A count keeps degrading once everything has been seen — "least often" is still a useful
    // ordering when "never" has run out.
    useAppStore.getState().markQuestionsSeen(['q-1-1-001']);
    useAppStore.getState().markQuestionsSeen(['q-1-1-001']);

    expect(useAppStore.getState().seenQuestions['q-1-1-001']).toBe(2);
  });

  it('counts a repeat within one call once', () => {
    // Revealing the same question twice in a sitting is one sighting; counting it twice would age
    // a question the learner met once.
    useAppStore.getState().markQuestionsSeen(['q-1-1-001', 'q-1-1-001', 'q-1-1-002']);

    expect(useAppStore.getState().seenQuestions).toEqual({ 'q-1-1-001': 1, 'q-1-1-002': 1 });
  });

  it('does nothing for an empty list', () => {
    const before = useAppStore.getState().seenQuestions;
    useAppStore.getState().markQuestionsSeen([]);

    expect(useAppStore.getState().seenQuestions).toBe(before);
  });

  it('survives a reload', () => {
    useAppStore.getState().markQuestionsSeen(['q-4-6-003']);

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().seenQuestions['q-4-6-003']).toBe(1);
  });

  it('drops only the broken entries from a corrupt map', () => {
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: INITIAL_GAMIFICATION,
      seenQuestions: { 'q-1-1-001': 2, 'q-1-1-002': 0, 'q-1-1-003': 'many', 'q-1-1-004': -1 },
    });

    void useAppStore.persist.rehydrate();

    // Zero and negative counts are not "seen fewer times", they are nonsense — a question is
    // either met or absent from the map.
    expect(useAppStore.getState().seenQuestions).toEqual({ 'q-1-1-001': 2 });
  });

  it('resetAll clears it', () => {
    useAppStore.getState().markQuestionsSeen(['q-1-1-001']);
    useAppStore.getState().resetAll();

    expect(useAppStore.getState().seenQuestions).toEqual({});
  });

  it('migrates a version 5 blob, which simply had none', () => {
    /*
     * An older blob reads as "nothing seen yet", so the first exam after upgrading is drawn as if
     * nothing had been drilled. A one-off inaccuracy in the learner's favour, and not worth
     * reconstructing a history the app never kept.
     */
    seedStorage(
      {
        settings: { ...DEFAULT_SETTINGS, locale: 'en' },
        gamification: { ...INITIAL_GAMIFICATION, totalXp: 300 },
      },
      5,
    );

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().gamification.totalXp).toBe(300);
    expect(useAppStore.getState().seenQuestions).toEqual({});
  });
});

describe('mock exams', () => {
  const attempt = {
    scope: 'full' as const,
    questionIds: ['q-1-1-001', 'q-2-1-002', 'q-4-6-003'],
    answers: { 'q-1-1-001': ['a'] },
    flagged: ['q-2-1-002'],
    index: 1,
    startedAt: 1_800_000_000_000,
    durationMs: 90 * 60 * 1000,
    seed: 12_345,
  };

  beforeEach(() => {
    localStorage.clear();
    reset();
    setClockForTests(createFixedClock('2026-03-12T09:00:00Z'));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('keeps an attempt in progress across a reload', () => {
    // The one piece of state where losing it costs the learner ninety minutes of their evening.
    useAppStore.getState().startExam(attempt);

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().currentExam).toEqual(attempt);
  });

  it('clears the attempt and files the result in a single write', () => {
    /*
     * Two separate `set` calls would leave a persisted state where the exam is both finished and
     * still in progress, and a reload landing in that window would drop the candidate back into an
     * exam they had already submitted.
     */
    useAppStore.getState().startExam(attempt);
    useAppStore.getState().finishExam({
      scope: 'full',
      correct: 70,
      total: 90,
      unanswered: 2,
      scaled: 722,
      passed: false,
      byDomain: [{ domain: 1, correct: 8, total: 11 }],
    });

    const state = useAppStore.getState();
    expect(state.currentExam).toBeNull();
    expect(state.examHistory).toHaveLength(1);
    expect(state.examHistory[0]).toMatchObject({ scaled: 722, passed: false });
  });

  it('stamps the result with the clock rather than trusting the caller', () => {
    useAppStore.getState().finishExam({
      scope: 'full',
      correct: 1,
      total: 1,
      unanswered: 0,
      scaled: 900,
      passed: true,
      byDomain: [],
    });

    expect(useAppStore.getState().examHistory[0]?.at).toBe(Date.parse('2026-03-12T09:00:00Z'));
  });

  it('abandoning an attempt files no result', () => {
    useAppStore.getState().startExam(attempt);
    useAppStore.getState().abandonExam();

    expect(useAppStore.getState().currentExam).toBeNull();
    expect(useAppStore.getState().examHistory).toEqual([]);
  });

  it('caps the history rather than growing it for ever', () => {
    // An unbounded history is a slow leak in a store measured in a few megabytes.
    for (let i = 0; i < MAX_EXAM_HISTORY + 5; i += 1) {
      useAppStore.getState().finishExam({
        scope: 'full',
        correct: i,
        total: 90,
        unanswered: 0,
        scaled: 100 + i,
        passed: false,
        byDomain: [],
      });
    }

    expect(useAppStore.getState().examHistory).toHaveLength(MAX_EXAM_HISTORY);
  });

  it('discards an attempt whose index points past its questions', () => {
    /*
     * Half an exam is not a shorter exam — the domain weighting is the entire point of the format.
     * An index past the end would render a blank question with no way forward, so the attempt is
     * dropped rather than repaired.
     */
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: INITIAL_GAMIFICATION,
      currentExam: { ...attempt, index: 99 },
    });

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().currentExam).toBeNull();
  });

  it('drops only the broken entries from a corrupt history', () => {
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: INITIAL_GAMIFICATION,
      examHistory: [
        {
          at: 1_800_000_000_000,
          correct: 70,
          total: 90,
          unanswered: 0,
          scaled: 722,
          passed: false,
          byDomain: [],
        },
        { at: 'yesterday', correct: 70, total: 90, unanswered: 0, scaled: 722, passed: false },
      ],
    });

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().examHistory).toHaveLength(1);
  });
});

describe('spaced repetition', () => {
  beforeEach(() => {
    localStorage.clear();
    reset();
    setClockForTests(createFixedClock('2026-03-12T09:00:00Z'));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('creates a schedule for a card graded for the first time', () => {
    useAppStore.getState().gradeCard('acr:SIEM', 'good');

    const card = useAppStore.getState().srs['acr:SIEM'];
    expect(card).toBeDefined();
    expect(card?.due).toBe('2026-03-13');
    expect(card?.reps).toBe(1);
  });

  it('pays XP for the review whatever the grade', () => {
    // The economy rewards the work, not the outcome: paying only for remembered cards would teach
    // the learner to review what they already know.
    useAppStore.getState().gradeCard('acr:AAA', 'again');
    const afterFailure = useAppStore.getState().gamification.totalXp;

    useAppStore.getState().gradeCard('acr:ACL', 'easy');
    const afterSuccess = useAppStore.getState().gamification.totalXp;

    expect(afterFailure).toBe(XP.flashcardReviewed);
    expect(afterSuccess - afterFailure).toBe(XP.flashcardReviewed);
  });

  it('advances an existing schedule rather than starting it over', () => {
    useAppStore.getState().gradeCard('acr:AAA', 'good');
    useAppStore.getState().gradeCard('acr:AAA', 'good');

    expect(useAppStore.getState().srs['acr:AAA']?.reps).toBe(2);
  });

  it('leaves a forgotten card due today so it comes back in the same session', () => {
    useAppStore.getState().gradeCard('acr:AAA', 'good');
    useAppStore.getState().gradeCard('acr:AAA', 'again');

    const card = useAppStore.getState().srs['acr:AAA'];
    expect(card?.due).toBe('2026-03-12');
    expect(card?.lapses).toBe(1);
  });

  it('writes no schedule for cards that were never graded', () => {
    // 320 pre-seeded initial states would persist a schedule for cards the learner may never open.
    useAppStore.getState().gradeCard('acr:AAA', 'good');

    expect(Object.keys(useAppStore.getState().srs)).toEqual(['acr:AAA']);
  });

  it('drops only the broken cards from a corrupt schedule', () => {
    seedStorage({
      settings: DEFAULT_SETTINGS,
      gamification: INITIAL_GAMIFICATION,
      srs: {
        'acr:AAA': { ease: 2.5, intervalDays: 6, due: '2026-03-20', reps: 2, lapses: 0 },
        // An ease this high would schedule the card past any horizon the learner will ever reach,
        // and they would simply never see it again — a silent loss, the worst kind.
        'acr:ACL': { ease: 1e9, intervalDays: 6, due: '2026-03-20', reps: 2, lapses: 0 },
        'acr:AES': { ease: 2.5, intervalDays: 6, due: 'tomorrow', reps: 2, lapses: 0 },
      },
    });

    void useAppStore.persist.rehydrate();

    expect(Object.keys(useAppStore.getState().srs)).toEqual(['acr:AAA']);
  });

  it('keeps the schedule across a reload', () => {
    useAppStore.getState().gradeCard('acr:AAA', 'good');

    void useAppStore.persist.rehydrate();

    expect(useAppStore.getState().srs['acr:AAA']?.reps).toBe(1);
  });
});
