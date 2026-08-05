import { describe, expect, it } from 'vitest';

import {
  DAYS_PER_FREEZE,
  INITIAL_STREAK,
  isStreakAlive,
  MAX_FREEZES,
  recordDay,
  type StreakState,
  streakDeadline,
} from './streak';

const GOAL = 150;

/** Meet the goal on a day. */
const meet = (state: StreakState, day: string) =>
  recordDay(state, { day, xpToday: GOAL, dailyGoalXp: GOAL });

/** Run a sequence of consecutive days, all meeting the goal. */
function runDays(from: string, count: number, state = INITIAL_STREAK): StreakState {
  let current = state;
  const [year, month, day] = from.split('-').map(Number) as [number, number, number];

  for (let i = 0; i < count; i += 1) {
    const date = new Date(Date.UTC(year, month - 1, day + i));
    const key = date.toISOString().slice(0, 10);
    current = meet(current, key).state;
  }
  return current;
}

describe('recordDay', () => {
  it('does nothing when the goal is not met', () => {
    const outcome = recordDay(INITIAL_STREAK, {
      day: '2026-08-05',
      xpToday: 149,
      dailyGoalXp: GOAL,
    });

    expect(outcome.kind).toBe('incomplete');
    expect(outcome.state).toEqual(INITIAL_STREAK);
  });

  it('counts the day the instant the goal is reached exactly', () => {
    const outcome = recordDay(INITIAL_STREAK, {
      day: '2026-08-05',
      xpToday: GOAL,
      dailyGoalXp: GOAL,
    });

    expect(outcome.kind).toBe('started');
    expect(outcome.state.current).toBe(1);
  });

  it('starts the streak on the first completed day', () => {
    const outcome = meet(INITIAL_STREAK, '2026-08-05');

    expect(outcome.kind).toBe('started');
    expect(outcome.state).toEqual({
      current: 1,
      longest: 1,
      lastCompletedDay: '2026-08-05',
      freezes: 0,
    });
  });

  it('is idempotent within a day', () => {
    // The caller runs this after every XP award, so a second call on the same day must not
    // double-count. Without this the streak would grow by one per question answered.
    const first = meet(INITIAL_STREAK, '2026-08-05').state;
    const second = meet(first, '2026-08-05');

    expect(second.kind).toBe('already-counted');
    expect(second.state).toEqual(first);
  });

  it('extends on the following day', () => {
    const day1 = meet(INITIAL_STREAK, '2026-08-05').state;
    const outcome = meet(day1, '2026-08-06');

    expect(outcome.kind).toBe('extended');
    expect(outcome.state.current).toBe(2);
    expect(outcome.state.longest).toBe(2);
  });

  it('extends across a month boundary', () => {
    const july31 = meet(INITIAL_STREAK, '2026-07-31').state;

    expect(meet(july31, '2026-08-01').state.current).toBe(2);
  });

  it('extends across a year boundary', () => {
    const dec31 = meet(INITIAL_STREAK, '2026-12-31').state;

    expect(meet(dec31, '2027-01-01').state.current).toBe(2);
  });

  it('extends across a daylight-saving transition', () => {
    // Europe/Paris springs forward on 2026-03-29. Millisecond arithmetic would compute 0.958 days
    // here and report a broken streak.
    const before = meet(INITIAL_STREAK, '2026-03-28').state;

    expect(meet(before, '2026-03-29').kind).toBe('extended');
  });

  it('breaks after a two-day gap with no freeze held', () => {
    const day1 = meet(INITIAL_STREAK, '2026-08-05').state;
    const outcome = meet(day1, '2026-08-07');

    expect(outcome.kind).toBe('broken');
    expect(outcome.state.current).toBe(1);
    // The longest run is history and survives the break.
    expect(outcome.state.longest).toBe(1);
  });

  it('remembers the longest run after a break', () => {
    const week = runDays('2026-08-01', 5);
    expect(week.current).toBe(5);

    const afterBreak = meet(week, '2026-08-20');

    expect(afterBreak.kind).toBe('broken');
    expect(afterBreak.state.current).toBe(1);
    expect(afterBreak.state.longest).toBe(5);
  });

  it('grants a freeze every seven consecutive days, up to the cap', () => {
    const week = runDays('2026-08-01', DAYS_PER_FREEZE);

    expect(week.current).toBe(7);
    expect(week.freezes).toBe(1);

    const twoWeeks = runDays('2026-08-01', DAYS_PER_FREEZE * 2);

    expect(twoWeeks.freezes).toBe(MAX_FREEZES);
  });

  it('never exceeds the freeze cap, however long the run', () => {
    // Freezes are insurance, not immunity: hoarding a month of them would make the streak
    // meaningless.
    const longRun = runDays('2026-01-01', 60);

    expect(longRun.current).toBe(60);
    expect(longRun.freezes).toBe(MAX_FREEZES);
  });

  it('spends a freeze to survive exactly one missed day', () => {
    const week = runDays('2026-08-01', DAYS_PER_FREEZE);
    // Last completed day is 2026-08-07. Skip the 8th, return on the 9th.
    const outcome = meet(week, '2026-08-09');

    expect(outcome.kind).toBe('frozen');
    expect(outcome.state.current).toBe(8);
    expect(outcome.state.freezes).toBe(0);
  });

  it('will not spend a freeze on a two-day gap', () => {
    const week = runDays('2026-08-01', DAYS_PER_FREEZE);
    // Last completed 2026-08-07; returning on the 10th is two missed days.
    const outcome = meet(week, '2026-08-10');

    expect(outcome.kind).toBe('broken');
    expect(outcome.state.current).toBe(1);
    // The freeze is not consumed by a gap it cannot cover.
    expect(outcome.state.freezes).toBe(1);
  });

  it('ignores a day earlier than the last completed one', () => {
    // A timezone change or a corrected device clock can hand us yesterday. Recording it would
    // corrupt the streak, so it is refused rather than trusted.
    const day5 = meet(INITIAL_STREAK, '2026-08-05').state;
    const outcome = meet(day5, '2026-08-03');

    expect(outcome.kind).toBe('already-counted');
    expect(outcome.state).toEqual(day5);
  });

  it('never mutates the state it is given', () => {
    const before: StreakState = { ...INITIAL_STREAK };
    meet(before, '2026-08-05');

    expect(before).toEqual(INITIAL_STREAK);
  });
});

