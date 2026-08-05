## What this changes

<!-- One or two sentences. What can the user do after this that they could not before? -->

## Why

<!-- The problem or need. Link the issue if there is one: Closes #NN -->

## How to review

<!-- The shortest path to seeing this work. Name the route, the toggle, the test. -->

1.
2.

## Checklist

- [ ] `npm run verify` passes locally
- [ ] `npm run test:e2e` passes (or this PR touches no user flow)
- [ ] `CHANGELOG.md` updated under `## [Unreleased]`
- [ ] Vercel preview opened and visually checked
- [ ] New logic in `src/domain/**` has unit tests and stays pure (no `Date.now()`, no
      `Math.random()`, no browser globals)
- [ ] Persisted-state changes bump `STORE_VERSION` and ship a migration + migration test

### Content pull requests only

- [ ] Every English lesson has its French counterpart
- [ ] Every question has an explanation for the correct answer **and each distractor**
- [ ] French text keeps the official English term visible alongside the translation
- [ ] All questions are **original**, written from the published objectives — no recalled or leaked
      exam content (see [`NOTICE.md`](../NOTICE.md))
