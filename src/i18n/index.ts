import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { type Locale, LOCALES } from '@/lib/store/settings.schema';

import en from './locales/en.json';
import fr from './locales/fr.json';

export const DEFAULT_LOCALE: Locale = 'fr';

/**
 * Interface strings only.
 *
 * Pedagogical content — lessons, questions, flashcards, acronyms — deliberately does not live
 * here. Interface strings are short, symmetrical, and reviewed as translations; lesson prose is
 * long, asymmetrical, and reviewed by reading it. Mixing them would make the French lessons
 * hostage to a JSON structure designed for button labels.
 * See docs/adr/0005-mdx-lessons-typed-structured-content.md.
 */
export const resources = {
  en: { translation: en },
  fr: { translation: fr },
} as const;

export async function initI18n(locale: Locale = DEFAULT_LOCALE): Promise<void> {
  if (i18next.isInitialized) {
    await i18next.changeLanguage(locale);
    return;
  }

  await i18next.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en',
    supportedLngs: LOCALES,
    // Nested keys use dots; a literal dot in a key would be ambiguous, and there are none.
    keySeparator: '.',
    nsSeparator: false,
    interpolation: {
      // React escapes for us; letting i18next escape too double-encodes apostrophes, which
      // French has rather a lot of.
      escapeValue: false,
    },
    returnNull: false,
  });
}

export { i18next };
