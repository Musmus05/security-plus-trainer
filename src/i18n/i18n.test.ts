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
    ]);

    const english = new Map(leafEntries(en));
    const french = new Map(leafEntries(fr));
    const untranslated = [...english.entries()]
      .filter(([key, value]) => !intentionallyIdentical.has(key) && french.get(key) === value)
      .map(([key]) => key);

    expect(untranslated).toEqual([]);
  });
});
