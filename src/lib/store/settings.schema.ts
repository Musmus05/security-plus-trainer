import { z } from 'zod';

/**
 * Settings, with a schema because the persisted value is untrusted input.
 *
 * `localStorage` is editable by hand, survives across deployments, and may have been written by an
 * older build. Rehydrating it straight into the store means a single stale or hand-edited field can
 * crash a render. Parsing per field, and falling back to the default for anything invalid, means a
 * corrupt entry costs a preference rather than the session.
 */

export const LOCALES = ['en', 'fr'] as const;
export const localeSchema = z.enum(LOCALES);
export type Locale = z.infer<typeof localeSchema>;

export const THEME_PREFERENCES = ['system', 'light', 'dark'] as const;
export const themePreferenceSchema = z.enum(THEME_PREFERENCES);
export type ThemePreference = z.infer<typeof themePreferenceSchema>;

/**
 * Which language question text is shown in.
 *
 * Separate from the interface language on purpose: the exam is only delivered in English, so a
 * learner reading a French interface still needs to drill English question wording.
 * See docs/adr/0004-french-as-comprehension-aid.md.
 */
export const QUESTION_LANGUAGES = ['interface', 'english'] as const;
export const questionLanguageSchema = z.enum(QUESTION_LANGUAGES);
export type QuestionLanguage = z.infer<typeof questionLanguageSchema>;

/** Daily XP targets offered in settings. Bounded so the streak stays winnable. */
export const DAILY_GOALS = [50, 100, 150, 250] as const;

export const settingsSchema = z.object({
  locale: localeSchema,
  theme: themePreferenceSchema,
  questionLanguage: questionLanguageSchema,
  dailyGoalXp: z.number().int().positive().max(1000),
  /** Off by default: an unexpected noise in a quiet room is a reason to close the tab. */
  soundEnabled: z.boolean(),
  /** Mirrors `prefers-reduced-motion` by default; an explicit choice overrides it. */
  reduceMotion: z.union([z.boolean(), z.literal('system')]),
});

export type Settings = z.infer<typeof settingsSchema>;

export const DEFAULT_SETTINGS: Settings = {
  locale: 'fr',
  theme: 'system',
  questionLanguage: 'interface',
  dailyGoalXp: 150,
  soundEnabled: false,
  reduceMotion: 'system',
};

/**
 * Coerce an unknown persisted value into valid settings, field by field.
 *
 * Deliberately not `settingsSchema.parse`: an all-or-nothing parse throws away every valid
 * preference because one went bad. This keeps what is still good.
 */
export function coerceSettings(value: unknown): Settings {
  if (typeof value !== 'object' || value === null) {
    return { ...DEFAULT_SETTINGS };
  }

  const candidate = value as Record<string, unknown>;
  const result = { ...DEFAULT_SETTINGS };

  for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[]) {
    const fieldSchema = settingsSchema.shape[key];
    const parsed = fieldSchema.safeParse(candidate[key]);
    if (parsed.success) {
      // Each key's schema produces exactly that key's type; the map above guarantees alignment.
      Object.assign(result, { [key]: parsed.data });
    }
  }

  return result;
}
