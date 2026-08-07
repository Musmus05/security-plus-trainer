# Authoring brief for a delegated agent

This is the prompt given to an external coding agent (Codex CLI) when it authors one SY0-701
objective. It is checked in because the constraints below are the ones the content gate and review
enforce, and a brief that drifts from them produces work that has to be thrown away.

Substitute `{{OBJECTIVE}}` (e.g. `3.1`) and `{{SLUG}}` (e.g. `3-1`) before use.

---

You are authoring study content for a CompTIA Security+ SY0-701 trainer. Work only inside this
repository. Create exactly three files and modify nothing else:

- `src/content/exam/sy0-701/lessons/{{SLUG}}.fr.mdx`
- `src/content/exam/sy0-701/lessons/{{SLUG}}.en.mdx`
- `src/content/exam/sy0-701/questions/{{SLUG}}.ts`

Do not touch `lesson-bank.ts`, `question-bank.ts` or `scripts/validate-content.ts`. Registration is
handled separately.

## Absolute rule: originality

Every question must be **original**, written from the published exam objective. Never reproduce,
paraphrase, or attempt to reconstruct a real exam item from memory. Reproducing exam content is a
certification-revoking offence for the learner and is prohibited here. See `NOTICE.md`.

## Read these first

- `src/content/exam/sy0-701/domains.ts` — the official outline. Find objective `{{OBJECTIVE}}` and
  cover **every** topic listed under it. The topic strings are verbatim from the official PDF.
- `src/content/exam/sy0-701/lessons/1-3.fr.mdx` and `1-3.en.mdx` — the reference lessons. Match
  their structure, density and voice.
- `src/content/exam/sy0-701/questions/1-3.ts` — the reference question bank. Match its shape
  exactly.

## Lesson requirements

Both languages, same structure, neither a translation artefact of the other.

- **At least 750 words each.** The gate floor is 700; leave margin, because the count is taken after
  formatting.
- Start with `## Pourquoi cet objectif compte` / `## Why this objective matters`, saying what the
  exam actually tests here rather than restating the title.
- End with `## Se tester` / `## Test yourself`: three questions, then a `<KeyPoint>` holding the
  three answers.
- Prefer comparison tables to continuous prose wherever the exam distinguishes neighbouring terms.
  That is where the marks are.
- Available components, used as JSX, no import needed: `<KeyPoint>`, `<ExamTrap>`, `<Mnemonic>`,
  `<InPractice>`, `<Term en="Official English">French</Term>`.
- **French lessons only:** every technical term on first use must be wrapped in
  `<Term en="Official English wording">terme français</Term>`. The exam is English-only, so a
  learner revising in French has to recognise the English on the day.
- **French lessons only:** use typographic apostrophes `’` throughout. An ASCII `'` anywhere in
  French prose fails the gate.
- English lessons take no `<Term>` wrappers — the term is already in English.
- Do not invent facts. If the official topic list names something you are unsure of, describe it at
  the level the objective states and no further.

## Question bank requirements

Exactly **15** questions, exported as `export const QUESTIONS_{{SLUG_UNDERSCORE}}: Question[]`.

- Ids `q-{{SLUG}}-001` … `q-{{SLUG}}-015`, and `objective: '{{OBJECTIVE}}'` on every one.
- `kind` is `'recall' | 'discrimination' | 'scenario'`; aim for roughly 30 / 40 / 30.
- `difficulty` is `'easy' | 'medium' | 'hard'`.
- Four options each, ids `a`–`d`. Exactly one `correct: true`, unless you set `multiSelect: true` on
  the question, in which case two are correct. Include one or two multi-select questions.
- **Every option** — correct and incorrect alike — carries an `explanation` in both `en` and `fr` of
  at least 40 characters. Explain _why the distractor is wrong_, specifically. "This is incorrect"
  fails review.
- Distractors must be **plausible neighbours**, not obviously wrong. The best distractor is a real
  concept that solves an adjacent problem. Never use "all of the above" or "none of the above".
- French text uses typographic apostrophes.

## Before you finish

Run these and fix anything they report:

```
npm run typecheck
npm run lint
npm run validate:content
```

Then report, in three lines: the word count of each lesson, the number of questions, and anything
about the objective you were unsure of. Do not commit.
