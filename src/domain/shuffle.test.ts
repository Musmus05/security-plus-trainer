import { describe, expect, it } from 'vitest';

import { createSeededRng } from './rng';

import { sample, shuffle } from './shuffle';

const ITEMS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

describe('shuffle', () => {
  it('is reproducible for a given seed', () => {
    expect(shuffle(ITEMS, createSeededRng(7))).toEqual(shuffle(ITEMS, createSeededRng(7)));
  });

  it('differs between seeds', () => {
    expect(shuffle(ITEMS, createSeededRng(1))).not.toEqual(shuffle(ITEMS, createSeededRng(2)));
  });

  it('keeps every element exactly once', () => {
    const shuffled = shuffle(ITEMS, createSeededRng(3));

    expect(shuffled).toHaveLength(ITEMS.length);
    expect([...shuffled].sort()).toEqual([...ITEMS].sort());
  });

  it('does not touch the input array', () => {
    // The classic shuffle bug: reordering an array the caller still owns. Here that would silently
    // reorder the question bank itself, for every later reader.
    const original = [...ITEMS];
    shuffle(ITEMS, createSeededRng(4));

    expect(ITEMS).toEqual(original);
  });

  it('handles empty and single-element arrays', () => {
    expect(shuffle([], createSeededRng(1))).toEqual([]);
    expect(shuffle(['only'], createSeededRng(1))).toEqual(['only']);
  });

  it('actually reorders, rather than returning the input order', () => {
    // A shuffle that happens to be the identity for one seed is fine; being the identity for every
    // seed means the loop bounds are wrong.
    const identical = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((seed) => {
      const shuffled = shuffle(ITEMS, createSeededRng(seed));
      return shuffled.every((item, index) => item === ITEMS[index]);
    });

    expect(identical).toEqual([]);
  });

  it('reaches every position over many seeds', () => {
    // Guards against an off-by-one that pins the first or last element in place.
    const positionsOfA = new Set<number>();
    for (let seed = 0; seed < 200; seed += 1) {
      positionsOfA.add(shuffle(ITEMS, createSeededRng(seed)).indexOf('a'));
    }

    expect(positionsOfA.size).toBe(ITEMS.length);
  });
});

describe('sample', () => {
  it('takes the requested count', () => {
    expect(sample(ITEMS, 3, createSeededRng(5))).toHaveLength(3);
  });

  it('never repeats an item', () => {
    const drawn = sample(ITEMS, 8, createSeededRng(6));

    expect(new Set(drawn).size).toBe(8);
  });

  it('is reproducible for a given seed', () => {
    expect(sample(ITEMS, 4, createSeededRng(9))).toEqual(sample(ITEMS, 4, createSeededRng(9)));
  });

  it('returns the whole pool when asked for more than it holds', () => {
    // A short quiz beats a crash or a hang. A "pick until you have N" implementation would loop
    // forever here.
    const drawn = sample(ITEMS, 100, createSeededRng(1));

    expect(drawn).toHaveLength(ITEMS.length);
    expect([...drawn].sort()).toEqual([...ITEMS].sort());
  });

  it('returns nothing for a non-positive count', () => {
    expect(sample(ITEMS, 0, createSeededRng(1))).toEqual([]);
    expect(sample(ITEMS, -3, createSeededRng(1))).toEqual([]);
  });

  it('returns nothing from an empty pool', () => {
    expect(sample([], 5, createSeededRng(1))).toEqual([]);
  });
});
