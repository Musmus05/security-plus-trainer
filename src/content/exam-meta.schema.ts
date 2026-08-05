import { z } from 'zod';

/**
 * Runtime schema for the target exam's metadata.
 *
 * This exists as a schema rather than as a bare `as const` object because the content gate has
 * to check *values*, not literal types. Asserting `EXAM_META.domainCount === 5` against an
 * `as const` object is a tautology the compiler can prove — it protects nothing. Parsing the
 * object first widens it back to plain `number` and `string`, so the invariants below are
 * genuinely evaluated, and keep being evaluated as the object is edited.
 *
 * The domain/objective tree gets the same treatment when it lands.
 */

/** ISO 639-1 two-letter language code. */
const localeCodeSchema = z
  .string()
  .regex(/^[a-z]{2}$/, 'must be a two-letter ISO 639-1 language code');

export const examMetaSchema = z
  .object({
    code: z.string().regex(/^SY0-\d{3}$/, 'must look like an SY0-nnn exam code'),
    objectivesDocumentVersion: z.string().regex(/^\d+\.\d+$/, 'must be a major.minor version'),
    launchedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be an ISO date'),
    maxQuestions: z.number().int().positive(),
    durationMinutes: z.number().int().positive(),
    passingScore: z.number().int().positive(),
    scoreScale: z.object({
      min: z.number().int(),
      max: z.number().int(),
    }),
    domainCount: z.number().int().positive(),
    objectiveCount: z.number().int().positive(),
    examLanguages: z.array(localeCodeSchema).min(1),
  })
  .refine((meta) => meta.scoreScale.min < meta.scoreScale.max, {
    error: 'scoreScale.min must be below scoreScale.max',
    path: ['scoreScale'],
  })
  .refine(
    (meta) => meta.passingScore > meta.scoreScale.min && meta.passingScore < meta.scoreScale.max,
    {
      error: 'passingScore must sit strictly inside the reported score scale',
      path: ['passingScore'],
    },
  )
  .refine((meta) => meta.domainCount === 5, {
    error: 'SY0-701 has exactly 5 domains per the official objectives document',
    path: ['domainCount'],
  })
  .refine((meta) => meta.objectiveCount === 28, {
    error: 'SY0-701 has exactly 28 numbered objectives (4 + 5 + 4 + 9 + 6)',
    path: ['objectiveCount'],
  })
  .refine((meta) => !meta.examLanguages.includes('fr'), {
    // Deliberate tripwire, not a typo. The bilingual strategy in ADR-0004 rests on French not
    // being an exam language. If CompTIA ever adds it, this fails and forces a rethink rather
    // than letting the assumption rot silently.
    error:
      'French is now listed as an exam language — revisit docs/adr/0004-french-as-comprehension-aid.md',
    path: ['examLanguages'],
  });

export type ExamMeta = z.infer<typeof examMetaSchema>;
