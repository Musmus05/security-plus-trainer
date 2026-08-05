# 4. Treat French as a comprehension aid, not a parallel exam language

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

The brief asked for a bilingual English/French study site. The natural reading is full parity: two
equal languages, switchable, each self-sufficient.

Research into the exam itself contradicts that. **CompTIA does not offer Security+ in French.** The
exam is delivered in English, Japanese, Portuguese, Spanish and Thai. A learner who revises
exclusively in French will sit an English paper having never drilled the English wording of the
concepts they know — and Security+ items lean heavily on precise terminology and on distinguishing
near-synonyms (_compensating_ vs _corrective_ control, _deterrent_ vs _preventive_).

Building naive parity would therefore make the app feel complete while actively harming the learner
it was built for.

## Decision

French is a first-class _explanatory_ language and a deliberately second-class _terminology_
language:

1. Every French lesson, question and flashcard renders the **official English term next to its
   French translation**, e.g. « contrôle compensatoire (_compensating control_) ». The English term
   is what gets memorised; the French is the scaffold.
2. Quizzes and the mock exam expose an **"English question text only"** toggle so that drilling can
   happen in the exam's real language, independently of the interface language.
3. The mock exam defaults to English question text regardless of interface language, because its
   purpose is to simulate the exam rather than to teach.
4. `scripts/validate-content.ts` asserts that `fr` is **absent** from `EXAM_META.examLanguages`. The
   check is a tripwire: if CompTIA ever adds French, it fails and forces this ADR to be revisited
   instead of the assumption silently rotting.

## Consequences

- French content is more verbose than a clean translation would be, by design.
- Content authoring gains a hard rule: a French sentence introducing a technical term must carry the
  English term. This is in the content checklist and in the PR template.
- The interface language and the question language are **two separate settings**, which is more
  state than a naive i18n setup, and is the point.
