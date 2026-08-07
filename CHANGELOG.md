# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Repository hygiene: README (EN/FR), NOTICE covering CompTIA trademarks and the no-brain-dump
  rule, license, editor and git configuration.
- Toolchain: Vite 8 + React 19 + TypeScript 6 (strict, with `noUncheckedIndexedAccess` and
  `exactOptionalPropertyTypes`), Tailwind 4, ESLint 9 with type-aware and `jsx-a11y` rules,
  Prettier, Husky + commitlint, Vitest, Playwright with an axe accessibility pass.
- `npm run validate:content`: the content integrity gate, with a Zod schema for the exam metadata
  and unit tests proving each invariant rejects bad data.
- GitHub Actions CI running typecheck, lint, format check, content validation, unit tests with
  coverage thresholds, production build, and end-to-end tests against the built output.
- Vercel configuration: SPA rewrite, immutable asset caching, and a restrictive
  Content-Security-Policy (the app makes no network calls, so `connect-src 'self'` is real).
- Documentation: `docs/architecture.md`, `docs/content-authoring.md`, and ADRs 0001–0005.
- Design system: light/dark design tokens, and the `Button`, `Card`, `Badge`, `ProgressBar`,
  `ProgressRing` and `StatTile` primitives.
- Accessibility gates: a unit test that computes WCAG contrast for every text token against the
  background it actually renders on, and axe passes in Playwright over every route in both themes,
  plus tests proving the theme stamp beats the OS preference both ways.
- Application shell: routed layout with lazily loaded pages, bottom navigation on phones and a side
  rail on wide screens, a skip link, and a settings screen.
- Bilingual interface through i18next, with a test asserting the French and English catalogues share
  exactly the same keys and interpolation placeholders.
- Persisted store (Zustand) holding settings, versioned with a migration runner. The persisted blob
  is re-validated field by field on rehydrate, so a hand-edited or half-written value costs one
  preference rather than the session.
- `Clock` and `Rng` ports with a fixed clock and a seeded generator, so the streak, spaced-repetition
  and exam-sampling logic that lands next is deterministically testable.
- Calendar-day arithmetic for streaks, which counts local days rather than subtracting milliseconds —
  the latter is wrong twice a year in any timezone with daylight saving.
- Graceful storage resolution: the app falls back to in-memory storage when `localStorage` is absent,
  throws on access (Safari private browsing) or rejects writes (over quota), losing persistence
  rather than the screen.

- The SY0-701 exam outline: 5 domains and 28 objectives, with English titles quoted verbatim from
  the official objectives document, French working translations, and each objective’s 176 official
  sub-topics. Every English string was cross-checked verbatim against the source document.
- Zod schemas for the whole content model — objectives, domains, questions, flashcards, acronyms —
  with the content gate extended to validate the outline and cross-check it against the exam
  metadata.
- A browsable learning path and objective pages showing each objective’s official scope, with the
  English title kept visible beneath the French one.

- Gamification engine as pure, injected-clock logic: an XP economy, an invertible level curve with
  security-career rank titles, goal-based daily streaks with freezes, and mastery crowns per
  objective. `src/domain/**` sits at 99.2% statement coverage.

- A working dashboard: real streak, XP, level and rank, a daily-goal bar, per-domain mastery rings,
  a 26-week activity heatmap scaled to the learner’s own goal, and a “continue” suggestion that
  prioritises the heaviest exam domain.
- Objectives can be marked read, which awards XP once and raises a mastery crown.
- The persisted store now holds gamification state and per-objective progress, at `STORE_VERSION` 2
  with a migration and a test that a version 1 blob keeps its settings.

- Objective quizzes: a pure session engine with seeded shuffling of both question and option
  order, per-option explanations shown for every answer rather than only the chosen one, a
  retry-the-misses pass, and a question-language toggle independent of the interface language.
- The first reference question bank: 15 original questions for objective 1.1, with the content gate
  extended to validate banks (schema, unique ids, id/objective agreement, a minimum of 15 questions,
  and a minimum explanation length on every option).

- Real lesson content: the MDX pipeline, with `Term`, `ExamTrap`, `Mnemonic`, `KeyPoint` and
  `InPractice` callouts, and a full bilingual lesson for objective 1.1.
- A visual pass on the learning path: a winding node trail with per-domain accent strips, crown pips,
  and a marker on the objective the dashboard is pointing at.

- **The complete SY0-701 corpus: all 28 objectives.** 56 bilingual lessons totalling around
  71 000 words, and 420 original questions — 15 per objective, four options each, every option
  carrying an explanation in both languages.
- The official acronym appendix extracted as source data (320 entries) with its extraction script.

- The acronym glossary: all 320 official entries, searchable by acronym, English expansion or
  French gloss, with relevance ranking and a diacritic-insensitive fold so “integrite” finds
  “intégrité”. The English expansion stays primary in both interface languages.
- French glosses for the whole appendix, in a file of their own so re-running the extraction
  cannot discard them. The content gate compares the two key sets in both directions, which is
  what makes the join's fallback unreachable rather than merely unlikely.
- Objective links on a glossary entry are **derived** from the official outline rather than
  stored, so the glossary cannot claim a link the syllabus does not make.

- Spaced repetition: a pure SM-2 scheduler with an injected calendar day, a review runner, and a
  320-card acronym deck derived from the glossary rather than authored a second time. XP is paid
  for the review whatever the grade.
- The persisted store now holds the review schedule, at `STORE_VERSION` 3 with a migration and a
  test that a version 2 blob keeps its XP, streak and progress.
- A due-cards prompt on the dashboard, above the next objective — cards fall due whether or not
  the learner opens the app, so a review backlog compounds while new material does not.
- The content gate now reads the application's own question registry instead of keeping a third
  hand-maintained list, and checks lesson registration in both directions. Objectives 3.2 and 3.3
  had been written, reviewed and committed while the app reported them as unwritten, because
  registration lives in more than one place and nothing checked that the places agreed.

### Notes

- ESLint is pinned to 9.x and TypeScript to 6.0.x because `eslint-plugin-jsx-a11y` has no
  ESLint 10 release and `typescript-eslint` does not accept TypeScript ≥ 6.1. See
  [ADR-0003](docs/adr/0003-pin-lint-toolchain-versions.md).
- Domain colours are wayfinding accents, not a data encoding: no five-hue palette keeps every
  pair distinguishable with all five on screen, so progress uses a single sequential ramp and
  every domain mark carries its number. See
  [ADR-0006](docs/adr/0006-domain-colour-and-chart-encoding.md).

[Unreleased]: https://github.com/Musmus05/security-plus-trainer/commits/main
