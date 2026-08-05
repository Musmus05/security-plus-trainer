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

### Notes

- ESLint is pinned to 9.x and TypeScript to 6.0.x because `eslint-plugin-jsx-a11y` has no
  ESLint 10 release and `typescript-eslint` does not accept TypeScript ≥ 6.1. See
  [ADR-0003](docs/adr/0003-pin-lint-toolchain-versions.md).

[Unreleased]: https://github.com/Musmus05/security-plus-trainer/commits/main
