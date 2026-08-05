/**
 * Seed selection — the impure half of randomness.
 *
 * The generator itself is pure and lives in `src/domain/rng.ts`. This module only answers "where
 * does the first number come from", which is the part that needs the platform.
 */

/**
 * A seed for a fresh exam attempt.
 *
 * Uses the Web Crypto API where available so two attempts started in the same millisecond do not
 * collide, and falls back to the clock otherwise. The seed is persisted with the attempt, which is
 * what makes the attempt reconstructable.
 */
export function createRandomSeed(): number {
  if ('crypto' in globalThis && typeof globalThis.crypto.getRandomValues === 'function') {
    const buffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(buffer);
    return buffer[0] ?? 1;
  }

  return Date.now() >>> 0;
}
