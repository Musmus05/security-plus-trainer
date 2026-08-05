# Architecture

## The shape of the problem

This is a content-heavy, offline-capable study app with a handful of small, exact engines at its
centre. Those two halves want opposite things:

- **The content** — 28 bilingual lessons, hundreds of questions, flashcard decks, ~345 acronyms —
  wants to be _data_: easy to write, easy to review in a diff, cheap to validate in bulk, and loaded
  only when the learner actually opens it.
- **The engines** — XP and streaks, spaced repetition, weighted exam sampling, score estimation —
  want to be _pure functions_: small, deterministic, and exhaustively unit-tested, because a wrong
  SRS interval or a mis-weighted exam quietly degrades revision for weeks before anyone notices.

The layout below follows from that split.

## Layers

```
src/
  app/         Routing, providers, layout shell, error boundaries.
  features/    One folder per user-facing capability. Owns its components,
               hooks and local types. Talks to `domain/` and `lib/`.
  domain/      Pure logic. No React, no I/O, no ambient time or randomness.
  content/     Pedagogical data: the exam tree, lessons (MDX), questions,
               flashcards, acronyms. Validated by Zod.
  lib/         Persistence (the Zustand store), the Clock, the seeded RNG,
               and other adapters between `domain/` and the browser.
  i18n/        Interface strings only — never pedagogical prose.
  ui/          Design system: tokens and presentational primitives.
  test/        Test setup and shared factories.
```

Dependency direction is one-way and enforced by ESLint, not by convention:

```
app  →  features  →  domain
          ↓   ↘        ↑
        ui    lib  ────┘   (lib adapts the impure world to domain's pure interfaces)
                content
```

`src/domain/**` may not import React, anything under `@/ui` or `@/features`, or `@/lib`. It may not
touch `window`, `document`, `localStorage`, `Date.now()` or `Math.random()`. Those rules live in
`eslint.config.js` under the `src/domain/**` block, so a violation fails CI rather than surviving as
a comment nobody reads.

## Why `domain/` is pure

Three of the engines are time- or chance-dependent, which is exactly what makes them hard to trust:

| Engine             | Depends on                         | Injected as                         |
| ------------------ | ---------------------------------- | ----------------------------------- |
| Streaks            | "what day is it, for this learner" | `Clock`                             |
| Spaced repetition  | "is this card due"                 | `Clock`                             |
| Mock exam sampling | "which 90 of the questions"        | `Rng` (seeded)                      |
| Exam timer         | elapsed wall-clock across a reload | `Clock` + persisted start timestamp |

Injecting both means a test can assert "a card graded _hard_ on 12 March is due again on 14 March"
by handing the reducer a fixed clock — no fake timers, no flakiness, no mocking of globals. It also
means the exam sampler can be replayed: given the same seed, the same 90 questions, so a test can
assert the domain distribution exactly instead of statistically.

## State and persistence

A single Zustand store, persisted to `localStorage`, holding:

- **progress** — per-objective lesson/quiz state, mastery crowns
- **gamification** — XP total, level, streak state, unlocked badges, daily activity log
- **srs** — one scheduling record per flashcard
- **exam** — the in-flight attempt (if any) and the attempt history
- **settings** — language, theme, daily goal, motion and sound preferences

The persisted shape is **versioned**. Any change to it bumps `STORE_VERSION` and ships a migration
plus a test that migrates a fixture of the previous shape. Losing a learner's streak to a deployment
is not an acceptable failure mode, so this is a review gate, not a guideline.

The store is the only writer to `localStorage`. Reducers themselves are pure functions imported from
`domain/`, which is what keeps them testable in isolation from persistence.

## Content model

Lessons are **MDX**, because 900–1500 words of prose with tables, callouts and inline code is
miserable to author inside TypeScript string literals. Everything structured — the domain tree,
questions, flashcards, acronyms — is **typed TypeScript validated by Zod**, because those need
machine-checkable invariants far more than they need pretty authoring.

Content is loaded with dynamic `import()` keyed by objective id, so opening objective 4.6 fetches
4.6 and nothing else. `vite.config.ts` keeps `chunkSizeWarningLimit` deliberately low so that a
change which accidentally makes the content bank static shows up as a build warning.

`npm run validate:content` (`scripts/validate-content.ts`) is the gate. It runs in CI on every pull
request and enforces the invariants a type checker cannot: EN/FR parity, unique ids, valid objective
references, an explanation attached to every answer option. Every new content type must arrive with
its own checks in the same pull request.

## Bilingual strategy

Two distinct concerns, deliberately kept apart:

1. **Interface strings** live in `src/i18n` and go through i18next. Short, symmetrical, ordinary.
2. **Pedagogical content** lives in per-locale content modules. Long, asymmetrical, and reviewed as
   prose rather than as translations.

The constraint that shapes both: **the Security+ exam is not offered in French.** It is delivered in
English, Japanese, Portuguese, Spanish and Thai. A learner who revises only French terminology will
meet unfamiliar English wording on exam day, so the app treats French as a comprehension aid rather
than a parallel universe:

- every French technical term is rendered next to its **official English term**;
- quizzes and the mock exam offer an **"English question text only"** toggle, so practice can happen
  in the language of the real exam.

`scripts/validate-content.ts` asserts that `fr` is absent from `EXAM_META.examLanguages`. If CompTIA
ever adds French, that check fails loudly — which is the intended prompt to revisit this section
rather than silently drift.

## Testing strategy

| Layer         | Tool                     | What it proves                                                                      |
| ------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `domain/**`   | Vitest                   | Exact behaviour of the engines. Coverage threshold: 95 % statements, 90 % branches. |
| Components    | Vitest + Testing Library | Rendering and interaction of individual features.                                   |
| Content       | `validate:content`       | Structural integrity of the whole corpus.                                           |
| Flows         | Playwright               | The journeys that matter end to end, against the **production build**.              |
| Accessibility | `@axe-core/playwright`   | No WCAG 2.1 AA violations on the routes users live in.                              |

The Playwright suite runs against `vite preview`, not the dev server, because that is what Vercel
actually serves — including the SPA rewrite that makes deep links work.

Flows that must always be covered:

- take an objective quiz end to end and see per-distractor explanations
- start a mock exam, **reload the page**, and find the timer still correct
- grade flashcards and see the next due date change accordingly
- switch FR ↔ EN and confirm official English terms remain visible
- reload after earning XP and confirm progress survived

## Deployment

Vercel, Vite preset, static output. `vercel.json` supplies the SPA rewrite, long-lived immutable
caching for hashed assets, and a restrictive Content-Security-Policy — the app has no backend and
makes no network calls, so `connect-src 'self'` is a real constraint rather than a formality.

Each pull request gets a preview deployment; `main` deploys to production. There is no server, no
database, and no telemetry.
