import type { Rng } from '@/domain/ports';
import { sample, shuffle } from '@/domain/shuffle';

/**
 * A quiz session.
 *
 * Pure: `buildSession` and every transition are functions of their inputs plus an injected
 * generator. The session is a value, so a test can drive a whole quiz to its result without a
 * browser, and the reducer cannot accidentally depend on render order.
 */

/** The shape the engine needs. The full authored question carries prose the engine never reads. */
export interface QuizOptionLike {
  id: string;
  correct: boolean;
}

export interface QuizQuestionLike {
  id: string;
  objective: string;
  options: readonly QuizOptionLike[];
  // Explicitly `| undefined` for `exactOptionalPropertyTypes`: the Zod-inferred question type has it,
  // and without it the authored question is not assignable to this structural shape.
  multiSelect?: boolean | undefined;
}

export interface SessionItem<Q extends QuizQuestionLike> {
  question: Q;
  /** Options in presentation order — shuffled, so position never hints at the answer. */
  options: readonly QuizOptionLike[];
  /** Option ids the learner has selected. */
  selected: readonly string[];
  /** True once the answer has been submitted and the explanations shown. */
  revealed: boolean;
}

export interface QuizSession<Q extends QuizQuestionLike> {
  items: readonly SessionItem<Q>[];
  index: number;
  /** The seed the session was built from, so it can be replayed exactly. */
  seed: number;
}

export interface BuildOptions {
  /** How many questions to draw. Fewer are used if the bank is smaller. */
  count: number;
  seed: number;
  rng: Rng;
}

/**
 * Draw a session from a question bank.
 *
 * Both the question order *and* each question's option order are shuffled. Shuffling options matters
 * more than it looks: authored banks tend to put the correct answer first while drafting, and a
 * learner who notices that stops reading the distractors — which is where most of the teaching is.
 *
 * Because `correct` travels on the option itself, shuffling needs no index bookkeeping. Storing a
 * `correctIndex` alongside a shuffled array is the classic way this goes wrong.
 */
export function buildSession<Q extends QuizQuestionLike>(
  bank: readonly Q[],
  { count, seed, rng }: BuildOptions,
): QuizSession<Q> {
  const drawn = sample(bank, count, rng);

  return {
    items: drawn.map((question) => ({
      question,
      options: shuffle(question.options, rng),
      selected: [],
      revealed: false,
    })),
    index: 0,
    seed,
  };
}

export function currentItem<Q extends QuizQuestionLike>(
  session: QuizSession<Q>,
): SessionItem<Q> | undefined {
  return session.items[session.index];
}

/**
 * Select an option on the current question.
 *
 * Single-answer questions replace the selection; multi-select toggles. Selecting after the answer is
 * revealed is ignored rather than allowed — otherwise a learner could see the explanations, change
 * their answer, and score themselves correct.
 */
export function selectOption<Q extends QuizQuestionLike>(
  session: QuizSession<Q>,
  optionId: string,
): QuizSession<Q> {
  return mapCurrent(session, (item) => {
    if (item.revealed) {
      return item;
    }
    if (!item.options.some((option) => option.id === optionId)) {
      return item;
    }

    if (item.question.multiSelect === true) {
      const selected = item.selected.includes(optionId)
        ? item.selected.filter((id) => id !== optionId)
        : [...item.selected, optionId];
      return { ...item, selected };
    }

    return { ...item, selected: [optionId] };
  });
}

/** Submit the current answer, revealing the explanations. A no-op with nothing selected. */
export function revealCurrent<Q extends QuizQuestionLike>(session: QuizSession<Q>): QuizSession<Q> {
  return mapCurrent(session, (item) =>
    item.selected.length === 0 || item.revealed ? item : { ...item, revealed: true },
  );
}

/** Advance to the next question. Stops at the end rather than running past it. */
export function advance<Q extends QuizQuestionLike>(session: QuizSession<Q>): QuizSession<Q> {
  if (session.index >= session.items.length - 1) {
    return session;
  }
  return { ...session, index: session.index + 1 };
}

export function isLastQuestion<Q extends QuizQuestionLike>(session: QuizSession<Q>): boolean {
  return session.index >= session.items.length - 1;
}

export function isComplete<Q extends QuizQuestionLike>(session: QuizSession<Q>): boolean {
  return session.items.length > 0 && session.items.every((item) => item.revealed);
}

/**
 * Whether an item was answered correctly.
 *
 * Set equality, not "contains a correct option": on a multi-select question, picking one right
 * answer and one wrong one is not a correct answer, and picking a subset of the right ones is not
 * either. An unrevealed item is not correct — it has not been answered.
 */
export function isItemCorrect<Q extends QuizQuestionLike>(item: SessionItem<Q>): boolean {
  if (!item.revealed) {
    return false;
  }

  const correctIds = item.options.filter((option) => option.correct).map((option) => option.id);
  const selected = new Set(item.selected);

  return correctIds.length === selected.size && correctIds.every((id) => selected.has(id));
}

export interface QuizResult {
  correct: number;
  total: number;
  /** 0–1. Zero for an empty quiz rather than NaN. */
  accuracy: number;
  /** Ids of the questions answered wrongly, in presentation order. */
  wrongQuestionIds: readonly string[];
}

export function scoreSession<Q extends QuizQuestionLike>(session: QuizSession<Q>): QuizResult {
  const total = session.items.length;
  const correct = session.items.filter(isItemCorrect).length;

  return {
    correct,
    total,
    accuracy: total === 0 ? 0 : correct / total,
    wrongQuestionIds: session.items
      .filter((item) => !isItemCorrect(item))
      .map((item) => item.question.id),
  };
}

/**
 * A follow-up session containing only the questions that were missed.
 *
 * Re-drilling the whole quiz to fix two mistakes is how a learner ends up re-reading what they
 * already know. The options are reshuffled, so the second pass cannot be answered from the
 * remembered position of the right answer.
 */
export function retryWrongOnly<Q extends QuizQuestionLike>(
  session: QuizSession<Q>,
  seed: number,
  rng: Rng,
): QuizSession<Q> | null {
  const wrong = session.items.filter((item) => !isItemCorrect(item)).map((item) => item.question);

  if (wrong.length === 0) {
    return null;
  }

  return buildSession(wrong, { count: wrong.length, seed, rng });
}

function mapCurrent<Q extends QuizQuestionLike>(
  session: QuizSession<Q>,
  map: (item: SessionItem<Q>) => SessionItem<Q>,
): QuizSession<Q> {
  const item = session.items[session.index];
  if (item === undefined) {
    return session;
  }

  const next = map(item);
  if (next === item) {
    return session;
  }

  const items = [...session.items];
  items[session.index] = next;
  return { ...session, items };
}
