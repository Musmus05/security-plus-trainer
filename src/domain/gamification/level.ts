/**
 * The level curve.
 *
 * `xpToReach(n) = 25 · n · (n − 1)` — a quadratic, chosen because it is invertible in closed form
 * and therefore exact. Levels come fast at the start (50 XP for level 2, 150 for level 3) and slow
 * steadily, so a first session feels productive without the tenth being trivial.
 *
 * The inverse matters more than it looks: without it, `levelFor` has to loop, and a loop over a
 * curve is where an off-by-one hides. Here the two functions are exact inverses and a test asserts
 * it for every level up to 200.
 */

/** Total XP needed to reach a level. Level 1 starts at zero. */
export function xpToReach(level: number): number {
  if (level <= 1) {
    return 0;
  }
  return 25 * level * (level - 1);
}

/** The level a given total XP has earned. */
export function levelFor(totalXp: number): number {
  if (totalXp <= 0) {
    return 1;
  }
  // Solving 25n² − 25n − xp = 0 for the positive root.
  return Math.floor((25 + Math.sqrt(625 + 100 * totalXp)) / 50);
}

export interface LevelProgress {
  level: number;
  /** XP earned since reaching the current level. */
  xpIntoLevel: number;
  /** XP the current level spans. */
  xpForLevel: number;
  /** 0–1, for a progress bar. */
  fraction: number;
  xpToNextLevel: number;
}

export function levelProgress(totalXp: number): LevelProgress {
  const level = levelFor(totalXp);
  const floor = xpToReach(level);
  const ceiling = xpToReach(level + 1);
  const xpForLevel = ceiling - floor;
  const xpIntoLevel = Math.max(0, totalXp) - floor;

  return {
    level,
    xpIntoLevel,
    xpForLevel,
    fraction: xpForLevel === 0 ? 0 : xpIntoLevel / xpForLevel,
    xpToNextLevel: ceiling - Math.max(0, totalXp),
  };
}

/**
 * Rank titles, themed to a security career path.
 *
 * Named in English in both locales: these are the job titles the field actually uses, and
 * translating "SOC Analyst" into French would make it less recognisable, not more.
 */
const RANKS = [
  { fromLevel: 1, title: 'Curious Newcomer' },
  { fromLevel: 3, title: 'Help Desk' },
  { fromLevel: 5, title: 'Junior SysAdmin' },
  { fromLevel: 8, title: 'SOC Analyst I' },
  { fromLevel: 12, title: 'SOC Analyst II' },
  { fromLevel: 16, title: 'Incident Responder' },
  { fromLevel: 21, title: 'Security Engineer' },
  { fromLevel: 27, title: 'Threat Hunter' },
  { fromLevel: 34, title: 'Security Architect' },
  { fromLevel: 42, title: 'CISO' },
] as const;

export function rankFor(level: number): string {
  // Widened to `string` deliberately: `RANKS[0].title` would otherwise narrow the accumulator to
  // the first title alone and reject every later assignment.
  let rank: string = RANKS[0].title;
  for (const candidate of RANKS) {
    if (level >= candidate.fromLevel) {
      rank = candidate.title;
    }
  }
  return rank;
}

export const RANK_LADDER: readonly { fromLevel: number; title: string }[] = RANKS;
