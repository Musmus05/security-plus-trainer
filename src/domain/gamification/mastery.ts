/**
 * Mastery, expressed as crowns per objective.
 *
 * Crowns are deliberately hard to get from one activity. Reading a lesson earns one; the rest need
 * quiz accuracy *and*, at the top, flashcards that have actually stuck. That matters because the
 * dashboard's per-domain ring is what a learner uses to decide what to revise, and a ring that
 * fills up from reading alone would send them into the exam confident and unprepared.
 *
 * Pure: no clock, no storage. Everything comes from the progress record.
 */

export interface ObjectiveProgress {
  /** Set once the lesson has been marked read. */
  lessonRead: boolean;
  quizAttempts: number;
  /** Best accuracy across attempts, 0–1. */
  bestAccuracy: number;
  /** Flashcards belonging to this objective. */
  cardsTotal: number;
  /** Cards the spaced-repetition scheduler considers mature (a long interval, not a fresh one). */
  cardsMature: number;
}

export const NO_PROGRESS: ObjectiveProgress = {
  lessonRead: false,
  quizAttempts: 0,
  bestAccuracy: 0,
  cardsTotal: 0,
  cardsMature: 0,
};

export const MAX_CROWNS = 5;

export type Crowns = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * The crown thresholds.
 *
 * The top two require flashcard retention as well as quiz accuracy. A learner can score 95% on a
 * ten-question quiz they have just taken three times; whether they still know it next week is what
 * the SRS state answers, and that is the thing worth calling mastery.
 */
export function crownsFor(progress: ObjectiveProgress): Crowns {
  const { lessonRead, quizAttempts, bestAccuracy, cardsTotal, cardsMature } = progress;

  if (!lessonRead) {
    return 0;
  }
  if (quizAttempts === 0) {
    return 1;
  }

  // No cards authored yet for this objective: retention cannot be demonstrated, so the top two
  // crowns are unreachable rather than free. Treating an empty deck as "all mature" would hand out
  // five crowns for a quiz alone.
  const retention = cardsTotal === 0 ? 0 : cardsMature / cardsTotal;

  if (bestAccuracy >= 0.95 && retention >= 1) {
    return 5;
  }
  if (bestAccuracy >= 0.9 && retention >= 0.8) {
    return 4;
  }
  if (bestAccuracy >= 0.8) {
    return 3;
  }
  if (bestAccuracy >= 0.6) {
    return 2;
  }
  return 1;
}

/** What the learner needs to do next to earn the next crown. Drives the objective page's hint. */
export type NextCrownHint =
  | { crowns: 5; need: 'nothing' }
  | {
      crowns: Crowns;
      need: 'read-lesson' | 'take-quiz' | 'improve-accuracy' | 'review-cards';
      target?: number;
    };

export function nextCrownHint(progress: ObjectiveProgress): NextCrownHint {
  const crowns = crownsFor(progress);

  if (crowns === 5) {
    return { crowns: 5, need: 'nothing' };
  }
  if (!progress.lessonRead) {
    return { crowns, need: 'read-lesson' };
  }
  if (progress.quizAttempts === 0) {
    return { crowns, need: 'take-quiz' };
  }

  // Accuracy is checked before retention at both of the top two steps, so the hint only ever needs
  // `bestAccuracy` to decide which of the two is blocking.
  if (crowns === 2) {
    return { crowns, need: 'improve-accuracy', target: 0.8 };
  }
  if (crowns === 3) {
    // Accuracy is the binding constraint at 3 → 4 unless it is already high enough.
    return progress.bestAccuracy >= 0.9
      ? { crowns, need: 'review-cards', target: 0.8 }
      : { crowns, need: 'improve-accuracy', target: 0.9 };
  }
  // crowns === 4
  return progress.bestAccuracy >= 0.95
    ? { crowns, need: 'review-cards', target: 1 }
    : { crowns, need: 'improve-accuracy', target: 0.95 };
}

/**
 * A domain's mastery as a 0–1 fraction, for the dashboard ring.
 *
 * The mean of its objectives' crowns, so a domain cannot look finished because one objective is
 * perfect. An objective with no progress record counts as zero rather than being skipped — the
 * denominator is what the exam covers, not what the learner has opened.
 */
export function domainMastery(
  objectiveIds: readonly string[],
  progressById: Readonly<Record<string, ObjectiveProgress | undefined>>,
): number {
  if (objectiveIds.length === 0) {
    return 0;
  }

  const total = objectiveIds.reduce(
    (sum, id) => sum + crownsFor(progressById[id] ?? NO_PROGRESS),
    0,
  );

  return total / (objectiveIds.length * MAX_CROWNS);
}
