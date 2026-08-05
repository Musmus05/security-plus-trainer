export const HEAT_LEVELS = [0, 1, 2, 3, 4] as const;

export type HeatLevel = (typeof HEAT_LEVELS)[number];

/**
 * Bucket a day's XP into one of five heatmap levels.
 *
 * Scaled to the learner's own daily goal rather than to fixed XP numbers: someone with a 50 XP goal
 * and someone with a 250 XP goal should both see a full cell for a good day. Fixed thresholds would
 * make the map look empty for one of them and saturated for the other.
 *
 * Lives in its own module so `ActivityHeatmap` exports only a component — a module mixing the two
 * breaks React Fast Refresh.
 */
export function bucket(xp: number, dailyGoalXp: number): HeatLevel {
  if (xp <= 0) {
    return 0;
  }

  const ratio = xp / Math.max(1, dailyGoalXp);

  if (ratio >= 2) return 4;
  if (ratio >= 1) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}
