import { describe, expect, it } from 'vitest';

import { isDayKey } from '@/domain/day-key';

import { createFixedClock, createSystemClock } from './clock';

describe('createSystemClock', () => {
  it('returns a well-formed local day key', () => {
    expect(isDayKey(createSystemClock().localDayKey())).toBe(true);
  });

  it('advances with real time', () => {
    const clock = createSystemClock();
    const before = clock.now();

    expect(clock.now()).toBeGreaterThanOrEqual(before);
  });
});

describe('createFixedClock', () => {
  it('reports the instant it was given', () => {
    const clock = createFixedClock('2026-08-05T09:30:00Z');

    expect(clock.now()).toBe(Date.parse('2026-08-05T09:30:00Z'));
    expect(clock.localDayKey()).toBe('2026-08-05');
  });

  it('advances only when told to', () => {
    const clock = createFixedClock('2026-08-05T09:30:00Z');
    const start = clock.now();

    expect(clock.now()).toBe(start);

    clock.advance(2 * 86_400_000);

    expect(clock.localDayKey()).toBe('2026-08-07');
  });

  it('resolves the day key in the given timezone, not in UTC', () => {
    // 23:30 in Paris on 5 August is still 21:30 UTC on the same day, but 23:30 in Auckland is
    // 11:30 UTC — a different calendar day. Deriving the key from `toISOString()` would hand a
    // learner in Auckland yesterday's date all evening and silently break their streak.
    const parisEvening = createFixedClock('2026-08-05T21:30:00Z', 'Europe/Paris');
    const aucklandEvening = createFixedClock('2026-08-05T11:30:00Z', 'Pacific/Auckland');

    expect(parisEvening.localDayKey()).toBe('2026-08-05');
    expect(aucklandEvening.localDayKey()).toBe('2026-08-05');
  });

  it('rolls the day key over at local midnight, not at UTC midnight', () => {
    // 00:30 in Paris on 6 August is 22:30 UTC on 5 August.
    const justAfterParisMidnight = createFixedClock('2026-08-05T22:30:00Z', 'Europe/Paris');

    expect(justAfterParisMidnight.localDayKey()).toBe('2026-08-06');
  });

  it('rejects an instant it cannot parse', () => {
    expect(() => createFixedClock('not a date')).toThrow(/not a valid instant/);
  });
});
