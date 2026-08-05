# 5. MDX for lessons, typed modules for structured content

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

The corpus splits cleanly into two kinds of content with different needs:

- **Prose** — 56 lesson files (28 objectives × 2 languages), 900–1500 words each, with tables,
  callouts, comparison lists and inline code. Reviewed by _reading it_.
- **Structured data** — questions with distractors and per-option explanations, flashcards, ~345
  acronyms, the domain/objective tree. Reviewed by _checking its invariants_.

Choosing one representation for both means losing on one side: prose inside TypeScript template
literals is unreadable and undiffable, while questions inside MDX cannot be validated.

## Decision

Split by need.

**Lessons: MDX.** Authored as `.mdx`, compiled by `@mdx-js/rollup` with `remark-gfm`, imported as
React components through `@mdx-js/react` so shared callout components (`ExamTrap`, `Mnemonic`,
`Term`) are available without importing them in every file.

**Everything structured: TypeScript modules validated by Zod.** One module per objective per content
type, exporting a typed array. Zod schemas are the single source of truth for shape; the inferred
TypeScript types are derived from them, never written twice.

Both are reached through dynamic `import()` keyed by objective id, so nothing is in the initial
bundle.

## Invariants the content gate enforces

`scripts/validate-content.ts` fails the build on any of:

- an English lesson with no French counterpart, or the reverse
- a duplicate question, flashcard or acronym id
- a question referencing an objective that does not exist in the tree
- a correct-answer index outside the option array
- an answer option — correct **or** distractor — with no explanation
- a French content string that introduces a technical term without the English term (per ADR-0004)
- an objective with fewer questions or flashcards than the per-objective minimum

## Consequences

- Two content pipelines to understand instead of one. Accepted: each is simple, and the split
  matches how the content is actually reviewed.
- Prose is not type-checked. Mitigated by the parity and structural checks above, plus human review
  — which is the correct instrument for prose anyway.
- Adding a content type means adding a Zod schema _and_ checks in the same pull request. This is
  enforced in the PR template rather than left to memory.
