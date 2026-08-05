import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  addToLedger,
  award,
  examXp,
  pruneLedger,
  quizXp,
  recordDay,
  type StreakOutcome,
  totalOf,
  type XpAward,
  xpOn,
} from '@/domain/gamification';
import type { Clock } from '@/domain/ports';
import { createSystemClock } from '@/lib/clock';
import { resolveStorage } from '@/lib/storage';

import { runMigrations, STORE_VERSION } from './migrations';
import {
  coerceGamification,
  coerceProgress,
  type GamificationState,
  INITIAL_GAMIFICATION,
  NO_RECORD,
  type ProgressMap,
} from './progress.schema';
import {
  coerceSettings,
  DEFAULT_SETTINGS,
  type Locale,
  type QuestionLanguage,
  type Settings,
  type ThemePreference,
} from './settings.schema';

export const STORAGE_KEY = 'security-plus-trainer';

/**
 * The clock the store reads days from.
 *
 * Held here rather than passed into every action from a component: the store is the impure adapter
 * layer, so this is where the real world belongs. Tests swap it, which is what keeps the streak and
 * ledger behaviour deterministic without mocking globals.
 */
let clock: Clock = createSystemClock();

export function setClockForTests(replacement: Clock): void {
  clock = replacement;
}

export interface AppState {
  settings: Settings;
  gamification: GamificationState;
  progress: ProgressMap;

  /** What the most recent day-recording did, for the UI to celebrate. Deliberately not persisted. */
  lastStreakOutcome: StreakOutcome['kind'] | null;

  setLocale: (locale: Locale) => void;
  setTheme: (theme: ThemePreference) => void;
  setQuestionLanguage: (questionLanguage: QuestionLanguage) => void;
  setDailyGoalXp: (dailyGoalXp: number) => void;
  setSoundEnabled: (soundEnabled: boolean) => void;
  setReduceMotion: (reduceMotion: Settings['reduceMotion']) => void;

  /** Mark an objective's lesson read. Idempotent: the XP is paid once. */
  markLessonRead: (objectiveId: string) => void;
  /** Record a finished objective quiz. */
  recordQuizAttempt: (objectiveId: string, correct: number, total: number) => void;
  /** Record a finished mock exam. */
  recordExamAttempt: (passed: boolean) => void;

  resetAll: () => void;
}

interface Applied {
  gamification: GamificationState;
  outcome: StreakOutcome;
}

/**
 * Fold a set of XP awards into the gamification state.
 *
 * The daily-goal bonus is paid here rather than by the caller, because it depends on the *running*
 * total for the day: whichever award happens to cross the goal triggers it. Guarding on the
 * streak's `lastCompletedDay` keeps it to once per day — the bonus itself adds XP, so without the
 * guard it would pay again on every award that landed after the goal was reached.
 */
function applyAwards(
  state: GamificationState,
  awards: readonly XpAward[],
  dailyGoalXp: number,
): Applied {
  const day = clock.localDayKey();
  const earned = totalOf(awards);

  let ledger = addToLedger(state.ledger, day, earned);
  let totalXp = state.totalXp + earned;

  const goalAlreadyCounted = state.streak.lastCompletedDay === day;
  if (!goalAlreadyCounted && xpOn(ledger, day) >= dailyGoalXp) {
    const bonus = award('dailyGoalMet');
    ledger = addToLedger(ledger, day, bonus.amount);
    totalXp += bonus.amount;
  }

  const outcome = recordDay(state.streak, { day, xpToday: xpOn(ledger, day), dailyGoalXp });

  return {
    gamification: { totalXp, streak: outcome.state, ledger: pruneLedger(ledger, day) },
    outcome,
  };
}

/**
 * The single persisted store.
 *
 * Reducers live in `src/domain` — this file owns persistence and the wiring, which is what lets the
 * interesting logic be unit-tested without a browser.
 */
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => {
      const applyTo = (awards: readonly XpAward[]) => {
        const { gamification, settings } = get();
        const applied = applyAwards(gamification, awards, settings.dailyGoalXp);
        set({ gamification: applied.gamification, lastStreakOutcome: applied.outcome.kind });
      };

      return {
        settings: { ...DEFAULT_SETTINGS },
        gamification: INITIAL_GAMIFICATION,
        progress: {},
        lastStreakOutcome: null,

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

        markLessonRead: (objectiveId) => {
          const existing = get().progress[objectiveId] ?? NO_RECORD;
          if (existing.lessonRead) {
            // Re-reading pays nothing. Otherwise the cheapest route to a streak is refreshing a page.
            return;
          }

          set((state) => ({
            progress: { ...state.progress, [objectiveId]: { ...existing, lessonRead: true } },
          }));
          applyTo([award('lessonRead')]);
        },

        recordQuizAttempt: (objectiveId, correct, total) => {
          if (total <= 0) {
            return;
          }

          const existing = get().progress[objectiveId] ?? NO_RECORD;
          const accuracy = correct / total;

          set((state) => ({
            progress: {
              ...state.progress,
              [objectiveId]: {
                // Taking the quiz implies the lesson: a learner who scores well without opening it
                // has still earned what the first crown represents.
                lessonRead: true,
                quizAttempts: existing.quizAttempts + 1,
                // Best, not latest: one bad day should not erase a demonstrated result.
                bestAccuracy: Math.max(existing.bestAccuracy, accuracy),
              },
            },
          }));
          applyTo(quizXp(correct, total));
        },

        recordExamAttempt: (passed) => {
          applyTo(examXp(passed));
        },

        resetAll: () =>
          set({
            settings: { ...DEFAULT_SETTINGS },
            gamification: INITIAL_GAMIFICATION,
            progress: {},
            lastStreakOutcome: null,
          }),
      };
    },
    {
      name: STORAGE_KEY,
      version: STORE_VERSION,
      storage: createJSONStorage(() => resolveStorage()),

      // Only data, never the action functions — and never `lastStreakOutcome`, which is a
      // notification about what just happened rather than state worth restoring.
      partialize: (state) => ({
        settings: state.settings,
        gamification: state.gamification,
        progress: state.progress,
      }),

      migrate: (persisted, version) => {
        const outcome = runMigrations(persisted, version);
        if (outcome.discarded) {
          // Defaults rather than a throw: a learner opening the app after an incompatible change
          // should find a working app, not a blank screen.
          return {};
        }
        return outcome.state;
      },

      /**
       * Re-validate on the way in. The persisted blob is untrusted: hand-edited, written by an
       * older build, or truncated by a browser evicting storage mid-write.
       */
      merge: (persisted, current) => {
        const blob = (persisted ?? {}) as Record<string, unknown>;

        return {
          ...current,
          settings: coerceSettings(blob['settings']),
          gamification: coerceGamification(blob['gamification']),
          progress: coerceProgress(blob['progress']),
        };
      },
    },
  ),
);
