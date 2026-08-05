# 2. Build a client-side SPA on Vite + React, not an SSG framework

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

The app is content-heavy, which normally argues for a static-site generator (Astro, Next.js) that
ships HTML and hydrates islands. But the actual product is closer to an application than to a
document collection:

- Progress, XP, streaks, mastery and SRS scheduling are shared across nearly every screen.
- The mock exam is a long-lived stateful session that must survive a page reload.
- The repository is **private** and the site is for a single learner, so SEO and first-paint-on-
  cold-cache — the strengths of SSG — are worth very little here.
- There is no backend and no data fetching. Every byte is static; the only "server" is Vercel's CDN.

## Decision

A client-side single-page application: Vite 8 + React 19 + TypeScript, React Router for routing,
Zustand for persisted state, deployed as static files to Vercel with an SPA rewrite.

Content is not bundled eagerly. Each objective's lesson, question bank and flashcard deck is reached
through a dynamic `import()`, so the code-splitting benefit an SSG would have provided is recovered
without adopting its build model.

## Alternatives considered

| Option                      | Why not                                                                                                                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Astro + React islands**   | Best-in-class for the lesson pages, but the cross-cutting progress/XP/SRS state would have to be threaded through islands or duplicated. The complexity lands exactly where the product is most stateful. |
| **Next.js (static export)** | Brings routing and i18n conventions, but also a framework's worth of concepts for an app with no server, no data fetching and no SEO requirement.                                                         |
| **Plain HTML/CSS/JS**       | Maximum portability, but 56 bilingual lesson files plus a question bank with machine-checked invariants is precisely the workload that needs a type system and a build step.                              |

## Consequences

- First paint requires JavaScript. Acceptable: this is a study tool, not a public document.
- Routing must be handled by a rewrite at the edge — configured in `vercel.json`, and covered by an
  e2e test that deep-links into the app and asserts a 200 rather than a 404.
- Keeping the initial bundle small becomes an ongoing discipline rather than a property of the
  framework, so `chunkSizeWarningLimit` is set low on purpose in `vite.config.ts`.
