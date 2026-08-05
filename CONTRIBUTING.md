# Contributing

## Workflow

`main` is protected and always deployable. All work happens on a short-lived branch and lands
through a pull request with a **squash merge**, so `main` keeps a linear, readable history.

```bash
git switch main && git pull
git switch -c feat/flashcards-srs
# ... work, commit ...
git push -u origin feat/flashcards-srs
gh pr create --fill
```

### Branch naming

| Prefix      | Use for                                          |
| ----------- | ------------------------------------------------ |
| `feat/`     | A new user-facing capability                     |
| `fix/`      | A bug fix                                        |
| `chore/`    | Tooling, CI, dependencies, housekeeping          |
| `docs/`     | Documentation only                               |
| `content/`  | Lessons, questions, flashcards, glossary entries |
| `refactor/` | Behaviour-preserving restructuring               |
| `test/`     | Tests only                                       |

Use kebab-case after the prefix: `content/domain-2-threats`, not `content/Domain_2`.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), enforced by commitlint in a
`commit-msg` hook. The subject is imperative, lowercase, and has no trailing period.

```
<type>(<scope>): <subject>

[optional body explaining *why*, wrapped at 100 columns]

[optional footer, e.g. Closes #12]
```

**Types:** `feat`, `fix`, `chore`, `docs`, `content`, `refactor`, `test`, `perf`, `style`, `ci`,
`build`, `revert`.

**Scopes:** `quiz`, `exam`, `flashcards`, `glossary`, `dashboard`, `path`, `lesson`, `gamification`,
`srs`, `i18n`, `ui`, `store`, `content-model`, `domain-1` … `domain-5`, `ci`, `deps`, `repo`.

Good:

```
feat(exam): sample 90 questions at official domain weights
content(domain-2): add lessons and questions for objectives 2.1–2.5
fix(srs): keep ease factor above the 1.3 floor after repeated lapses
```

Bad:

```
Updated stuff.
feat: WIP
fix(quiz): Fixed the bug.
```

## Definition of done

A pull request is ready for review when **all** of these hold:

- [ ] `npm run typecheck` passes — no `any`, no `@ts-expect-error` without a comment explaining why
- [ ] `npm run lint` passes, including `jsx-a11y`
- [ ] `npm run validate:content` passes
- [ ] `npm run test` passes; new logic in `src/domain/**` is covered by unit tests
- [ ] `npm run test:e2e` passes if the PR touches a user flow
- [ ] `npm run build` succeeds
- [ ] `CHANGELOG.md` has an entry under `## [Unreleased]`
- [ ] The Vercel preview deployment was opened and the change looks right

CI runs every one of these on the pull request. A red check blocks the merge.

## Architectural rules that reviewers will enforce

1. **`src/domain/**` stays pure.** No React, no `localStorage`, no `Date.now()`, no `Math.random()`.
   Time comes from an injected `Clock`; randomness comes from an injected seeded RNG. This is what
   makes the gamification, SRS, and exam engines deterministically testable.
2. **Content is data, not code.** Lessons are MDX; questions, flashcards, and acronyms are typed
   modules validated by Zod. No pedagogical prose inside components.
3. **Content is lazy-loaded per objective.** Never add a static import that pulls the whole question
   bank into the initial bundle.
4. **Persisted state is versioned.** Any change to the persisted shape ships with a bump of
   `STORE_VERSION` and a migration, plus a test that migrates a fixture of the previous shape.
5. **Both languages, or neither.** A content PR that adds an English lesson without its French
   counterpart fails `validate:content` by design.

## Writing content

See [`docs/content-authoring.md`](./docs/content-authoring.md) for the lesson template, the question
quality checklist, and the rules on French terminology.

One rule overrides all others: **never** submit content derived from recalled or leaked exam
questions. See [`NOTICE.md`](./NOTICE.md).
