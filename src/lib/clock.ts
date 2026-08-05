import type { Clock } from '@/domain/ports';

/**
 * The real clock. The only place in the app allowed to read wall-clock time.
 *
 * `localDayKey` goes through `Intl.DateTimeFormat` with the `en-CA` locale, whose short date
 * format is already `YYYY-MM-DD`, rather than through `toISOString()` — which would return the
 * UTC day and quietly break streaks for anyone whose evening is the previous day in UTC.
 */
export function createSystemClock(timeZone?: string): Clock {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(timeZone === undefined ? {} : { timeZone }),
  });

  return {
    now: () => Date.now(),
    localDayKey: () => formatter.format(new Date()),
  };
}

/**
 * A clock frozen at a given instant, for tests and for stories.
 *
 * `advance` moves it, so a test can express "then two days pass" without touching timers.
 */
export function createFixedClock(
  isoInstant: string,
  timeZone = 'UTC',
): Clock & {
  advance: (milliseconds: number) => void;
} {
  let current = new Date(isoInstant).getTime();

  if (Number.isNaN(current)) {
    throw new Error(`createFixedClock: "${isoInstant}" is not a valid instant`);
  }

  const formatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone,
  });

  return {
    now: () => current,
    localDayKey: () => formatter.format(new Date(current)),
    advance: (milliseconds: number) => {
      current += milliseconds;
    },
  };
}
