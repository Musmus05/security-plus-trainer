import { describe, expect, it } from 'vitest';

import {
  answeredCount,
  currentQuestionId,
  formatRemaining,
  goTo,
  isAnswered,
  isExpired,
  isFlagged,
  next,
  previous,
  remainingMs,
  selectOption,
  startAttempt,
  toggleFlag,
} from './attempt';

const IDS = ['q1', 'q2', 'q3'];
const STARTED = 1_800_000_000_000;
const NINETY_MINUTES = 90 * 60 * 1000;
const OPTIONS = ['a', 'b', 'c', 'd'];

const fresh = () => startAttempt('full', IDS, STARTED, NINETY_MINUTES, 42);

describe('navigation', () => {
  it('starts on the first question', () => {
    expect(currentQuestionId(fresh())).toBe('q1');
  });

  it('moves forwards and backwards', () => {
    expect(currentQuestionId(next(fresh()))).toBe('q2');
    expect(currentQuestionId(previous(next(fresh())))).toBe('q1');
  });

  it('stops at both ends instead of wrapping or going out of range', () => {
    expect(previous(fresh()).index).toBe(0);
    expect(next(next(next(fresh()))).index).toBe(2);
  });

  it('jumps to a question directly, for the review grid', () => {
    expect(currentQuestionId(goTo(fresh(), 2))).toBe('q3');
  });

  it('ignores a jump outside the exam rather than clamping it', () => {
    // Clamping would make a bad index look like a deliberate move to the last question.
    const attempt = fresh();

    expect(goTo(attempt, 99)).toBe(attempt);
    expect(goTo(attempt, -1)).toBe(attempt);
    expect(goTo(attempt, 1.5)).toBe(attempt);
  });
});

describe('answering', () => {
  it('records a single-answer selection', () => {
    const attempt = selectOption(fresh(), OPTIONS, 'b', false);

    expect(attempt.answers['q1']).toEqual(['b']);
    expect(isAnswered(attempt, 'q1')).toBe(true);
  });

  it('replaces the selection on a single-answer question', () => {
    let attempt = selectOption(fresh(), OPTIONS, 'b', false);
    attempt = selectOption(attempt, OPTIONS, 'd', false);

    expect(attempt.answers['q1']).toEqual(['d']);
  });

  it('toggles on a multi-select question', () => {
    let attempt = selectOption(fresh(), OPTIONS, 'a', true);
    attempt = selectOption(attempt, OPTIONS, 'c', true);
    expect(attempt.answers['q1']).toEqual(['a', 'c']);

    attempt = selectOption(attempt, OPTIONS, 'a', true);
    expect(attempt.answers['q1']).toEqual(['c']);
  });

  it('lets an answer be changed at any time', () => {
    // Unlike the quiz there is no reveal to lock against — revisiting and changing an answer is the
    // whole reason the real exam allows navigation.
    let attempt = selectOption(fresh(), OPTIONS, 'a', false);
    attempt = goTo(attempt, 2);
    attempt = selectOption(attempt, OPTIONS, 'b', false);
    attempt = goTo(attempt, 0);
    attempt = selectOption(attempt, OPTIONS, 'c', false);

    expect(attempt.answers).toEqual({ q1: ['c'], q3: ['b'] });
  });

  it('ignores an option that does not belong to the question', () => {
    const attempt = fresh();

    expect(selectOption(attempt, OPTIONS, 'z', false)).toBe(attempt);
  });

  it('counts answered questions across the whole exam', () => {
    let attempt = selectOption(fresh(), OPTIONS, 'a', false);
    attempt = selectOption(goTo(attempt, 2), OPTIONS, 'b', false);

    expect(answeredCount(attempt)).toBe(2);
  });

  it('treats an emptied multi-select as unanswered', () => {
    let attempt = selectOption(fresh(), OPTIONS, 'a', true);
    attempt = selectOption(attempt, OPTIONS, 'a', true);

    expect(isAnswered(attempt, 'q1')).toBe(false);
    expect(answeredCount(attempt)).toBe(0);
  });
});

describe('flags', () => {
  it('marks and unmarks the current question', () => {
    const flagged = toggleFlag(fresh());
    expect(isFlagged(flagged, 'q1')).toBe(true);

    expect(isFlagged(toggleFlag(flagged), 'q1')).toBe(false);
  });

  it('is independent of whether the question was answered', () => {
    const attempt = toggleFlag(selectOption(fresh(), OPTIONS, 'a', false));

    expect(isFlagged(attempt, 'q1')).toBe(true);
    expect(isAnswered(attempt, 'q1')).toBe(true);
  });
});

describe('the clock', () => {
  it('derives what is left from the wall clock', () => {
    const attempt = fresh();

    expect(remainingMs(attempt, STARTED)).toBe(NINETY_MINUTES);
    expect(remainingMs(attempt, STARTED + 60_000)).toBe(NINETY_MINUTES - 60_000);
  });

  it('keeps running while the app is closed', () => {
    /*
     * This is why the attempt stores `startedAt` rather than `remainingMs`. A stored countdown
     * decremented by an interval stops when the tab is backgrounded, stops entirely when it is
     * closed, and hands a candidate who reloads at minute 80 a fresh ninety minutes.
     */
    const attempt = fresh();
    const afterAnHourAway = STARTED + 60 * 60 * 1000;

    expect(remainingMs(attempt, afterAnHourAway)).toBe(30 * 60 * 1000);
  });

  it('floors at zero rather than going negative', () => {
    expect(remainingMs(fresh(), STARTED + NINETY_MINUTES + 5_000)).toBe(0);
  });

  it('expires exactly at the duration', () => {
    const attempt = fresh();

    expect(isExpired(attempt, STARTED + NINETY_MINUTES - 1)).toBe(false);
    expect(isExpired(attempt, STARTED + NINETY_MINUTES)).toBe(true);
  });
});

describe('formatRemaining', () => {
  it('formats as H:MM:SS', () => {
    expect(formatRemaining(NINETY_MINUTES)).toBe('1:30:00');
    expect(formatRemaining(61_000)).toBe('0:01:01');
    expect(formatRemaining(0)).toBe('0:00:00');
  });

  it('floors rather than rounds, so 0:00 always means no time left', () => {
    // Rounding would show 0:01 with 400 ms left and 0:00 with 600 ms left — the display would say
    // there is a second on the clock after the exam had already ended.
    expect(formatRemaining(999)).toBe('0:00:00');
    expect(formatRemaining(1_999)).toBe('0:00:01');
  });

  it('does not produce a negative clock', () => {
    expect(formatRemaining(-5_000)).toBe('0:00:00');
  });
});
