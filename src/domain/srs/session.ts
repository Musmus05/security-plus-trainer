import type { Rng } from '@/domain/ports';
import { shuffle } from '@/domain/shuffle';

import { type CardState, isDue } from './scheduler';

/**
 * A review session: an ordered queue of card ids and where the learner is in it.
 *
 * A value, like the quiz session, so a test can drive a whole review to its end without rendering
 * anything and without a clock.
 */

export interface ReviewSession {
  /** Card ids still to answer. The head is the current card. */
  queue: readonly string[];
  /** True once the answer is showing and the grade buttons are live. */
  revealed: boolean;
  /** Cards graded at least `hard` — the session's actual output. */
  completed: readonly string[];
  /** How many times any card was graded `again` in this session. */
  lapses: number;
}

export interface BuildQueueOptions {
  /** Largest number of cards to put in the session. */
  limit: number;
  rng: Rng;
}

/**
 * Choose what to review.
 *
 * Due cards first, then unseen ones. The order matters: a learner with fifty cards due and a
 * hundred never seen should be caught up on what they are about to forget before being handed new
 * material — otherwise the backlog grows every session and the schedule stops meaning anything.
 *
 * Both groups are shuffled. Without it the queue follows the deck's own order, and a learner ends
 * up recalling "the one after RADIUS" rather than the card.
 */
export function buildQueue(
  cardIds: readonly string[],
  states: Readonly<Record<string, CardState | undefined>>,
  today: string,
  { limit, rng }: BuildQueueOptions,
): string[] {
  const due: string[] = [];
  const fresh: string[] = [];

  for (const id of cardIds) {
    const state = states[id];
    if (state === undefined) {
      fresh.push(id);
    } else if (isDue(state, today)) {
      due.push(id);
    }
  }

  return [...shuffle(due, rng), ...shuffle(fresh, rng)].slice(0, Math.max(0, limit));
}

export function startSession(queue: readonly string[]): ReviewSession {
  return { queue: [...queue], revealed: false, completed: [], lapses: 0 };
}

export function currentCardId(session: ReviewSession): string | undefined {
  return session.queue[0];
}

export function reveal(session: ReviewSession): ReviewSession {
  return session.revealed || session.queue.length === 0 ? session : { ...session, revealed: true };
}

/**
 * Answer the current card.
 *
 * `again` sends the card to the back of the queue instead of dropping it, so the session is not
 * over until every card has been recalled at least once. That is the whole point of a review: a
 * card you just failed is the one you most need to see again.
 *
 * Grading before revealing is refused rather than allowed — the grade is a self-report about
 * recall, and a learner who has not yet seen the answer has nothing to report.
 */
export function grade(session: ReviewSession, wasCorrect: boolean): ReviewSession {
  const [current, ...rest] = session.queue;

  if (current === undefined || !session.revealed) {
    return session;
  }

  if (!wasCorrect) {
    return { ...session, queue: [...rest, current], revealed: false, lapses: session.lapses + 1 };
  }

  return {
    ...session,
    queue: rest,
    revealed: false,
    completed: [...session.completed, current],
  };
}

export function isFinished(session: ReviewSession): boolean {
  return session.queue.length === 0;
}

/** Cards due today, for the dashboard counter. Counts unseen cards as due — they are. */
export function dueCount(
  cardIds: readonly string[],
  states: Readonly<Record<string, CardState | undefined>>,
  today: string,
): number {
  return cardIds.filter((id) => {
    const state = states[id];
    return state === undefined || isDue(state, today);
  }).length;
}
