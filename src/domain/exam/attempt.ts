/**
 * An in-progress mock exam.
 *
 * A value with pure transitions, like the quiz session — but with free navigation, flags, and no
 * feedback until the end, because that is what the real exam does.
 *
 * The attempt is designed to be **persisted and rebuilt**: it holds question ids and option ids,
 * never question objects. Ninety questions with bilingual prose and four explanations each would be
 * several hundred kilobytes in `localStorage`, and storage that large gets evicted.
 */

export interface ExamAttempt {
  /** Question ids in delivery order. */
  questionIds: readonly string[];
  /** Question id → selected option ids. Absent means unanswered. */
  answers: Readonly<Record<string, readonly string[]>>;
  /** Question ids the candidate marked to come back to. */
  flagged: readonly string[];
  index: number;
  /** Epoch milliseconds. The timer is derived from this, never counted down and stored. */
  startedAt: number;
  durationMs: number;
  /**
   * Seed for the per-question option shuffle.
   *
   * Persisted so a reload redraws the options in the same order. Without it a candidate who
   * refreshes finds their answer apparently moved to a different row.
   */
  seed: number;
}

export function startAttempt(
  questionIds: readonly string[],
  startedAt: number,
  durationMs: number,
  seed: number,
): ExamAttempt {
  return { questionIds, answers: {}, flagged: [], index: 0, startedAt, durationMs, seed };
}

export function currentQuestionId(attempt: ExamAttempt): string | undefined {
  return attempt.questionIds[attempt.index];
}

/** Move to a specific question. Out-of-range indices are ignored rather than clamped. */
export function goTo(attempt: ExamAttempt, index: number): ExamAttempt {
  if (!Number.isInteger(index) || index < 0 || index >= attempt.questionIds.length) {
    return attempt;
  }
  return { ...attempt, index };
}

export function next(attempt: ExamAttempt): ExamAttempt {
  return goTo(attempt, attempt.index + 1);
}

export function previous(attempt: ExamAttempt): ExamAttempt {
  return goTo(attempt, attempt.index - 1);
}

/**
 * Select an option on the current question.
 *
 * Single-answer replaces; multi-select toggles. Unlike the quiz there is no reveal to lock against
 * — changing an answer is the whole reason the real exam lets you navigate — so the only guard is
 * that the option belongs to the question.
 */
export function selectOption(
  attempt: ExamAttempt,
  optionIds: readonly string[],
  optionId: string,
  multiSelect: boolean,
): ExamAttempt {
  const questionId = currentQuestionId(attempt);
  if (questionId === undefined || !optionIds.includes(optionId)) {
    return attempt;
  }

  const selected = attempt.answers[questionId] ?? [];
  const nextSelection = multiSelect
    ? selected.includes(optionId)
      ? selected.filter((id) => id !== optionId)
      : [...selected, optionId]
    : [optionId];

  return { ...attempt, answers: { ...attempt.answers, [questionId]: nextSelection } };
}

export function toggleFlag(attempt: ExamAttempt): ExamAttempt {
  const questionId = currentQuestionId(attempt);
  if (questionId === undefined) {
    return attempt;
  }

  return {
    ...attempt,
    flagged: attempt.flagged.includes(questionId)
      ? attempt.flagged.filter((id) => id !== questionId)
      : [...attempt.flagged, questionId],
  };
}

export function isFlagged(attempt: ExamAttempt, questionId: string): boolean {
  return attempt.flagged.includes(questionId);
}

export function isAnswered(attempt: ExamAttempt, questionId: string): boolean {
  return (attempt.answers[questionId] ?? []).length > 0;
}

export function answeredCount(attempt: ExamAttempt): number {
  return attempt.questionIds.filter((id) => isAnswered(attempt, id)).length;
}

/* --------------------------------------------------------------------- timing */

/**
 * Milliseconds left, computed from the wall clock rather than counted down.
 *
 * This is the whole reason the attempt stores `startedAt` instead of `remainingMs`. A stored
 * countdown decremented by an interval stops while the tab is backgrounded, stops entirely while
 * the tab is closed, and hands a candidate who reloads at minute 80 a fresh 90 minutes. Deriving it
 * means the clock keeps running exactly as the real one does, and a reload changes nothing.
 *
 * Never negative: the caller wants "0 left", not a negative duration to format.
 */
export function remainingMs(attempt: ExamAttempt, now: number): number {
  return Math.max(0, attempt.startedAt + attempt.durationMs - now);
}

export function isExpired(attempt: ExamAttempt, now: number): boolean {
  return remainingMs(attempt, now) === 0;
}

/** `H:MM:SS` for the exam clock, floored — a display of 0:00 must mean no time left. */
export function formatRemaining(ms: number): string {
  const totalSeconds = Math.floor(Math.max(0, ms) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, '0');

  return `${String(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