describe('isStreakAlive', () => {
  it('is false before anything has been completed', () => {
    expect(isStreakAlive(INITIAL_STREAK, '2026-08-05')).toBe(false);
  });

  it('is true on the day itself', () => {
    const state = meet(INITIAL_STREAK, '2026-08-05').state;

    expect(isStreakAlive(state, '2026-08-05')).toBe(true);
  });

  it('is true the day after, before the learner has started', () => {
    // The streak is not broken until the day is actually lost. Showing it as dead at midnight
    // would be both wrong and demoralising.
    const state = meet(INITIAL_STREAK, '2026-08-05').state;

    expect(isStreakAlive(state, '2026-08-06')).toBe(true);
  });

  it('is false two days later with no freeze', () => {
    const state = meet(INITIAL_STREAK, '2026-08-05').state;

    expect(isStreakAlive(state, '2026-08-07')).toBe(false);
  });

  it('is still true two days later when a freeze is held', () => {
    const week = runDays('2026-08-01', DAYS_PER_FREEZE);

    expect(week.freezes).toBe(1);
    expect(isStreakAlive(week, '2026-08-09')).toBe(true);
    expect(isStreakAlive(week, '2026-08-10')).toBe(false);
  });
});

describe('streakDeadline', () => {
  it('is null before anything has been completed', () => {
    expect(streakDeadline(INITIAL_STREAK)).toBeNull();
  });

  it('is tomorrow with no freeze', () => {
    const state = meet(INITIAL_STREAK, '2026-08-05').state;

    expect(streakDeadline(state)).toBe('2026-08-06');
  });

  it('is the day after tomorrow with a freeze in hand', () => {
    const week = runDays('2026-08-01', DAYS_PER_FREEZE);

    expect(streakDeadline(week)).toBe('2026-08-09');
  });
});
