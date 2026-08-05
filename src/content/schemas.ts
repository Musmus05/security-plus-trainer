import { z } from 'zod';

import { LOCALES } from '@/lib/store/settings.schema';

/**
 * Schemas for every kind of pedagogical content.
 *
 * These are the single source of truth for shape: the TypeScript types below are *inferred* from
 * the schemas, never written twice. `scripts/validate-content.ts` runs them over the whole corpus
 * in CI, which is the only practical way to keep a few hundred hand-written questions honest.
 */

/* ------------------------------------------------------------------ primitives */

/**
 * A string in both languages.
 *
 * French is required, not optional. A half-translated corpus is worse than an untranslated one:
 * the learner switches language and gets an unpredictable mixture, with no way to tell what is
 * missing from what is deliberately in English.
 */
export const localizedTextSchema = z.object({
  en: z.string().min(1),
  fr: z.string().min(1),
});
export type LocalizedText = z.infer<typeof localizedTextSchema>;

/** Objective ids follow the exam's own numbering: "1.1" through "5.6". */
export const objectiveIdSchema = z
  .string()
  .regex(/^[1-5]\.[1-9]$/, 'must be an exam objective number such as "4.6"');
export type ObjectiveId = z.infer<typeof objectiveIdSchema>;

export const domainIdSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);
export type DomainId = z.infer<typeof domainIdSchema>;

export const localeSchema = z.enum(LOCALES);

/* ------------------------------------------------------------ the exam outline */

export const objectiveSchema = z.object({
  id: objectiveIdSchema,
  domain: domainIdSchema,
  /**
   * The English title is quoted **verbatim** from the official objectives document — it is the
   * exam's own index, and altering it makes the objective unfindable in any other resource. The
   * French title is a working translation shown alongside it, never instead of it.
   */
  title: localizedTextSchema,
  /**
   * The objective's top-level sub-bullets, in official English.
   *
   * This is the syllabus for content authoring: a lesson that skips one of these has a hole in it,
   * and the content gate can say which. Not translated — these are the terms the exam uses.
   */
  topics: z.array(z.string().min(1)).min(1),
});
export type Objective = z.infer<typeof objectiveSchema>;

export const domainSchema = z.object({
  id: domainIdSchema,
  /** "1.0" … "5.0", as printed in the objectives document. */
  number: z.string().regex(/^[1-5]\.0$/),
  name: localizedTextSchema,
  /** Share of the exam, as a fraction. The five must sum to exactly 1. */
  weight: z.number().gt(0).lt(1),
  objectives: z.array(objectiveSchema).min(1),
});
export type Domain = z.infer<typeof domainSchema>;

export const examOutlineSchema = z
  .array(domainSchema)
  .length(5)
  .superRefine((domains, ctx) => {
    // Weights are compared in basis points: 0.12 + 0.22 + 0.18 + 0.28 + 0.2 is 0.9999999999999999
    // in binary floating point, and a naive `=== 1` would reject a correct outline.
    const basisPoints = domains.reduce(
      (sum, domain) => sum + Math.round(domain.weight * 10_000),
      0,
    );
    if (basisPoints !== 10_000) {
      ctx.addIssue({
        code: 'custom',
        message: `domain weights must sum to 100%, got ${String(basisPoints / 100)}%`,
      });
    }

    const seenDomainIds = new Set<number>();
    const seenObjectiveIds = new Set<string>();

    for (const domain of domains) {
      if (seenDomainIds.has(domain.id)) {
        ctx.addIssue({ code: 'custom', message: `duplicate domain ${String(domain.id)}` });
      }
      seenDomainIds.add(domain.id);

      for (const objective of domain.objectives) {
        if (seenObjectiveIds.has(objective.id)) {
          ctx.addIssue({ code: 'custom', message: `duplicate objective ${objective.id}` });
        }
        seenObjectiveIds.add(objective.id);

        // An objective filed under the wrong domain would silently mis-weight the mock exam.
        if (!objective.id.startsWith(`${String(domain.id)}.`)) {
          ctx.addIssue({
            code: 'custom',
            message: `objective ${objective.id} is listed under domain ${String(domain.id)}`,
          });
        }
      }
    }
  });

/* ---------------------------------------------------------------- questions */

