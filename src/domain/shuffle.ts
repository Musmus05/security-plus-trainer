import type { Rng } from './ports';

/**
 * Fisher-Yates shuffle, driven by an injected generator.
 *
 * Seeded rather than ambient so a quiz or an exam can be reproduced exactly. That is not a testing
 * convenience: a mock exam attempt is stored by its seed rather than by ninety question ids, and a
 * test can assert "exactly 25 questions came from domain 4" as an equality instead of a statistic.
 *
 * Returns a new array. The classic bug in a shuffle is doing it in place on an array the caller
 * still owns — here that would silently reorder the question bank itself.
 */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng.next() * (i + 1));
    const a = result[i];
    const b = result[j];
    // Guarded for `noUncheckedIndexedAccess`; both indices are in range by construction.
    if (a !== undefined && b !== undefined) {
      result[i] = b;
      result[j] = a;
    }
  }

  return result;
}

/**
 * Take `count` items at random without repeats.
 *
 * Shuffle-then-slice rather than repeated random picks with a "seen" set: the latter degrades badly
 * as `count` approaches the pool size, and loops forever if `count` exceeds it. Asking for more than
 * the pool holds returns the whole pool, shuffled — a quiz with fewer questions than requested is
 * better than a crash or a hang.
 */
export function sample<T>(items: readonly T[], count: number, rng: Rng): T[] {
  if (count <= 0) {
    return [];
  }
  return shuffle(items, rng).slice(0, Math.min(count, items.length));
}
