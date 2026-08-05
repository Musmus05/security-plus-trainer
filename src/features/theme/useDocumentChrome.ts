import { useEffect } from 'react';

import { useAppStore } from '@/lib/store/store';

/**
 * Reflects the persisted settings onto the `<html>` element.
 *
 * Three things live outside React's tree and have to be pushed there explicitly:
 *
 * - `data-theme`, which the token layer reads. It is **removed** rather than set to "system" when
 *   the learner has no preference, so the `prefers-color-scheme` media query takes over. Setting
 *   it to a literal value would pin the theme and make "match my system" a lie.
 * - `lang`, which screen readers use to pick a pronunciation dictionary. A French sentence read
 *   with English phonetics is close to unintelligible.
 * - `data-reduce-motion`, for the case where the learner wants stillness without changing an OS
 *   setting. The CSS honours `prefers-reduced-motion` on its own; this covers the explicit choice.
 */
export function useDocumentChrome(): void {
  const { theme, locale, reduceMotion } = useAppStore((state) => state.settings);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      delete root.dataset['theme'];
    } else {
      root.dataset['theme'] = theme;
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;

    if (reduceMotion === 'system') {
      delete root.dataset['reduceMotion'];
    } else {
      root.dataset['reduceMotion'] = String(reduceMotion);
    }
  }, [reduceMotion]);
}
