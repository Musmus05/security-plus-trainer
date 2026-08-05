# Writing content

This document is the quality bar. `npm run validate:content` enforces the mechanical half of it; the
rest is on the author and the reviewer.

## The rule that overrides everything

Every practice question must be **original**, written from the publicly published exam objectives.

CompTIA's Authorized Materials Use Policy prohibits content taken from unauthorized third-party
sources — "brain dumps" — and using such material can cost a candidate their certification and bar
them from future testing. Do not reproduce, paraphrase, or reconstruct from memory any item from a
real exam. If a question feels like it came from somewhere rather than from the objective, it does
not go in. See [`NOTICE.md`](../NOTICE.md).

Writing an original question that tests the same concept is not harder — it is the job.

## Where things live

```
src/content/exam/sy0-701/
  domains.ts                   the 5 domains and 28 objectives (titles verbatim from CompTIA)
  lessons/1-1.en.mdx           lesson prose, English
  lessons/1-1.fr.mdx           lesson prose, French
  questions/1-1.ts             question bank for objective 1.1
  flashcards/1-1.ts            flashcard deck for objective 1.1
  acronyms.ts                  the official acronym appendix
```

File names use the objective number with a hyphen: objective `4.6` → `4-6`.

## Lessons

**Length:** 900–1500 words. Shorter fails the objective; longer stops being revisable.

**Source of scope:** the sub-bullets under the objective in the official _CompTIA Security+ SY0-701
Certification Exam Objectives, Version 5.0_. Every sub-bullet must be addressed. The objectives
document is the syllabus — not your sense of what matters.

### Structure

```mdx
export const meta = {
  objective: '1.1',
  locale: 'en',
  readingMinutes: 8,
  keyTerms: ['security control', 'compensating control', 'directive control'],
};

## Why this matters

Two or three sentences: where this shows up in real work, and how the exam likes to test it.

## <the first sub-topic>

Explain the concept, then show it. Prefer a table when the exam tests _distinctions_, because
distinctions are what the distractors will exploit.

<ExamTrap>
  The specific confusion the exam engineers rely on. One per trap, stated as the confusion, not as
  advice.
</ExamTrap>

<Mnemonic>Only if a genuinely useful one exists. A forced mnemonic is worse than none.</Mnemonic>

## Putting it together

A short scenario that forces the reader to _choose_ between the concepts just introduced.
```

### Writing rules

- **Distinctions over definitions.** The exam rarely asks "what is a deterrent control"; it asks
  which control a scenario calls for. Write for that.
- **Name the trap.** If two terms are routinely confused, say so explicitly and say _why_.
- **Concrete over abstract.** "A bollard stops a vehicle" beats "physical controls impede
  unauthorised access".
- **No filler.** No "in today's ever-evolving threat landscape". The reader is revising, not
  browsing.
- **Tables earn their place.** Use one when comparing ≥3 items on ≥2 axes; otherwise prose.

### French lessons

A French lesson is a _rewrite_, not a translation — but it carries a hard constraint from
[ADR-0004](./adr/0004-french-as-comprehension-aid.md):

> **The first time a technical term appears, the official English term must appear with it.**

```mdx
Un <Term en="compensating control">contrôle compensatoire</Term> intervient lorsque le contrôle
principal n'est pas applicable…
```

The `<Term>` component renders the French text with the English term visibly attached, and feeds the
glossary. Never introduce a French technical term without it — the learner will sit the exam in
English.

Also: keep the _official English objective title_ untranslated wherever it is displayed as a title.
It is the exam's own index; translating it makes it unfindable.

## Questions

**Volume:** at least 15 per objective. Aim for a spread:

| Kind           | Share | Purpose                                                            |
| -------------- | ----- | ------------------------------------------------------------------ |
| Recall         | ~30 % | Does the term mean what you think it means                         |
| Discrimination | ~40 % | Choose between near-synonyms                                       |
| Scenario       | ~30 % | "Given a scenario…" objectives are tested this way, so practise it |

### Shape

```ts
{
  id: 'q-1-1-007',
  objective: '1.1',
  kind: 'discrimination',
  difficulty: 'medium',
  prompt: {
    en: 'A legacy application cannot support multi-factor authentication. The security team ' +
        'places it behind a jump host with session recording. Which control type best ' +
        'describes the jump host in this arrangement?',
    fr: '…',
  },
  options: [
    {
      id: 'a',
      text: { en: 'Compensating', fr: 'Compensatoire (compensating)' },
      correct: true,
      explanation: {
        en: 'The required control (MFA on the application) cannot be implemented, so an ' +
            'alternative control is put in place to achieve a comparable risk reduction. ' +
            'That is the definition of a compensating control.',
        fr: '…',
      },
    },
    // every remaining option, each with its own explanation
  ],
  references: ['1.1'],
}
```

### Rules

- **Every option gets an explanation — distractors included.** A learner who picked the wrong answer
  needs to know why it was wrong, not merely that it was. `validate:content` rejects a missing
  explanation, and a review should reject a lazy one.
- **Distractors must be plausible.** A distractor nobody would pick teaches nothing. The best ones
  are the true-but-irrelevant and the almost-right.
- **Exactly one correct option** unless the question is explicitly multi-select, in which case say
  so in the prompt.
- **No "all of the above" / "none of the above".** They test test-taking, not security.
- **No trick wording.** The difficulty must come from the concept, never from a misreading.
- **Keep the prompt self-contained.** No dependency on a previous question.
- **Scenario prompts stay under ~70 words.** Longer tests reading stamina.

## Flashcards

**Volume:** ~20 per objective, plus the acronym deck.

One fact per card. If the back has an "and", it is probably two cards.

```ts
{
  id: 'f-1-1-004',
  objective: '1.1',
  front: { en: 'Which control category do security awareness training and policies fall into?',
           fr: '…' },
  back:  { en: 'Managerial (also called administrative) — they direct human behaviour rather ' +
               'than enforcing anything technically.',
           fr: '…' },
  hint: { en: 'Think about who the control acts on.', fr: '…' },
}
```

Cards are scheduled by the SRS engine, so they should be _gradeable in a few seconds_. A card that
takes a minute to answer belongs in the lesson.

## Acronyms

The full appendix from the objectives document — around 345 entries. Each carries the expansion
(English, verbatim), a one-line French gloss, and the objectives where it is examined:

```ts
{ acronym: 'ALE', en: 'Annualized Loss Expectancy',
  fr: 'Perte annuelle attendue — SLE × ARO', objectives: ['5.2'] }
```

The English expansion is not translated: it is what appears on the exam.

## Checklist before opening a content pull request

- [ ] Every sub-bullet of the objective from the official document is covered
- [ ] English lesson **and** French lesson present, both 900–1500 words
- [ ] Every French technical term wrapped in `<Term en="…">`
- [ ] ≥15 questions, spread across recall / discrimination / scenario
- [ ] Every option — correct and incorrect — has a substantive explanation
- [ ] ≥20 flashcards, one fact each
- [ ] All content original; nothing recalled from a real exam
- [ ] `npm run validate:content` passes
- [ ] Read the lesson aloud once. If a sentence is boring, it is also unmemorable.
