import { describe, expect, it } from 'vitest';

import { addDays, daysBetween, isDayKey, parseDayKey, toDayKey } from './day-key';

describe('isDayKey', () => {
  it.each(['2026-08-05', '2024-02-29', '1999-12-31'])('accepts %s', (key) => {
    expect(isDayKey(key)).toBe(true);
  });

  it.each([
    ['2026-02-31', 'a day that does not exist'],
    ['2025-02-29', 'a leap day in a non-leap year'],
    ['2026-13-01', 'a thirteenth month'],
    ['2026-8-5', 'unpadded components'],
    ['26-08-05', 'a two-digit year'],
    ['2026/08/05', 'the wrong separator'],
    ['', 'nothing at all'],
  ])('rejects %s (%s)', (key) => {
    expect(isDayKey(key)).toBe(false);
  });
});

describe('addDays', () => {
  it('steps forward within a month', () => {
    expect(addDays('2026-08-05', 3)).toBe('2026-08-08');
  });

  it('steps backwards across a month boundary', () => {
    expect(addDays('2026-08-01', -1)).toBe('2026-07-31');
  });

  it('crosses a year boundary', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('handles a leap day', () => {
    expect(addDays('2024-02-28', 1)).toBe('2024-02-29');
    expect(addDays('2024-02-29', 1)).toBe('2024-03-01');
  });

  it('skips 29 February in a non-leap year', () => {
    expect(addDays('2025-02-28', 1)).toBe('2025-03-01');
  });

  it('is the identity at zero', () => {
    expect(addDays('2026-08-05', 0)).toBe('2026-08-05');
  });
});

describe('daysBetween', () => {
  it('is zero for the same day', () => {
    expect(daysBetween('2026-08-05', '2026-08-05')).toBe(0);
  });

  it('is positive going forwards and negative going backwards', () => {
    expect(daysBetween('2026-08-05', '2026-08-06')).toBe(1);
    expect(daysBetween('2026-08-06', '2026-08-05')).toBe(-1);
  });

  it('counts across a month boundary', () => {
    expect(daysBetween('2026-07-30', '2026-08-02')).toBe(3);
  });

  it('counts a full non-leap year', () => {
    expect(daysBetween('2025-01-01', '2026-01-01')).toBe(365);
  });

  it('counts a full leap year', () => {
    expect(daysBetween('2024-01-01', '2025-01-01')).toBe(366);
  });

  it('is unaffected by daylight-saving transitions', () => {
    // Europe/Paris springs forward on 2026-03-29 and falls back on 2026-10-25. Subtracting
    // milliseconds would give 0.958… and 1.041… days across those boundaries; calendar
    // arithmetic gives exactly 1, which is what a streak needs.
    expect(daysBetween('2026-03-28', '2026-03-29')).toBe(1);
    expect(daysBetween('2026-10-24', '2026-10-25')).toBe(1);
    expect(daysBetween('2026-03-01', '2026-11-01')).toBe(245);
  });
});

describe('round-tripping', () => {
  it('survives parse then format', () => {
    for (const key of ['2026-01-01', '2026-08-05', '2024-02-29', '2027-12-31']) {
      expect(toDayKey(parseDayKey(key))).toBe(key);
    }
  });

  it('survives stepping out and back', () => {
    for (const step of [1, 7, 30, 365, -1, -7, -400]) {
      expect(addDays(addDays('2026-08-05', step), -step)).toBe('2026-08-05');
    }
  });
});
