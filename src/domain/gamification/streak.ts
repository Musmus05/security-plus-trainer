import { addDays, daysBetween } from '@/domain/day-key';

/**
 * The daily streak.
 *
 * One decision shapes everything here: **a day counts when the learner meets their XP goal**, not
 * when they open the app. Opening-the-app streaks reward a two-second visit and teach nothing;
 * goal-based streaks reward the behaviour the app exists to encourage. It also means the streak
 * cannot be gamed by launching the tab, which is the failure mode of the easier design.
 *
 * Days are compared as calendar keys, never as timestamps — see `src/domain/day-key.ts` for why
 * subtracting milliseconds is wrong twice a year.
 */

export interface StreakState {
  current: number;
  longest: number;
  /** The last day whose goal was met, or null if the learner has never completed a day. */
  lastCompletedDay: string | null;
  /**
   * Held freezes, each of which can absorb exactly one missed day.
   *
   * Not generosity: a streak that dies to one bad Tuesday stops being motivating and starts being
   * a reason to give up. One earned per seven-day run, capped so they cannot be hoarded into
   * permanent immunity.
   */
  freezes: number;
}

export const MAX_FREEZES = 2;
export const DAYS_PER_FREEZE = 7;

export const INITIAL_STREAK: StreakState = {
  current: 0,
  longest: 0,
  lastCompletedDay: null,
  freezes: 0,
};

export type StreakOutcome =
  /** The goal was not met today; nothing changed. */
  | { kind: 'incomplete'; state: StreakState }
  /** Today's goal was already met earlier today. */
  | { kind: 'already-counted'; state: StreakState }
  /** First completed day ever, or the first after a broken streak. */
  | { kind: 'started'; state: StreakState }
  | { kind: 'extended'; state: StreakState; earnedFreeze: boolean }
  /** A gap of one day was covered by a freeze. */
  | { kind: 'frozen'; state: StreakState }
  /** The gap was too wide, or no freeze was held. */
  | { kind: 'broken'; state: StreakState; previous: number };

export interface DayReport {
  /** The learner's local calendar day. */
  day: string;
  xpToday: number;
  dailyGoalXp: number;
}

/**
 * Fold one day's activity into the streak.
 *
 * Pure and idempotent for a given day: calling it repeatedly on a day whose goal is already met
 * returns `already-counted` and changes nothing, so the caller can run it after every XP award
 * without special-casing.
 */
export function recordDay(state: StreakState, report: DayReport): StreakOutcome {
  const { day, xpToday, dailyGoalXp } = report;

  if (xpToday < dailyGoalXp) {
    return { kind: 'incomplete', state };
  }

  if (state.lastCompletedDay === day) {
    return { kind: 'already-counted', state };
  }

  if (state.lastCompletedDay === null) {
    return { kind: 'started', state: complete(state, day, 1) };
  }

  const gap = daysBetween(state.lastCompletedDay, day);

  // A day in the past means a clock that moved backwards — a timezone change, or a device whose
  // date was wrong and got corrected. Recording it would corrupt the streak, so it is ignored.
  if (gap <= 0) {
    return { kind: 'already-counted', state };
  }

  if (gap === 1) {
    const next = complete(state, day, state.current + 1);
    const earnedFreeze = next.current % DAYS_PER_FREEZE === 0 && state.freezes < MAX_FREEZES;

    return {
      kind: 'extended',
      state: earnedFreeze ? { ...next, freezes: next.freezes + 1 } : next,
      earnedFreeze,
    };
  }

  // Exactly one missed day, and a freeze in hand: the streak survives but does not grow for the
  // skipped day. Spending the freeze is the cost.
  if (gap === 2 && state.freezes > 0) {
    return {
      kind: 'frozen',
      state: { ...complete(state, day, state.current + 1), freezes: state.freezes - 1 },
    };
  }

  return {
    kind: 'broken',
    previous: state.current,
    // A broken streak starts again at one — today did count.
    state: { ...complete(state, day, 1), freezes: state.freezes },
  };
}

function complete(state: StreakState, day: string, current: number): StreakState {
  return {
    current,
    longest: Math.max(state.longest, current),
    lastCompletedDay: day,
    freezes: state.freezes,
  };
}

/**
 * Whether the streak is still alive as of `today`, without recording anything.
 *
 * The dashboard needs this: a learner who completed yesterday and has not started today still has
 * a live streak, and showing it as broken before the day is over would be both wrong and
 * demoralising.
 */
export function isStreakAlive(state: StreakState, today: string): boolean {
  if (state.lastCompletedDay === null || state.current === 0) {
    return false;
  }

  const gap = daysBetween(state.lastCompletedDay, today);
  if (gap <= 1) {
    return true;
  }
  // Today would still be savable by a freeze, so the streak is not dead yet.
  return gap === 2 && state.freezes > 0;
}

/** The last day on which activity could still save the streak. */
export function streakDeadline(state: StreakState): string | null {
  if (state.lastCompletedDay === null) {
    return null;
  }
  return addDays(state.lastCompletedDay, state.freezes > 0 ? 2 : 1);
}
