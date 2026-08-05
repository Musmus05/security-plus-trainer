/**
 * Day-key arithmetic.
 *
 * A day key is `YYYY-MM-DD` in the learner's local timezone. Streaks compare and step these keys,
 * never timestamps: "did they study yesterday" is a calendar question, and answering it by
 * subtracting 86 400 000 milliseconds gets the wrong answer twice a year in any timezone with
 * daylight saving, and every time somebody travels.
 *
 * These functions are pure and total: they operate on the key string alone.
 */

const DAY_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isDayKey(value: string): boolean {
  if (!DAY_KEY_PATTERN.test(value)) {
    return false;
  }
  // Reject impossible dates like 2026-02-31, which the pattern happily accepts.
  return toDayKey(parseDayKey(value)) === value;
}

/** Parse a day key into a UTC-midnight Date. UTC keeps the arithmetic free of DST. */
export function parseDayKey(key: string): Date {
  const year = Number(key.slice(0, 4));
  const month = Number(key.slice(5, 7));
  const day = Number(key.slice(8, 10));

  return new Date(Date.UTC(year, month - 1, day));
}

export function toDayKey(date: Date): string {
  const year = String(date.getUTCFullYear()).padStart(4, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/** Shift a day key by whole calendar days. Negative steps go backwards. */
export function addDays(key: string, days: number): string {
  const date = parseDayKey(key);
  date.setUTCDate(date.getUTCDate() + days);

  return toDayKey(date);
}

/**
 * Whole calendar days from `from` to `to`. Positive when `to` is later.
 *
 * Both keys are anchored at UTC midnight, so the difference is always an exact multiple of a day
 * regardless of the timezone the keys were produced in.
 */
export function daysBetween(from: string, to: string): number {
  const MS_PER_DAY = 86_400_000;

  return Math.round((parseDayKey(to).getTime() - parseDayKey(from).getTime()) / MS_PER_DAY);
}
