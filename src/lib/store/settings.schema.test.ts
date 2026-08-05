import { describe, expect, it } from 'vitest';

import { coerceSettings, DEFAULT_SETTINGS, settingsSchema } from './settings.schema';

describe('coerceSettings', () => {
  it('accepts a fully valid object unchanged', () => {
    const valid = {
      locale: 'en',
      theme: 'dark',
      questionLanguage: 'english',
      dailyGoalXp: 100,
      soundEnabled: true,
      reduceMotion: true,
    };

    expect(coerceSettings(valid)).toEqual(valid);
  });

  it('falls back to defaults for a non-object', () => {
    for (const value of [null, undefined, 42, 'settings', [], true]) {
      expect(coerceSettings(value)).toEqual(DEFAULT_SETTINGS);
    }
  });

  it('keeps the valid fields and defaults only the broken ones', () => {
    // The point of coercing per field rather than parsing the whole object: one hand-edited value
    // should cost that preference, not every preference.
    const partlyCorrupt = {
      locale: 'en',
      theme: 'chartreuse',
      questionLanguage: 'english',
      dailyGoalXp: -5,
      soundEnabled: 'yes',
      reduceMotion: 'system',
    };

    expect(coerceSettings(partlyCorrupt)).toEqual({
      locale: 'en',
      theme: DEFAULT_SETTINGS.theme,
      questionLanguage: 'english',
      dailyGoalXp: DEFAULT_SETTINGS.dailyGoalXp,
      soundEnabled: DEFAULT_SETTINGS.soundEnabled,
      reduceMotion: 'system',
    });
  });

  it('supplies defaults for missing fields, as an older build would have written', () => {
    expect(coerceSettings({ locale: 'en' })).toEqual({ ...DEFAULT_SETTINGS, locale: 'en' });
  });

  it('ignores unknown fields left behind by a previous shape', () => {
    const result = coerceSettings({ locale: 'fr', legacyFontSize: 'large' });

    expect(result).toEqual({ ...DEFAULT_SETTINGS, locale: 'fr' });
    expect(result).not.toHaveProperty('legacyFontSize');
  });

  it('rejects a daily goal that would make the streak unwinnable', () => {
    expect(coerceSettings({ dailyGoalXp: 100_000 }).dailyGoalXp).toBe(DEFAULT_SETTINGS.dailyGoalXp);
    expect(coerceSettings({ dailyGoalXp: 0 }).dailyGoalXp).toBe(DEFAULT_SETTINGS.dailyGoalXp);
  });
});

describe('DEFAULT_SETTINGS', () => {
  it('is itself valid against the schema', () => {
    expect(settingsSchema.safeParse(DEFAULT_SETTINGS).success).toBe(true);
  });

  it('starts in French, since that is the language the learner asked for', () => {
    expect(DEFAULT_SETTINGS.locale).toBe('fr');
  });

  it('leaves sound off and follows the system for theme and motion', () => {
    expect(DEFAULT_SETTINGS.soundEnabled).toBe(false);
    expect(DEFAULT_SETTINGS.theme).toBe('system');
    expect(DEFAULT_SETTINGS.reduceMotion).toBe('system');
  });
});
