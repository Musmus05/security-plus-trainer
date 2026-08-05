import type { Rng } from './ports';

/**
 * mulberry32 — a small, fast, well-distributed 32-bit PRNG.
 *
 * Lives in `domain` rather than `lib` because it is *pure*: a deterministic function of its seed,
 * with no clock and no entropy source. The impure half — choosing a seed — stays in `lib/rng.ts`.
 *
 * Seeded on purpose. The mock exam samples 90 questions at fixed domain weights, and a test that
 * asserts "exactly 25 questions came from domain 4" needs the same draw every run. A seeded
 * generator makes that an equality assertion rather than a statistical one; it also means an attempt
 * can be reconstructed from its seed instead of storing 90 question ids.
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
