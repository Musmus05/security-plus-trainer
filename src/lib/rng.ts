import type { Rng } from '@/domain/ports';

/**
 * mulberry32 — a small, fast, well-distributed 32-bit PRNG.
 *
 * Seeded on purpose. The mock exam samples 90 questions at fixed domain weights, and a test that
 * asserts "exactly 25 questions came from domain 4" needs the same draw every run. A seeded
 * generator makes that an equality assertion rather than a statistical one; it also means a
 * learner's attempt can be reconstructed from its seed instead of storing 90 question ids.
 */
export function createSeededRng(seed: number): Rng {
  let state = seed >>> 0;

  return {
    next: () => {
      state = (state + 0x6d2b79f5) >>> 0;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
    },
  };
}

/**
 * A seed for a fresh exam attempt.
 *
 * Uses the Web Crypto API where available so two attempts started in the same millisecond do not
 * collide, and falls back to the clock otherwise. The seed is persisted with the attempt.
 */
export function createRandomSeed(): number {
  if ('crypto' in globalThis && typeof globalThis.crypto.getRandomValues === 'function') {
    const buffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(buffer);
    return buffer[0] ?? 1;
  }

  return Date.now() >>> 0;
}
