import type { ComponentType } from 'react';
import type { MDXProps } from 'mdx/types';

import type { Locale } from '@/lib/store/settings.schema';

/**
 * Lessons, loaded per objective and per language on demand.
 *
 * A lesson is 900–1500 words of prose in each language. Shipping 56 of them in the entry chunk for a
 * learner who opens the dashboard would be absurd, so each is its own dynamic `import()`.
 *
 * The map is explicit rather than a template literal in the import, for the same reason as the
 * question banks: a computed specifier makes the bundler emit a chunk for everything matching the
 * pattern and turns a typo into a runtime 404 instead of a type error.
 */
export type LessonComponent = ComponentType<MDXProps>;

type LessonLoader = () => Promise<LessonComponent>;

const LESSONS: Partial<Record<string, Partial<Record<Locale, LessonLoader>>>> = {
  '1.1': {
    fr: async () => (await import('./exam/sy0-701/lessons/1-1.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/1-1.en.mdx')).default,
  },
  '1.2': {
    fr: async () => (await import('./exam/sy0-701/lessons/1-2.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/1-2.en.mdx')).default,
  },
  '1.3': {
    fr: async () => (await import('./exam/sy0-701/lessons/1-3.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/1-3.en.mdx')).default,
  },
  '1.4': {
    fr: async () => (await import('./exam/sy0-701/lessons/1-4.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/1-4.en.mdx')).default,
  },
  '2.1': {
    fr: async () => (await import('./exam/sy0-701/lessons/2-1.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/2-1.en.mdx')).default,
  },
  '2.2': {
    fr: async () => (await import('./exam/sy0-701/lessons/2-2.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/2-2.en.mdx')).default,
  },
  '2.3': {
    fr: async () => (await import('./exam/sy0-701/lessons/2-3.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/2-3.en.mdx')).default,
  },
  '2.4': {
    fr: async () => (await import('./exam/sy0-701/lessons/2-4.fr.mdx')).default,
    en: async () => (await import('./exam/sy0-701/lessons/2-4.en.mdx')).default,
  },
};

export function hasLesson(objectiveId: string, locale: Locale): boolean {
  return LESSONS[objectiveId]?.[locale] !== undefined;
}

/** Objectives with a lesson in at least one language. */
export const OBJECTIVES_WITH_LESSONS: readonly string[] = Object.keys(LESSONS);

/**
 * Load one lesson.
 *
 * Returns null when it has not been written yet, rather than throwing: the corpus is being authored
 * objective by objective, and a learner reaching an unwritten one should see "not written yet" and
 * the official topic list, not an error boundary.
 *
 * Falls back to the other language rather than showing nothing. A learner who can read the English
 * lesson is better served by it than by an empty page — and since the exam is English-only, being
 * nudged into English is not the wrong direction.
 */
export async function loadLesson(
  objectiveId: string,
  locale: Locale,
): Promise<{ Lesson: LessonComponent; locale: Locale } | null> {
  const forObjective = LESSONS[objectiveId];
  if (forObjective === undefined) {
    return null;
  }

  const preferred = forObjective[locale];
  if (preferred !== undefined) {
    return { Lesson: await preferred(), locale };
  }

  const fallbackLocale: Locale = locale === 'fr' ? 'en' : 'fr';
  const fallback = forObjective[fallbackLocale];
  if (fallback !== undefined) {
    return { Lesson: await fallback(), locale: fallbackLocale };
  }

  return null;
}
