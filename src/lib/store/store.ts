import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { resolveStorage } from '@/lib/storage';

import { runMigrations, STORE_VERSION } from './migrations';
import {
  coerceSettings,
  DEFAULT_SETTINGS,
  type Locale,
  type QuestionLanguage,
  type Settings,
  type ThemePreference,
} from './settings.schema';

export const STORAGE_KEY = 'security-plus-trainer';

export interface AppState {
  settings: Settings;

  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemePreference) => void;
  setQuestionLanguage: (questionLanguage: QuestionLanguage) => void;
  setDailyGoalXp: (dailyGoalXp: number) => void;
  setSoundEnabled: (soundEnabled: boolean) => void;
  setReduceMotion: (reduceMotion: Settings['reduceMotion']) => void;

  /** Replace everything with the defaults. Backs the "reset my data" action in settings. */
  resetAll: () => void;
}

/**
 * The single persisted store.
 *
 * Progress, gamification, spaced repetition and exam attempts join `settings` here in later pull
 * requests. Reducers stay in `src/domain` — this file owns persistence and nothing else, which is
 * what lets the interesting logic be unit-tested without a browser.
 */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: { ...DEFAULT_SETTINGS },

      setLocale: (locale) => set((state) => ({ settings: { ...state.settings, locale } })),
      setTheme: (theme) => set((state) => ({ settings: { ...state.settings, theme } })),
      setQuestionLanguage: (questionLanguage) =>
        set((state) => ({ settings: { ...state.settings, questionLanguage } })),
      setDailyGoalXp: (dailyGoalXp) =>
        set((state) => ({ settings: { ...state.settings, dailyGoalXp } })),
      setSoundEnabled: (soundEnabled) =>
        set((state) => ({ settings: { ...state.settings, soundEnabled } })),
      setReduceMotion: (reduceMotion) =>
        set((state) => ({ settings: { ...state.settings, reduceMotion } })),

      resetAll: () => set({ settings: { ...DEFAULT_SETTINGS } }),
    }),
    {
      name: STORAGE_KEY,
      version: STORE_VERSION,
      storage: createJSONStorage(() => resolveStorage()),

      // Only persist data, never the action functions.
      partialize: (state) => ({ settings: state.settings }),

      migrate: (persisted, version) => {
        const outcome = runMigrations(persisted, version);
        if (outcome.discarded) {
          // Returning the defaults rather than throwing: a learner who opens the app after an
          // incompatible change should find a working app, not a blank screen.
          return { settings: { ...DEFAULT_SETTINGS } };
        }
        return outcome.state;
      },

      /**
       * Re-validate on the way in. The persisted blob is untrusted: hand-edited, written by an
       * older build, or truncated by a browser evicting storage mid-write.
       */
      merge: (persisted, current) => ({
        ...current,
        settings: coerceSettings((persisted as { settings?: unknown } | undefined)?.settings),
      }),
    },
  ),
);
