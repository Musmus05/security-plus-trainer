/**
 * The XP economy.
 *
 * Two rules keep it honest.
 *
 * **Reward the work, not the outcome.** A flashcard earns XP for being reviewed, whether the answer
 * was right or wrong. Paying only for correct answers teaches the learner to review what they
 * already know — the exact opposite of what spaced repetition is for.
 *
 * **Nothing repeatable is worth much.** Reading a lesson pays once per objective; the awards that
 * can be repeated are small, and the large ones are gated behind finishing something. Otherwise the
 * cheapest path to a streak is re-reading the same page, and the streak stops meaning anything.
 */

export const XP = {
  /** First time an objective's lesson is marked read. Not repeatable. */
  lessonRead: 20,
  /** Per correct answer in an objective quiz. */
  quizCorrect: 5,
  /** For finishing a quiz, regardless of score — completion is the behaviour worth paying for. */
  quizCompleted: 10,
  /** On top of completion, for getting every question right. */
  quizPerfect: 15,
  /** Per flashcard graded, whatever the grade. */
  flashcardReviewed: 2,
  /** For finishing a full mock exam. */
  examCompleted: 100,
  /** On top of completion, for reaching the passing score. */
  examPassed: 50,
  /** The first time the daily goal is met on a given day. */
  dailyGoalMet: 25,
} as const;

export type XpReason = keyof typeof XP;

export interface XpAward {
  reason: XpReason;
  amount: number;
}

export function award(reason: XpReason, times = 1): XpAward {
  if (!Number.isInteger(times) || times < 0) {
    throw new Error(`award: "times" must be a non-negative integer, got ${String(times)}`);
  }
  return { reason, amount: XP[reason] * times };
}

/** Total XP for finishing a quiz. Split out because three awards combine and the order matters. */
export function quizXp(correctCount: number, questionCount: number): XpAward[] {
  if (questionCount <= 0) {
    return [];
  }

  const awards: XpAward[] = [award('quizCorrect', correctCount), award('quizCompleted')];

  if (correctCount === questionCount) {
    awards.push(award('quizPerfect'));
  }

  return awards;
}

/** Total XP for finishing a mock exam. */
export function examXp(passed: boolean): XpAward[] {
  const awards = [award('examCompleted')];
  if (passed) {
    awards.push(award('examPassed'));
  }
  return awards;
}

export function totalOf(awards: readonly XpAward[]): number {
  return awards.reduce((sum, entry) => sum + entry.amount, 0);
}

/* --------------------------------------------------------------- daily ledger */

/**
 * XP earned per local day.
 *
 * Kept as a map from day key to total rather than a running counter plus a date, because the
 * dashboard's activity heatmap needs the history anyway, and deriving it from a counter is
 * impossible after the fact.
 */
export type DailyLedger = Readonly<Record<string, number>>;

export function addToLedger(ledger: DailyLedger, day: string, amount: number): DailyLedger {
  if (amount === 0) {
    return ledger;
  }
  return { ...ledger, [day]: (ledger[day] ?? 0) + amount };
}

export function xpOn(ledger: DailyLedger, day: string): number {
  return ledger[day] ?? 0;
}

/**
 * Drop entries older than `keepDays` before `today`.
 *
 * The ledger is persisted in `localStorage`, which has a few megabytes at best and is shared with
 * everything else the origin stores. A year of daily entries is fine; five years of them is a
 * quiet leak that eventually costs the learner their whole save.
 */
export function pruneLedger(ledger: DailyLedger, today: string, keepDays = 400): DailyLedger {
  const cutoff = new Date(Date.parse(`${today}T00:00:00Z`) - keepDays * 86_400_000)
    .toISOString()
    .slice(0, 10);

  const kept: Record<string, number> = {};
  for (const [day, amount] of Object.entries(ledger)) {
    if (day >= cutoff) {
      kept[day] = amount;
    }
  }
  return kept;
}
