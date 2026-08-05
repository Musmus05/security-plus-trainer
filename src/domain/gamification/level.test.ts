import { describe, expect, it } from 'vitest';

import { levelFor, levelProgress, RANK_LADDER, rankFor, xpToReach } from './level';

describe('xpToReach', () => {
  it('puts level 1 at zero', () => {
    expect(xpToReach(1)).toBe(0);
    expect(xpToReach(0)).toBe(0);
    expect(xpToReach(-5)).toBe(0);
  });

  it('matches the published curve', () => {
    expect(xpToReach(2)).toBe(50);
    expect(xpToReach(3)).toBe(150);
    expect(xpToReach(4)).toBe(300);
    expect(xpToReach(5)).toBe(500);
    expect(xpToReach(10)).toBe(2250);
  });

  it('increases strictly', () => {
    for (let level = 2; level <= 200; level += 1) {
      expect(xpToReach(level), `level ${String(level)}`).toBeGreaterThan(xpToReach(level - 1));
    }
  });
});

describe('levelFor', () => {
  it('starts at level 1', () => {
    expect(levelFor(0)).toBe(1);
    expect(levelFor(-100)).toBe(1);
    expect(levelFor(49)).toBe(1);
  });

  it('levels up exactly at the threshold, not one XP early or late', () => {
    // The whole reason the curve is invertible in closed form: an off-by-one here would mean a
    // learner watching their XP tick over and the level not moving.
    for (let level = 2; level <= 200; level += 1) {
      const threshold = xpToReach(level);

      expect(levelFor(threshold - 1), `one below level ${String(level)}`).toBe(level - 1);
      expect(levelFor(threshold), `exactly at level ${String(level)}`).toBe(level);
      expect(levelFor(threshold + 1), `one above level ${String(level)}`).toBe(level);
    }
  });

  it('is the exact inverse of xpToReach', () => {
    for (let level = 1; level <= 200; level += 1) {
      expect(levelFor(xpToReach(level)), `level ${String(level)}`).toBe(level);
    }
  });
});

describe('levelProgress', () => {
  it('reports a fresh learner at the bottom of level 1', () => {
    expect(levelProgress(0)).toEqual({
      level: 1,
      xpIntoLevel: 0,
      xpForLevel: 50,
      fraction: 0,
      xpToNextLevel: 50,
    });
  });

  it('reports the halfway point of a level', () => {
    // Level 2 spans 50 → 150, so 100 XP is exactly half.
    expect(levelProgress(100)).toEqual({
      level: 2,
      xpIntoLevel: 50,
      xpForLevel: 100,
      fraction: 0.5,
      xpToNextLevel: 50,
    });
  });

  it('reports a level boundary as the start of the new level, not the end of the old', () => {
    const progress = levelProgress(150);

    expect(progress.level).toBe(3);
    expect(progress.xpIntoLevel).toBe(0);
    expect(progress.fraction).toBe(0);
  });

  it('never reports a fraction outside 0–1', () => {
    for (let xp = 0; xp <= 20_000; xp += 37) {
      const { fraction } = levelProgress(xp);
      expect(fraction, `xp ${String(xp)}`).toBeGreaterThanOrEqual(0);
      expect(fraction, `xp ${String(xp)}`).toBeLessThan(1);
    }
  });

  it('treats negative XP as zero rather than propagating it', () => {
    expect(levelProgress(-500).level).toBe(1);
    expect(levelProgress(-500).xpIntoLevel).toBe(0);
  });
});

describe('rankFor', () => {
  it('starts at the first rank', () => {
    expect(rankFor(1)).toBe('Curious Newcomer');
    expect(rankFor(2)).toBe('Curious Newcomer');
  });

  it('promotes at each ladder threshold', () => {
    for (const { fromLevel, title } of RANK_LADDER) {
      expect(rankFor(fromLevel), `level ${String(fromLevel)}`).toBe(title);
    }
  });

  it('holds the previous rank until the next threshold', () => {
    expect(rankFor(4)).toBe('Help Desk');
    expect(rankFor(5)).toBe('Junior SysAdmin');
    expect(rankFor(7)).toBe('Junior SysAdmin');
    expect(rankFor(8)).toBe('SOC Analyst I');
  });

  it('caps at the top rank rather than running out', () => {
    expect(rankFor(42)).toBe('CISO');
    expect(rankFor(500)).toBe('CISO');
  });

  it('has a strictly ascending ladder', () => {
    for (let i = 1; i < RANK_LADDER.length; i += 1) {
      expect(RANK_LADDER[i]!.fromLevel).toBeGreaterThan(RANK_LADDER[i - 1]!.fromLevel);
    }
  });
});
