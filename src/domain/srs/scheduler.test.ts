import { describe, expect, it } from 'vitest';

import {
  type CardState,
  type Grade,
  isDue,
  MAX_EASE,
  MAX_INTERVAL_DAYS,
  MIN_EASE,
  newCard,
  schedule,
} from './scheduler';

const TODAY = '2026-03-12';

/** Grade a card repeatedly from a fixed day, advancing the clock to each new due date. */
function drill(start: CardState, grades: readonly Grade[], from = TODAY): CardState {
  let state = start;
  let day = from;

  for (const g of grades) {
    state = schedule(state, g, day);
    day = state.due;
  }

  return state;
}

describe('newCard', () => {
  it('is due immediately', () => {
    const card = newCard(TODAY);

    expect(card.due).toBe(TODAY);
    expect(isDue(card, TODAY)).toBe(true);
    expect(card.reps).toBe(0);
    expect(card.lapses).toBe(0);
  });
});

describe('isDue', () => {
  it('is true on the due day and every day after it', () => {
    const card = { ...newCard(TODAY), due: '2026-03-12' };

    expect(isDue(card, '2026-03-11')).toBe(false);
    expect(isDue(card, '2026-03-12')).toBe(true);
    expect(isDue(card, '2026-04-30')).toBe(true);
  });

  it('does not lose a day across a daylight-saving boundary', () => {
    // Europe/Paris springs forward on 2026-03-29. Day keys are compared as calendar days, so this
    // is arithmetic on strings — the test exists to keep it that way.
    const card = { ...newCard(TODAY), due: '2026-03-30' };

    expect(isDue(card, '2026-03-29')).toBe(false);
    expect(isDue(card, '2026-03-30')).toBe(true);
  });
});

describe('schedule', () => {
  it('walks a new card out through the fixed learning steps', () => {
    const first = schedule(newCard(TODAY), 'good', TODAY);
    expect(first.intervalDays).toBe(1);
    expect(first.due).toBe('2026-03-13');

    const second = schedule(first, 'good', first.due);
    expect(second.intervalDays).toBe(6);
    expect(second.due).toBe('2026-03-19');

    // Only from the third review does the ease factor start driving the interval: before that
    // there is no evidence behind it.
    const third = schedule(second, 'good', second.due);
    expect(third.intervalDays).toBe(Math.round(6 * 2.5));
  });

  it('gives a new card a longer first step when it was easy', () => {
    expect(schedule(newCard(TODAY), 'easy', TODAY).intervalDays).toBe(4);
    expect(schedule(newCard(TODAY), 'hard', TODAY).intervalDays).toBe(1);
  });

  it('sends a forgotten card back to today and counts the lapse', () => {
    const learnt = drill(newCard(TODAY), ['good', 'good', 'good']);
    const lapsed = schedule(learnt, 'again', learnt.due);

    // Due today, not tomorrow: a card you just failed is the one you most need to see again, and
    // waiting a day turns one lapse into two.
    expect(lapsed.due).toBe(learnt.due);
    expect(lapsed.intervalDays).toBe(0);
    expect(lapsed.reps).toBe(0);
    expect(lapsed.lapses).toBe(1);
  });

  it('keeps the lapse count across later successes', () => {
    const lapsed = schedule(drill(newCard(TODAY), ['good', 'good']), 'again', '2026-03-19');
    const recovered = schedule(lapsed, 'good', '2026-03-19');

    expect(recovered.lapses).toBe(1);
    expect(recovered.reps).toBe(1);
  });

  it('always moves a correctly answered card further out than it was', () => {
    /*
     * This is the one place textbook SM-2 is genuinely broken. At the ease floor with a one-day
     * interval, `round(1 × 1.3)` is 1: the card stays due every day for ever and the algorithm
     * reports that as working. Checked across the whole ease range so the guard cannot be
     * satisfied by luck.
     */
    for (const ease of [MIN_EASE, 1.4, 1.6, 2.0, MAX_EASE]) {
      for (const intervalDays of [1, 2, 3, 5, 10]) {
        const state: CardState = { ease, intervalDays, due: TODAY, reps: 5, lapses: 0 };

        for (const g of ['hard', 'good', 'easy'] as const) {
          const next = schedule(state, g, TODAY);
          expect(
            next.intervalDays,
            `ease ${String(ease)}, interval ${String(intervalDays)}, grade ${g}`,
          ).toBeGreaterThan(intervalDays);
        }
      }
    }
  });

  it('orders the grades: hard grows least, easy grows most', () => {
    const state: CardState = { ease: 2.5, intervalDays: 20, due: TODAY, reps: 5, lapses: 0 };

    const hard = schedule(state, 'hard', TODAY).intervalDays;
    const good = schedule(state, 'good', TODAY).intervalDays;
    const easy = schedule(state, 'easy', TODAY).intervalDays;

    expect(hard).toBeLessThan(good);
    expect(good).toBeLessThan(easy);
  });

  it('never schedules beyond a year', () => {
    // A card due in three years is a card the learner will never see again, and SY0-701 itself
    // retires long before that.
    const state = drill(
      newCard(TODAY),
      Array.from({ length: 30 }, () => 'easy' as const),
    );

    expect(state.intervalDays).toBe(MAX_INTERVAL_DAYS);
  });

  it('holds ease inside its bounds however it is graded', () => {
    const floored = drill(
      newCard(TODAY),
      Array.from({ length: 20 }, () => 'again' as const),
    );
    expect(floored.ease).toBe(MIN_EASE);

    const ceilinged = drill(
      newCard(TODAY),
      Array.from({ length: 20 }, () => 'easy' as const),
    );
    expect(ceilinged.ease).toBeLessThanOrEqual(MAX_EASE);
    expect(ceilinged.ease).toBe(MAX_EASE);
  });

  it('lowers ease for hard and raises it for easy', () => {
    const state: CardState = { ease: 2.0, intervalDays: 10, due: TODAY, reps: 3, lapses: 0 };

    expect(schedule(state, 'hard', TODAY).ease).toBeLessThan(2.0);
    expect(schedule(state, 'good', TODAY).ease).toBe(2.0);
    expect(schedule(state, 'easy', TODAY).ease).toBeGreaterThan(2.0);
  });

  it('is pure: grading the same state twice gives the same answer', () => {
    const state = drill(newCard(TODAY), ['good', 'good']);

    expect(schedule(state, 'good', '2026-04-01')).toEqual(schedule(state, 'good', '2026-04-01'));
  });

  it('never returns a due date before today', () => {
    const state: CardState = { ease: 2.5, intervalDays: 30, due: TODAY, reps: 9, lapses: 0 };

    for (const g of ['again', 'hard', 'good', 'easy'] as const) {
      expect(schedule(state, g, TODAY).due >= TODAY).toBe(true);
    }
  });
});
