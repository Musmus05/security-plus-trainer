import { describe, expect, it } from 'vitest';

import en from './locales/en.json';
import fr from './locales/fr.json';

type Json = Record<string, unknown>;

/** Flatten to dotted leaf paths so the two catalogues can be compared as flat key sets. */
function leafKeys(value: Json, prefix = ''): string[] {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix === '' ? key : `${prefix}.${key}`;
    return typeof child === 'object' && child !== null ? leafKeys(child as Json, path) : [path];
  });
}

/** Every `{{placeholder}}` used in a string. */
function placeholders(value: string): string[] {
  return [...value.matchAll(/\{\{(\w+)\}\}/g)].map((match) => match[1] ?? '').sort();
}

function leafEntries(value: Json, prefix = ''): [string, string][] {
  return Object.entries(value).flatMap(([key, child]): [string, string][] => {
    const path = prefix === '' ? key : `${prefix}.${key}`;
    if (typeof child === 'object' && child !== null) {
      return leafEntries(child as Json, path);
    }
    return [[path, String(child)]];
  });
}

describe('translation catalogues', () => {
  const englishKeys = leafKeys(en).sort();
  const frenchKeys = leafKeys(fr).sort();

  it('cover exactly the same keys', () => {
    // A missing French key silently renders the English string, which looks like a bug the
    // learner cannot report precisely. A stale French key is dead weight nobody notices.
    expect(frenchKeys).toEqual(englishKeys);
  });

  it('use the same interpolation placeholders in both languages', () => {
    // A translation that drops `{{count}}` renders "day" with no number and reads as a glitch.
    const english = new Map(leafEntries(en));
    const french = new Map(leafEntries(fr));

    for (const [key, englishValue] of english) {
      const frenchValue = french.get(key);
      expect(frenchValue, `fr is missing ${key}`).toBeDefined();
      expect(placeholders(frenchValue ?? ''), `placeholders differ for ${key}`).toEqual(
        placeholders(englishValue),
      );
    }
  });

  it('has no empty strings', () => {
    for (const [catalogue, entries] of [
      ['en', leafEntries(en)],
      ['fr', leafEntries(fr)],
    ] as const) {
      for (const [key, value] of entries) {
        expect(value.trim(), `${catalogue}.${key} is empty`).not.toBe('');
      }
    }
  });

  it('keeps French text distinct from English where it should be translated', () => {
    // A handful of strings are identical by design — brand names and the language labels
    // themselves. Everything else being identical usually means a forgotten translation.
    const intentionallyIdentical = new Set([
      'app.name',
      'language.en',
      'language.fr',
      'nav.flashcards',
      'page.flashcards.title',
      'page.quiz.title',
      'topbar.xp',
      // Interpolation plus a unit that is not translated. There is nothing here to translate.
      'dashboard.heatmapCell',
      // Same word in both languages.
      'quiz.kind.discrimination',
      'exam.factQuestions',
      'exam.factMinutes',
      'exam.questionCount_one',
      'exam.questionCount_other',
      'exam.minuteCount_one',
      'exam.minuteCount_other',
      // Placeholders and punctuation only. Every word that differs arrives through interpolation —
      // `exam.goToQuestion` reads "Question 3, answered" against "Question 3, répondue".
      'exam.goToQuestion',
      'exam.historyDetail',
    ]);

    const english = new Map(leafEntries(en));
    const french = new Map(leafEntries(fr));
    const untranslated = [...english.entries()]
      .filter(([key, value]) => !intentionallyIdentical.has(key) && french.get(key) === value)
      .map(([key]) => key);

    expect(untranslated).toEqual([]);
  });

  it('uses typographic apostrophes in French, not the ASCII one', () => {
    /*
     * French uses an apostrophe on roughly every other word, so a mixture of ’ and ' is visible
     * in ordinary prose — it looks like two people wrote the app. Enforcing it here rather than in
     * review because it is exactly the kind of detail that is invisible until it is everywhere.
     */
    const offenders = leafEntries(fr)
      .filter(([, value]) => value.includes("'"))
      .map(([key]) => key);

    expect(offenders).toEqual([]);
  });

  it('gives every pluralised key a complete set of forms', () => {
    /*
     * i18next resolves `t(key, { count })` to `key_one` / `key_other`, not to a bare `key`. A base
     * key without suffixes appears to work — i18next falls back to it — but the fallback is not the
     * plural machinery, so the singular silently renders the plural string. Requiring both suffixes
     * to be present makes that impossible.
     */
    for (const [catalogue, entries] of [
      ['en', leafEntries(en)],
      ['fr', leafEntries(fr)],
    ] as const) {
      const keys = new Set(entries.map(([key]) => key));
      const pluralBases = new Set(
        [...keys]
          .filter((key) => key.endsWith('_one') || key.endsWith('_other'))
          .map((key) => key.replace(/_(one|other)$/, '')),
      );

      for (const base of pluralBases) {
        expect(keys.has(`${base}_one`), `${catalogue}: ${base}_one is missing`).toBe(true);
        expect(keys.has(`${base}_other`), `${catalogue}: ${base}_other is missing`).toBe(true);
        expect(keys.has(base), `${catalogue}: ${base} shadows its own plural forms`).toBe(false);
      }
    }
  });

  it('gives plural forms to every key that interpolates a count', () => {
    /*
     * The stronger half of the rule, and the one that catches the real bug. Checking only that
     * already-suffixed keys are complete says nothing about a key like `lesson.crowns` that uses
     * `{{count}}` with no forms at all — which is how "1 couronnes sur 5" reaches the screen.
     */
    for (const [catalogue, entries] of [
      ['en', leafEntries(en)],
      ['fr', leafEntries(fr)],
    ] as const) {
      const offenders = entries
        .filter(
          ([key, value]) => value.includes('{{count}}') && !/_(one|other|many|few)$/.test(key),
        )
        .map(([key]) => key);

      expect(offenders, `${catalogue} keys using {{count}} without plural forms`).toEqual([]);
    }
  });
});
