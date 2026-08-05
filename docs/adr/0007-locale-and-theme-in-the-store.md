# 7. Locale and theme live in the persisted store, not in the URL

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

The conventional way to do i18n on the web is a path prefix: `/en/glossary`, `/fr/glossary`. It
makes the language shareable, indexable, and cacheable per locale, and it is what Next.js and Astro
push you towards.

None of those three benefits apply here:

- **Shareable** — the repository is private and the deployment is for one learner. There is nobody
  to send `/fr/objective/4.6` to.
- **Indexable** — nothing is indexed. There is no SEO surface.
- **Cacheable per locale** — the app is a single static bundle with both catalogues inlined; there
  is no per-locale response to cache.

The costs are real, though. A locale segment doubles the route table, puts a locale parameter in
front of every `<Link>`, and creates a class of bug where the URL and the persisted preference
disagree — at which point one of them has to win, and whichever you choose is wrong half the time.

## Decision

Interface language and theme are **settings**, stored in the persisted Zustand store, applied to
`<html lang>` and `<html data-theme>` by an effect. Routes carry no locale segment.

The same reasoning covers theme, with one addition: `data-theme` is **removed**, not set to a
literal, when the preference is "system". Writing `data-theme="system"` would pin the theme and make
the "match my system" option silently untrue at sunset.

## Consequences

- The route table stays flat, and `<Link to="/glossary">` needs no locale awareness.
- Language does not survive being copied into another browser. Acceptable: neither does progress —
  the app has no backend by design, and settings travel with the JSON export.
- Deep links are language-agnostic, so `/objective/4.6` opens in whatever language the learner last
  chose. That is the desired behaviour for a personal study tool.
- If this ever becomes a shared or public site, this ADR should be superseded rather than edited:
  the path-prefix approach becomes correct the moment a second person needs a link.

## Note on what is _not_ a setting

The **question language** is a separate preference from the interface language, because the exam is
delivered only in English (see [ADR-0004](./0004-french-as-comprehension-aid.md)). A learner reading
French lessons still needs to drill English question wording. Collapsing the two into one "language"
switch would remove the only control that makes the French content safe to rely on.
