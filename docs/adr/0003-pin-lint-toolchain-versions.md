# 3. Pin the lint toolchain to versions its plugins actually support

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

Taking the `latest` tag for every dev dependency looks like diligence. Here it breaks the two things
the strict setup exists to provide.

**TypeScript.** `typescript@7.0.2` is `latest`; `typescript@6.0.3` is the newest 6.x. But
`typescript-eslint@8.66.0` — the only route to type-aware linting — declares:

```json
"peerDependencies": {
  "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
  "typescript": ">=4.8.4 <6.1.0"
}
```

TypeScript 7 therefore disables every type-aware rule. That is not cosmetic:
`switch-exhaustiveness-check`, `no-unnecessary-condition` and the rest of `strictTypeChecked` are
load-bearing for the exam-scoring and SRS logic, where a missed case is a wrong score rather than a
style nit.

**ESLint.** `eslint@10.8.0` is `latest`, and `eslint-plugin-react-hooks`,
`eslint-plugin-react-refresh`, `eslint-config-prettier` and `typescript-eslint` all support it.
`eslint-plugin-jsx-a11y@6.10.2` — the latest release, with no ESLint 10 build published — does not:

```json
"peerDependencies": { "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9" }
```

`npm install` fails with `ERESOLVE`. The tempting fix, `--legacy-peer-deps` or `--force`, papers
over a genuine incompatibility and produces an install nobody can reproduce.

## Decision

Pin both to the newest version their ecosystem actually supports, and record why:

- `typescript`: `~6.0.3`
- `eslint`: `9.39.5`, with `@eslint/js` matched at `9.39.5`

No `--legacy-peer-deps`, no `--force`, no `overrides`. `npm ci` resolves cleanly from a lockfile
that reflects reality.

Dependabot is told to hold both back so it does not reopen the problem weekly:

```yaml
ignore:
  - dependency-name: typescript
    versions: ['>=6.1.0']
  - dependency-name: eslint
    versions: ['>=10.0.0']
  - dependency-name: '@eslint/js'
    versions: ['>=10.0.0']
```

## Rejected alternative: drop `jsx-a11y` and move to ESLint 10

Accessibility linting catches a real class of defect in this app — a quiz whose options are `div`s
with click handlers is unusable with a keyboard, and no unit test would notice. Trading a
correctness tool for a version number is the wrong direction. Playwright's axe pass covers rendered
pages, but only for routes a test visits; the lint rule covers every component as it is written.

## Consequences

- Type-aware linting and `jsx-a11y` both keep working; CI can enforce the strict rule set.
- The project forgoes TypeScript 7 and ESLint 10 improvements for now.
- Two upgrade triggers to watch: typescript-eslint widening its `typescript` peer range, and
  `jsx-a11y` publishing an ESLint 10 release. Either one makes this ADR partly obsolete — it should
  then be superseded by a new record rather than edited.
