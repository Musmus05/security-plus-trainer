#!/usr/bin/env tsx
/**
 * Content integrity gate.
 *
 * Runs in CI on every pull request. It exists because the pedagogical content is the part of this
 * project a type checker cannot police on its own: a lesson can be missing its French counterpart,
 * a question can point at an objective that does not exist, a distractor can ship without an
 * explanation. Each of those is a silent quality regression, so each is an error here.
 *
 * Every new content type must arrive with its own schema and its own checks in the same pull
 * request. The rule is in CONTRIBUTING.md and enforced in review.
 */
import type { z } from 'zod';

import { EXAM_META } from '../src/content/exam-meta.ts';
import { examMetaSchema } from '../src/content/exam-meta.schema.ts';
import { ALL_OBJECTIVES, DOMAINS, findObjective } from '../src/content/exam/sy0-701/domains.ts';
import { QUESTIONS_1_1 } from '../src/content/exam/sy0-701/questions/1-1.ts';
import { examOutlineSchema, type Question, questionSchema } from '../src/content/schemas.ts';

interface Violation {
  source: string;
  path: string;
  message: string;
}

const violations: Violation[] = [];
let sourcesChecked = 0;

/**
 * Parse one content module against its schema, collecting every issue rather than throwing on the
 * first. A content author fixing ten problems wants to see ten messages, not one per run.
 */
function validate(source: string, schema: z.ZodType, value: unknown): void {
  sourcesChecked += 1;

  const result = schema.safeParse(value);
  if (result.success) {
    return;
  }

  for (const issue of result.error.issues) {
    violations.push({
      source,
      path: issue.path.length > 0 ? issue.path.map(String).join('.') : '(root)',
      message: issue.message,
    });
  }
}

function fail(source: string, path: string, message: string): void {
  violations.push({ source, path, message });
}

/* ------------------------------------------------------------------- schemas */

validate('exam-meta', examMetaSchema, EXAM_META);
validate('exam-outline', examOutlineSchema, DOMAINS);

/* -------------------------------------------- cross-checks between the two */

sourcesChecked += 1;

if (ALL_OBJECTIVES.length !== EXAM_META.objectiveCount) {
  fail(
    'exam-outline',
    'objectives',
    `the outline has ${String(ALL_OBJECTIVES.length)} objectives but exam-meta claims ` +
      String(EXAM_META.objectiveCount),
  );
}

if (DOMAINS.length !== EXAM_META.domainCount) {
  fail(
    'exam-outline',
    'domains',
    `the outline has ${String(DOMAINS.length)} domains but exam-meta claims ` +
      String(EXAM_META.domainCount),
  );
}

/*
 * The mock exam allocates its 90 questions by domain weight. If any domain's share rounds to zero
 * a whole slice of the exam would never be sampled, and the learner would never find out.
 */
for (const domain of DOMAINS) {
  const allocation = Math.round(domain.weight * EXAM_META.maxQuestions);
  if (allocation < 1) {
    fail(
      'exam-outline',
      `domain ${domain.number}`,
      `weight ${String(domain.weight)} allocates ${String(allocation)} of ` +
        `${String(EXAM_META.maxQuestions)} exam questions`,
    );
  }
}

/*
 * French titles must differ from English ones. An identical pair almost always means a translation
 * was forgotten rather than that the two languages happen to agree — and an objective title is
 * never a term short enough for that to be plausible.
 */
sourcesChecked += 1;

for (const objective of ALL_OBJECTIVES) {
  if (objective.title.fr === objective.title.en) {
    fail('exam-outline', objective.id, 'the French title is identical to the English one');
  }
}

for (const domain of DOMAINS) {
  if (domain.name.fr === domain.name.en) {
    fail('exam-outline', domain.number, 'the French domain name is identical to the English one');
  }
}

/* -------------------------------------------------------------- question banks */

/** Every authored bank. New objectives are added here as their questions are written. */
const BANKS: { objective: string; questions: Question[] }[] = [
  { objective: '1.1', questions: QUESTIONS_1_1 },
];

/** From docs/content-authoring.md. */
const MIN_QUESTIONS_PER_OBJECTIVE = 15;

/**
 * A distractor with a one-line explanation is schema-valid and pedagogically useless. The floor is
 * deliberately low: it catches placeholder text, not thin writing. Whether an explanation actually
 * explains is a review judgement, not a machine one.
 */
const MIN_EXPLANATION_LENGTH = 40;

const seenQuestionIds = new Set<string>();

for (const bank of BANKS) {
  const source = `questions/${bank.objective}`;
  sourcesChecked += 1;

  if (findObjective(bank.objective) === undefined) {
    fail(source, 'objective', `no such objective: ${bank.objective}`);
  }

  if (bank.questions.length < MIN_QUESTIONS_PER_OBJECTIVE) {
    fail(
      source,
      'count',
      `${String(bank.questions.length)} questions, below the documented minimum of ` +
        String(MIN_QUESTIONS_PER_OBJECTIVE),
    );
  }

  for (const [index, question] of bank.questions.entries()) {
    const at = `[${String(index)}]`;

    const result = questionSchema.safeParse(question);
    if (!result.success) {
      for (const issue of result.error.issues) {
        fail(source, `${at}.${issue.path.map(String).join('.')}`, issue.message);
      }
      // Everything below assumes the shape held.
      continue;
    }

    // Ids must be unique across the whole corpus, not just within a bank: the mock exam pools them.
    if (seenQuestionIds.has(question.id)) {
      fail(source, `${at}.id`, `duplicate question id ${question.id}`);
    }
    seenQuestionIds.add(question.id);

    if (question.objective !== bank.objective) {
      fail(
        source,
        `${at}.objective`,
        `question claims objective ${question.objective} but is filed under ${bank.objective}`,
      );
    }

    for (const [optionIndex, option] of question.options.entries()) {
      for (const locale of ['en', 'fr'] as const) {
        const text = option.explanation[locale];
        if (text.length < MIN_EXPLANATION_LENGTH) {
          fail(
            source,
            `${at}.options[${String(optionIndex)}].explanation.${locale}`,
            `${String(text.length)} characters; too short to explain anything`,
          );
        }
      }
    }
  }
}

/* ------------------------------------------------------------------------ report */

if (violations.length > 0) {
  console.error(`\n✖ content validation failed — ${String(violations.length)} violation(s)\n`);
  for (const { source, path, message } of violations) {
    console.error(`  ${source} → ${path}: ${message}`);
  }
  console.error('');
  process.exit(1);
}

console.log(
  `✔ content validation passed — ${String(sourcesChecked)} source(s) validated, ` +
    `${String(DOMAINS.length)} domains, ${String(ALL_OBJECTIVES.length)} objectives, 0 violations`,
);
