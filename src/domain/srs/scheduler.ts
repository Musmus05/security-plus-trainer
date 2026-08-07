import { addDays, daysBetween } from '@/domain/day-key';

/**
 * Spaced repetition, SM-2 with the sharp edges filed off.
 *
 * Pure and day-granular. The learner's calendar day arrives as a key rather than a timestamp
 * (`src/domain/day-key.ts` explains why), so nothing here reads a clock and every schedule is an
 * assertion rather than a hope.
 *
 * Deviations from textbook SM-2 are all in one direction — refusing to produce a schedule that
 * wastes the learner's time — and each is commented where it happens.
 */

/** How the learner rated their recall. Four buttons, because six is a decision, not a reflex. */
export const GRADES = ['again', 'hard', 'good', 'easy'] as const;
export type Grade = (typeof GRADES)[number];

export interface CardState {
  /** SM-2's ease factor: the multiplier a `good` answer applies to the interval. */
  ease: number;
  /** Current interval in whole days. Zero means the card is being relearnt. */
  intervalDays: number;
  /** Day key on which the card is next due. */
  due: string;
  /** Consecutive successful reviews. Reset by a lapse. */
  reps: number;
  /** How many times the card has been forgotten after having been learnt. */
  lapses: number;
}

/**
 * The ease floor is SM-2's own. The ceiling is not.
 *
 * Unbounded ease lets a card the learner keeps rating `easy` reach a multiplier where one more
 * review pushes it years out. Capping it keeps even a well-known card inside a revision horizon.
 */
export const MIN_EASE = 1.3;
export const MAX_EASE = 2.8;
const INITIAL_EASE = 2.5;

/**
 * Nothing is scheduled beyond a year.
 *
 * This is a certification trainer, not a lifetime vocabulary tool: SY0-701 itself retires, and a
 * card due in three years is a card the learner will never see again. The cap makes that explicit
 * rather than emergent.
 */
export const MAX_INTERVAL_DAYS = 365;

const EASE_DELTA: Record<Grade, number> = {
  again: -0.2,
  hard: -0.15,
  good: 0,
  easy: 0.15,
};

/** A card the learner has never seen, due the day it is created. */
export function newCard(today: string): CardState {
  return { ease: INITIAL_EASE, intervalDays: 0, due: today, reps: 0, lapses: 0 };
}

export function isDue(state: CardState, today: string): boolean {
  return daysBetween(state.due, today) >= 0;
}

/**
 * Apply a grade to a card.
 *
 * `again` returns the card to the learning stage and leaves it due *today*, so it comes back in the
 * same session — forgetting a card and then not seeing it again for a day is how a lapse becomes
 * two lapses.
 */
export function schedule(state: CardState, grade: Grade, today: string): CardState {
  const ease = clamp(state.ease + EASE_DELTA[grade], MIN_EASE, MAX_EASE);

  if (grade === 'again') {
    return {
      ease,
      intervalDays: 0,
      due: today,
      reps: 0,
      lapses: state.lapses + 1,
    };
  }

  const intervalDays = Math.min(nextInterval(state, grade, ease), MAX_INTERVAL_DAYS);

  return {
    ease,
    intervalDays,
    due: addDays(today, intervalDays),
    reps: state.reps + 1,
    lapses: state.lapses,
  };
}

function nextInterval(state: CardState, grade: Exclude<Grade, 'again'>, ease: number): number {
  // The first two steps are fixed rather than computed. A brand-new card has no evidence behind
  // its ease factor, so multiplying by it is multiplying by a guess.
  if (state.reps === 0) {
    return grade === 'easy' ? 4 : 1;
  }
  if (state.reps === 1) {
    return grade === 'hard' ? 3 : grade === 'easy' ? 10 : 6;
  }

  const factor = grade === 'hard' ? 1.2 : grade === 'easy' ? ease * 1.3 : ease;

  /*
   * The `+ 1` floor is the fix for textbook SM-2's one genuinely broken case. At the ease floor of
   * 1.3 with a one-day interval, `round(1 × 1.3)` is 1 — so a card the learner has answered
   * correctly stays due every single day, for ever, and the algorithm reports that as working.
   * Every successful review must move the card further out than it was.
   */
  return Math.max(state.intervalDays + 1, Math.round(state.intervalDays * factor));
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(high, Math.max(low, value));
}
