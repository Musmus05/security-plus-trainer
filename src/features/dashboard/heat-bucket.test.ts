import { describe, expect, it } from 'vitest';

import { bucket, HEAT_LEVELS } from './heat-bucket';

describe('bucket', () => {
  it('puts an empty day at level zero', () => {
    expect(bucket(0, 150)).toBe(0);
    expect(bucket(-10, 150)).toBe(0);
  });

  it('scales to the learner’s own goal, not to fixed XP numbers', () => {
    // The point of the design: 100 XP is a full day against a 100 goal and a quiet one against 250.
    expect(bucket(100, 100)).toBe(3);
    expect(bucket(100, 250)).toBe(1);
  });

  it('reaches the top level at twice the goal', () => {
    expect(bucket(299, 150)).toBe(3);
    expect(bucket(300, 150)).toBe(4);
    expect(bucket(10_000, 150)).toBe(4);
  });

  it('marks a partial day distinctly from a met one', () => {
    expect(bucket(1, 150)).toBe(1);
    expect(bucket(74, 150)).toBe(1);
    expect(bucket(75, 150)).toBe(2);
    expect(bucket(149, 150)).toBe(2);
    expect(bucket(150, 150)).toBe(3);
  });

  it('survives a zero goal instead of dividing by it', () => {
    expect(bucket(50, 0)).toBe(4);
    expect(bucket(0, 0)).toBe(0);
  });

  it('only ever returns a declared level', () => {
    for (let xp = 0; xp <= 600; xp += 7) {
      expect(HEAT_LEVELS).toContain(bucket(xp, 150));
    }
  });
});
