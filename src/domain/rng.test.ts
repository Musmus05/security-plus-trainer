import { describe, expect, it } from 'vitest';

import { createSeededRng } from './rng';

const draw = (seed: number, count: number): number[] => {
  const rng = createSeededRng(seed);
  return Array.from({ length: count }, () => rng.next());
};

describe('createSeededRng', () => {
  it('produces the same sequence for the same seed', () => {
    expect(draw(42, 20)).toEqual(draw(42, 20));
  });

  it('produces different sequences for different seeds', () => {
    expect(draw(1, 10)).not.toEqual(draw(2, 10));
  });

  it('stays within [0, 1)', () => {
    const rng = createSeededRng(7);

    for (let i = 0; i < 10_000; i += 1) {
      const value = rng.next();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it('distributes roughly uniformly across ten buckets', () => {
    // Not a rigorous randomness test — just enough to catch a generator that has collapsed,
    // which is the realistic failure mode after an edit to the bit-twiddling.
    const rng = createSeededRng(12_345);
    const buckets = new Array<number>(10).fill(0);
    const draws = 100_000;

    for (let i = 0; i < draws; i += 1) {
      const bucket = Math.floor(rng.next() * 10);
      buckets[bucket] = (buckets[bucket] ?? 0) + 1;
    }

    for (const count of buckets) {
      expect(count).toBeGreaterThan(draws / 10 - draws / 100);
      expect(count).toBeLessThan(draws / 10 + draws / 100);
    }
  });

  it('handles a zero seed without degenerating', () => {
    expect(new Set(draw(0, 5)).size).toBe(5);
  });
});
