import { z } from 'zod';

import { objectiveIdSchema } from '@/content/schemas';
import type { ExamAttempt } from '@/domain/exam';

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

/* ------------------------------------------------- spaced-repetition schedule */

/**
 * One card's schedule.
 *
 * The bounds mirror `src/domain/srs/scheduler.ts` rather than trusting it, because this data comes
 * back out of `localStorage`, where an ease of `1e9` is one edit away. An out-of-range value would
 * schedule the card past the heat death of the universe and the learner would simply never see it
 * again — a silent loss, which is the worst kind.
 */
export const cardStateSchema = z.object({
  ease: z.number().min(1.3).max(2.8),
  intervalDays: z.number().int().min(0).max(365),
  due: dayKeySchema,
  reps: z.number().int().nonnegative(),
  lapses: z.number().int().nonnegative(),
});

export const srsMapSchema = z.record(z.string().min(1), cardStateSchema);
export type SrsMap = z.infer<typeof srsMapSchema>;

/**
 * Coerce the persisted review schedule, card by card.
 *
 * Same rule as the progress map: one unparseable card costs that card. Losing a whole schedule
 * because a single entry was truncated mid-write would throw away weeks of reviews.
 */
export function coerceSrs(value: unknown): SrsMap {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  const kept: SrsMap = {};
  for (const [key, entry] of Object.entries(value)) {
    const state = cardStateSchema.safeParse(entry);
    if (key.length > 0 && state.success) {
      kept[key] = state.data;
    }
  }
  return kept;
}

/* ------------------------------------------------------- questions already met */

/**
 * Question id → how many times it has been put in front of the learner.
 *
 * The exam and the quizzes draw from the same 420 questions, and a mock full of items already
 * drilled is a poor predictor: recognising a question is not the same as knowing the answer, and
 * the score flatters. This is what lets the exam prefer what the learner has not met.
 *
 * A count rather than a flag, because the ordering has to keep degrading once everything has been
 * seen — "least often" is still useful when "never" has run out.
 */
export const seenQuestionsSchema = z.record(z.string().min(1), z.number().int().positive());
export type SeenQuestions = z.infer<typeof seenQuestionsSchema>;

/**
 * Bounded by the corpus in practice; bounded here against a hand-edited blob.
 *
 * 420 questions today, and an exam version change would not multiply that by ten. The cap exists so
 * a pathological `localStorage` entry cannot grow the store without limit, not because normal use
 * comes near it.
 */
export const MAX_SEEN_QUESTIONS = 5000;

export function coerceSeenQuestions(value: unknown): SeenQuestions {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  const counter = z.number().int().positive();
  const kept: SeenQuestions = {};
  let count = 0;

  for (const [id, times] of Object.entries(value)) {
    if (count >= MAX_SEEN_QUESTIONS) {
      break;
    }
    const parsed = counter.safeParse(times);
    if (id.length > 0 && parsed.success) {
      kept[id] = parsed.data;
      count += 1;
    }
  }
  return kept;
}

/* ---------------------------------------------------------------- mock exams */

/**
 * An exam attempt in progress.
 *
 * Question **ids**, never questions. Ninety questions with bilingual prose and four explanations
 * each is several hundred kilobytes, and a `localStorage` entry that large is a candidate for
 * eviction — which would lose the attempt it was written to protect.
 */
/**
 * Which exam an attempt or a result belongs to: the full paper, or one domain on its own.
 *
 * Defaulted rather than required, so an attempt written before domain papers existed parses as the
 * full exam instead of being discarded. That default is the difference between shipping this and
 * throwing away an exam somebody is halfway through.
 */
export const examScopeSchema = z.union([z.literal('full'), z.number().int().min(1).max(5)]);

export const examAttemptSchema = z.object({
  scope: examScopeSchema.default('full'),
  questionIds: z.array(z.string().min(1)).max(200),
  answers: z.record(z.string().min(1), z.array(z.string().min(1))),
  flagged: z.array(z.string().min(1)),
  index: z.number().int().nonnegative(),
  startedAt: z.number().int().positive(),
  durationMs: z.number().int().positive(),
  seed: z.number().int(),
});

export const examResultSchema = z.object({
  scope: examScopeSchema.default('full'),
  /** Epoch milliseconds the attempt was submitted. */
  at: z.number().int().positive(),
  correct: z.number().int().nonnegative(),
  total: z.number().int().positive(),
  unanswered: z.number().int().nonnegative(),
  scaled: z.number().int(),
  passed: z.boolean(),
  byDomain: z.array(
    z.object({
      domain: z.number().int().min(1).max(5),
      correct: z.number().int().nonnegative(),
      total: z.number().int().nonnegative(),
    }),
  ),
});
export type ExamResultRecord = z.infer<typeof examResultSchema>;

/**
 * An attempt that no longer matches its questions is discarded rather than repaired.
 *
 * Half an exam is not a shorter exam: the domain weighting is the whole point of the format, and a
 * partially-recovered attempt would report a score against a distribution nobody chose.
 */
export function coerceExamAttempt(value: unknown): ExamAttempt | null {
  const parsed = examAttemptSchema.safeParse(value);
  if (!parsed.success) {
    return null;
  }

  // An index past the end would render a blank question with no way forward.
  if (parsed.data.index >= parsed.data.questionIds.length) {
    return null;
  }

  return parsed.data;
}

/** An unbounded history is a slow leak in a store measured in a few megabytes. */
export const MAX_EXAM_HISTORY = 20;

/** Attempt history, entry by entry: one corrupt result must not erase the rest. */
export function coerceExamHistory(value: unknown): ExamResultRecord[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const kept: ExamResultRecord[] = [];
  for (const entry of value) {
    const parsed = examResultSchema.safeParse(entry);
    if (parsed.success) {
      kept.push(parsed.data);
    }
  }
  return kept.sort((a, b) => b.at - a.at).slice(0, MAX_EXAM_HISTORY);
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
