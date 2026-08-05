# Security+ Trainer

> Bilingual (EN / FR) gamified study app for the **CompTIA Security+ SY0-701** certification.
> Application d'entraînement bilingue et gamifiée pour la certification **CompTIA Security+
> SY0-701**.

[![CI](https://github.com/Musmus05/security-plus-trainer/actions/workflows/ci.yml/badge.svg)](https://github.com/Musmus05/security-plus-trainer/actions/workflows/ci.yml)

---

## English

A client-side study application covering all 5 domains and 28 objectives of the CompTIA Security+
SY0-701 exam. No backend, no account: your progress lives in your browser and can be exported to
JSON at any time.

### Features

| Feature               | What it does                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Learning path**     | 5 domains → 28 objective nodes, progressive unlock, mastery crowns                                                     |
| **Lessons**           | Long-form notes per objective, in English and French                                                                   |
| **Objective quizzes** | Immediate feedback with an explanation for the correct answer _and every distractor_                                   |
| **Mock exam**         | 90 questions sampled at the official domain weights, 90-minute timer that survives a page reload, per-domain breakdown |
| **Flashcards**        | Spaced repetition (SM-2 derived), due-card counters, one deck per objective plus an acronym deck                       |
| **Acronym glossary**  | The full official acronym appendix, searchable, bilingual, cross-linked to objectives                                  |
| **Gamification**      | XP, levels, daily streaks, badges, activity heatmap                                                                    |

### Exam facts

Sourced from the official _CompTIA Security+ SY0-701 Certification Exam Objectives, Version 5.0_.

|                        |                                                                |
| ---------------------- | -------------------------------------------------------------- |
| Exam code              | SY0-701 (launched 2023-11-07)                                  |
| Questions              | Maximum of 90 — multiple-choice and performance-based          |
| Duration               | 90 minutes                                                     |
| Passing score          | 750 on a 100–900 scale                                         |
| Domain weights         | 1.0 → 12 % · 2.0 → 22 % · 3.0 → 18 % · 4.0 → 28 % · 5.0 → 20 % |
| Certification validity | 3 years (50 CEUs to renew)                                     |

### A note on the French content

**The Security+ exam is not offered in French.** It is available in English, Japanese, Portuguese,
Spanish and Thai. The French content in this app is a _comprehension aid_ — it is not a substitute
for mastering the English terminology you will actually meet on exam day.

Because of that, the app deliberately:

- keeps the **official English term visible next to every French translation**;
- offers an **"English question text only"** toggle in quizzes and the mock exam, so you can train
  in the language of the real exam.

### Getting started

```bash
npm install
npm run dev
```

Requires Node.js ≥ 22.12 (see `.nvmrc`).

| Script                     | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `npm run dev`              | Start the dev server                      |
| `npm run build`            | Production build                          |
| `npm run preview`          | Serve the production build locally        |
| `npm run typecheck`        | `tsc --noEmit`, strict                    |
| `npm run lint`             | ESLint, type-aware, with jsx-a11y         |
| `npm run format`           | Prettier write                            |
| `npm run validate:content` | Check every content invariant (see below) |
| `npm run test`             | Vitest unit + component tests             |
| `npm run test:e2e`         | Playwright end-to-end tests               |

### Content integrity

All practice questions in this repository are **original**, written from the publicly published exam
objectives.

CompTIA's _Authorized Materials Use Policy_ prohibits the use of unauthorized third-party content —
so-called "brain dumps" — and candidates who use such material can have their certification revoked
and be barred from future testing. No real exam question is reproduced here, and none ever will be.
See [`NOTICE.md`](./NOTICE.md).

`npm run validate:content` enforces the structural half of that quality bar: EN/FR parity, unique
identifiers, valid objective references, and an explanation attached to every answer option.

### Documentation

- [`docs/architecture.md`](./docs/architecture.md) — how the code is organised and why
- [`docs/content-authoring.md`](./docs/content-authoring.md) — how to write a lesson, a question, a
  flashcard
- [`docs/adr/`](./docs/adr/) — architecture decision records
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — branch naming, commit conventions, PR flow

---

## Français

Une application d'étude entièrement côté client couvrant les 5 domaines et 28 objectifs de l'examen
CompTIA Security+ SY0-701. Pas de serveur, pas de compte : ta progression reste dans ton navigateur
et peut être exportée en JSON à tout moment.

### Fonctionnalités

| Fonctionnalité        | Rôle                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Parcours**          | 5 domaines → 28 nœuds d'objectifs, déverrouillage progressif, couronnes de maîtrise                                   |
| **Leçons**            | Fiches détaillées par objectif, en anglais et en français                                                             |
| **Quiz par objectif** | Correction immédiate avec explication de la bonne réponse _et de chaque distracteur_                                  |
| **Examen blanc**      | 90 questions tirées selon les poids officiels, chronomètre de 90 min qui survit à un rechargement, détail par domaine |
| **Flashcards**        | Répétition espacée (dérivée de SM-2), compteur de cartes dues, un deck par objectif plus un deck d'acronymes          |
| **Glossaire**         | L'annexe officielle complète des acronymes, avec recherche, bilingue, reliée aux objectifs                            |
| **Gamification**      | XP, niveaux, séries quotidiennes, badges, carte d'activité                                                            |

### Le français, et pourquoi il ne suffit pas

**L'examen Security+ n'existe pas en français.** Il est proposé en anglais, japonais, portugais,
espagnol et thaï. Le contenu français de cette application est une _aide à la compréhension_ : il ne
remplace pas la maîtrise du vocabulaire anglais que tu rencontreras le jour de l'épreuve.

C'est pourquoi l'application, volontairement :

- garde le **terme officiel anglais affiché à côté de chaque traduction française** ;
- propose une bascule **« énoncé en anglais uniquement »** dans les quiz et l'examen blanc, pour
  t'entraîner dans la langue réelle de l'examen.

### Démarrer

```bash
npm install
npm run dev
```

Node.js ≥ 22.12 requis (voir `.nvmrc`). La liste des scripts est identique à la section anglaise
ci-dessus.

### Intégrité du contenu

Toutes les questions d'entraînement de ce dépôt sont **originales**, rédigées à partir des objectifs
d'examen publiés publiquement. La politique CompTIA d'utilisation des supports autorisés interdit
les « brain dumps » — reproduire de vraies questions d'examen expose à la révocation de la
certification. Aucune question réelle n'est reproduite ici. Voir [`NOTICE.md`](./NOTICE.md).

---

## License

All rights reserved. This is a private study project — see [`LICENSE`](./LICENSE).

_CompTIA®, Security+® and SY0-701 are trademarks of CompTIA, Inc. This project is not affiliated
with, endorsed by, or sponsored by CompTIA._
