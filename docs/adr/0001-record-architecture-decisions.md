# 1. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

This project will be built over many pull requests and revisited months later, close to an exam
date, when the reasoning behind a choice is long forgotten. Several decisions here are non-obvious
and will look like mistakes to a future reader who lacks the context — pinning TypeScript below the
latest release, for instance, or treating French as a second-class content language on purpose.

## Decision

Significant decisions are recorded as short, numbered, append-only documents in `docs/adr/`,
following the format popularised by Michael Nygard.

An ADR is warranted when a decision is expensive to reverse, constrains later work, or would
otherwise be re-litigated. Formatting preferences and library micro-choices do not need one.

Records are never edited to change their conclusion. A decision that no longer holds gets a new ADR
that supersedes it, and the old one is marked `Superseded by ADR-NNNN`.

## Consequences

- Reviewers can point at a document instead of re-arguing a settled question.
- `docs/adr/` is listed in `CODEOWNERS`, so changes there always get read.
- There is a small ongoing cost: a decision worth an ADR costs ten extra minutes to land.
