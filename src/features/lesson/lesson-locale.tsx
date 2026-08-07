import { createContext, use } from 'react';

import type { Locale } from '@/lib/store/settings.schema';

/**
 * The language the lesson on screen is actually written in.
 *
 * Not the interface language, and the difference is the whole reason this exists. Callout labels
 * such as "Exam trap" are part of the lesson's prose, so they have to be in the lesson's language —
 * otherwise an English lesson is interrupted by a French heading, which is exactly the bug this was
 * written to fix.
 *
 * The two can also diverge legitimately: `loadLesson` falls back to the other language when the
 * requested one is missing, and `LessonBody` already labels that case. A callout reading the
 * interface language would then contradict the badge directly above it.
 */
export const LessonLocaleContext = createContext<Locale>('fr');

export function useLessonLocale(): Locale {
  return use(LessonLocaleContext);
}
