import { describe, expect, it } from 'vitest';

import { clampFraction, toPercent } from './fraction';

describe('clampFraction', () => {
  it.each([
    [0, 0],
    [0.5, 0.5],
    [1, 1],
    [-0.4, 0],
    [1.7, 1],
    [Number.NaN, 0],
    [Number.POSITIVE_INFINITY, 1],
    [Number.NEGATIVE_INFINITY, 0],
  ])('maps %s to %s', (input, expected) => {
    expect(clampFraction(input)).toBe(expected);
  });
});

describe('toPercent', () => {
  it.each([
    [0, 0],
    [0.42, 42],
    [0.425, 43],
    [1, 100],
    [4, 100],
    [-1, 0],
  ])('renders %s as %s%%', (input, expected) => {
    expect(toPercent(input)).toBe(expected);
  });
});
