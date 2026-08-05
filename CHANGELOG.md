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

### Notes

- ESLint is pinned to 9.x and TypeScript to 6.0.x because `eslint-plugin-jsx-a11y` has no
  ESLint 10 release and `typescript-eslint` does not accept TypeScript ≥ 6.1. See
  [ADR-0003](docs/adr/0003-pin-lint-toolchain-versions.md).
- Domain colours are wayfinding accents, not a data encoding: no five-hue palette keeps every
  pair distinguishable with all five on screen, so progress uses a single sequential ramp and
  every domain mark carries its number. See
  [ADR-0006](docs/adr/0006-domain-colour-and-chart-encoding.md).

[Unreleased]: https://github.com/Musmus05/security-plus-trainer/commits/main
