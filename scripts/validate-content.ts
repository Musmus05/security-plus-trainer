#!/usr/bin/env tsx
/**
 * Content integrity gate.
 *
 * Runs in CI on every pull request. It exists because the pedagogical content is the part of
 * this project a type checker cannot police on its own: a lesson can be missing its French
 * counterpart, a question can point at an objective that does not exist, a distractor can ship
 * without an explanation. Each of those is a silent quality regression, so each is an error here.
 *
 * The checks grow with the content model. Today it validates the exam metadata; the domain tree,
 * question bank, flashcard decks and acronym appendix are added by the pull requests that
 * introduce them, and every new content type must arrive with its own schema and checks.
 */
import type { z } from 'zod';

import { EXAM_META } from '../src/content/exam-meta.ts';
import { examMetaSchema } from '../src/content/exam-meta.schema.ts';

interface Violation {
  source: string;
  path: string;
  message: string;
}

const violations: Violation[] = [];
let sourcesChecked = 0;

/**
 * Parse one content module against its schema, collecting every issue rather than throwing on
 * the first. A content author fixing ten problems wants to see ten messages, not one per run.
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

validate('exam-meta', examMetaSchema, EXAM_META);

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
  `✔ content validation passed — ${String(sourcesChecked)} source(s) validated, 0 violations`,
);
