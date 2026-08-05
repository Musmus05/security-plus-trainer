import { z } from 'zod';

import { objectiveIdSchema } from '@/content/schemas';

/**
 * Persisted progress and gamification state.
 *
 * Same reasoning as the settings schema: this comes back out of `localStorage`, which is
 * hand-editable and may have been written by an older build. It is parsed rather than trusted, and
 * a bad record costs that record rather than the session.
 */

/** What the app records per objective. */
export const objectiveRecordSchema = z.object({
  lessonRead: z.boolean(),
  quizAttempts: z.number().int().nonnegative(),
  /** Best accuracy across attempts, 0–1. */
  bestAccuracy: z.number().min(0).max(1),
});
export type ObjectiveRecord = z.infer<typeof objectiveRecordSchema>;

export const NO_RECORD: ObjectiveRecord = {
  lessonRead: false,
  quizAttempts: 0,
  bestAccuracy: 0,
};

const dayKeySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const streakStateSchema = z.object({
  current: z.number().int().nonnegative(),
  longest: z.number().int().nonnegative(),
  lastCompletedDay: dayKeySchema.nullable(),
  freezes: z.number().int().min(0).max(2),
});

export const gamificationStateSchema = z.object({
  totalXp: z.number().int().nonnegative(),
  streak: streakStateSchema,
  /** Day key → XP earned that day. */
  ledger: z.record(dayKeySchema, z.number().int().nonnegative()),
});
export type GamificationState = z.infer<typeof gamificationStateSchema>;

export const INITIAL_GAMIFICATION: GamificationState = {
  totalXp: 0,
  streak: { current: 0, longest: 0, lastCompletedDay: null, freezes: 0 },
  ledger: {},
};

export const progressMapSchema = z.record(objectiveIdSchema, objectiveRecordSchema);
export type ProgressMap = z.infer<typeof progressMapSchema>;

/**
 * Coerce persisted gamification state, falling back per field.
 *
 * Total XP is the one value a learner would genuinely mourn, so it survives a corrupt streak or a
 * corrupt ledger rather than being discarded with them.
 */
export function coerceGamification(value: unknown): GamificationState {
  const whole = gamificationStateSchema.safeParse(value);
  if (whole.success) {
    return whole.data;
  }

  const candidate = (typeof value === 'object' && value !== null ? value : {}) as Record<
    string,
    unknown
  >;

  const totalXp = z.number().int().nonnegative().safeParse(candidate['totalXp']);
  const streak = streakStateSchema.safeParse(candidate['streak']);
  const ledger = gamificationStateSchema.shape.ledger.safeParse(candidate['ledger']);

  return {
    totalXp: totalXp.success ? totalXp.data : INITIAL_GAMIFICATION.totalXp,
    streak: streak.success ? streak.data : INITIAL_GAMIFICATION.streak,
    ledger: ledger.success ? ledger.data : INITIAL_GAMIFICATION.ledger,
  };
}

/**
 * Coerce the per-objective progress map, dropping only the entries that are broken.
 *
 * Entry by entry rather than all at once: one corrupt objective must not erase the other 27.
 */
export function coerceProgress(value: unknown): ProgressMap {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  const kept: ProgressMap = {};
  for (const [key, entry] of Object.entries(value)) {
    const id = objectiveIdSchema.safeParse(key);
    const record = objectiveRecordSchema.safeParse(entry);
    if (id.success && record.success) {
      kept[id.data] = record.data;
    }
  }
  return kept;
}
