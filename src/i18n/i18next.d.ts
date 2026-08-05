import type en from './locales/en.json';

/**
 * Types the translation catalogue so `t('nav.dashbaord')` is a compile error rather than a string
 * that renders as itself. English is the reference catalogue; `i18n.test.ts` asserts French has
 * exactly the same key set.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
    returnNull: false;
  }
}