export const questionKinds = ['recall', 'discrimination', 'scenario'] as const;
export const questionKindSchema = z.enum(questionKinds);

export const difficulties = ['easy', 'medium', 'hard'] as const;
export const difficultySchema = z.enum(difficulties);

export const answerOptionSchema = z.object({
  id: z.string().regex(/^[a-f]$/),
  text: localizedTextSchema,
  correct: z.boolean(),
  /**
   * Required on **every** option, not just the wrong ones.
   *
   * A learner who guessed correctly needs to know why they were right as much as one who guessed
   * wrong needs to know why they were not. Making this optional is how a question bank fills up
   * with unexplained distractors.
   */
  explanation: localizedTextSchema,
});
export type AnswerOption = z.infer<typeof answerOptionSchema>;

export const questionSchema = z
  .object({
    id: z.string().regex(/^q-[1-5]-[1-9]-\d{3}$/, 'must look like "q-4-6-007"'),
    objective: objectiveIdSchema,
    kind: questionKindSchema,
    difficulty: difficultySchema,
    prompt: localizedTextSchema,
    options: z.array(answerOptionSchema).min(3).max(6),
    /** Set when the prompt asks for more than one answer. */
    multiSelect: z.boolean().optional(),
  })
  .superRefine((question, ctx) => {
    const correct = question.options.filter((option) => option.correct);

    if (question.multiSelect === true) {
      if (correct.length < 2) {
        ctx.addIssue({
          code: 'custom',
          message: 'a multi-select question needs at least two correct options',
          path: ['options'],
        });
      }
    } else if (correct.length !== 1) {
      ctx.addIssue({
        code: 'custom',
        message: `expected exactly one correct option, found ${String(correct.length)}`,
        path: ['options'],
      });
    }

    const ids = question.options.map((option) => option.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: 'custom', message: 'option ids must be unique', path: ['options'] });
    }

    // The question id encodes its objective; a mismatch means one of the two is a typo, and the
    // question would be sampled for the wrong domain.
    const [, domain, objective] = /^q-([1-5])-([1-9])-/.exec(question.id) ?? [];
    if (domain !== undefined && `${domain}.${String(objective)}` !== question.objective) {
      ctx.addIssue({
        code: 'custom',
        message: `id ${question.id} disagrees with objective ${question.objective}`,
        path: ['id'],
      });
    }

    for (const banned of ['all of the above', 'none of the above']) {
      const offender = question.options.find((option) =>
        option.text.en.toLowerCase().includes(banned),
      );
      if (offender) {
        ctx.addIssue({
          code: 'custom',
          // These test test-taking rather than security, and they let an author avoid writing a
          // fourth real distractor.
          message: `"${banned}" is not an allowed option`,
          path: ['options'],
        });
      }
    }
  });
export type Question = z.infer<typeof questionSchema>;

/* --------------------------------------------------------------- flashcards */

export const flashcardSchema = z.object({
  id: z.string().regex(/^f-[1-5]-[1-9]-\d{3}$/, 'must look like "f-1-1-004"'),
  objective: objectiveIdSchema,
  front: localizedTextSchema,
  back: localizedTextSchema,
  hint: localizedTextSchema.optional(),
});
export type Flashcard = z.infer<typeof flashcardSchema>;

/* ----------------------------------------------------------------- acronyms */

export const acronymSchema = z.object({
  // Covers the shapes the official list actually uses: AES-256, IEEE 802.1X, S/MIME, IaaS.
  acronym: z.string().regex(/^[A-Z0-9][A-Z0-9a-z/.-]{0,15}$/),
  /** The official expansion, in English. Not translated: it is what appears on the exam. */
  en: z.string().min(1),
  /** A short French gloss to aid comprehension, alongside the English expansion. */
  fr: z.string().min(1),
  /** Objectives where the term is examined. May be empty for general vocabulary. */
  objectives: z.array(objectiveIdSchema),
});
export type Acronym = z.infer<typeof acronymSchema>;

export const acronymListSchema = z.array(acronymSchema).superRefine((entries, ctx) => {
  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.acronym)) {
      ctx.addIssue({ code: 'custom', message: `duplicate acronym ${entry.acronym}` });
    }
    seen.add(entry.acronym);
  }
});
