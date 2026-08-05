import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { XP } from '@/domain/gamification';
import { createFixedClock } from '@/lib/clock';

import { STORE_VERSION } from './migrations';
import { INITIAL_GAMIFICATION } from './progress.schema';
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
      'gamification',
      'progress',
      'settings',
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
    useAppStore.getState().recordExamAttempt(true);

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

  it('resetAll clears progress and gamification as well as settings', () => {
    useAppStore.getState().markLessonRead('1.1');
    useAppStore.getState().setLocale('en');

    useAppStore.getState().resetAll();

    const state = useAppStore.getState();
    expect(state.settings).toEqual(DEFAULT_SETTINGS);
    expect(state.gamification).toEqual(INITIAL_GAMIFICATION);
    expect(state.progress).toEqual({});
  });
});
