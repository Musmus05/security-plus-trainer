import { useCallback, useMemo, useState } from 'react';

import { createSeededRng } from '@/domain/rng';
import {
  buildQueue,
  currentCardId,
  dueCount,
  type Grade,
  grade as gradeSession,
  isFinished,
  reveal as revealSession,
  type ReviewSession,
  startSession,
} from '@/domain/srs';
import { createSystemClock } from '@/lib/clock';
import { createRandomSeed } from '@/lib/rng';
import { useAppStore } from '@/lib/store/store';

import { ACRONYM_CARD_IDS, findCard } from './decks';

/**
 * How many cards one sitting holds.
 *
 * A deliberate ceiling rather than "everything due". Handing a learner who has been away for three
 * weeks a queue of 200 cards is how a review habit dies; a session that ends is a session that gets
 * started again tomorrow.
 */
export const SESSION_LIMIT = 20;

export type ReviewPhase = 'idle' | 'running' | 'finished';

/**
 * Drives one review sitting.
 *
 * Every rule lives in `src/domain/srs`; this hook owns the queue-building seed, the session value
 * and the write to the store. The schedule is written on each grade rather than batched at the end,
 * so closing the tab mid-session keeps the reviews already done.
 */
export function useReviewSession() {
  const srs = useAppStore((state) => state.srs);
  const gradeCard = useAppStore((state) => state.gradeCard);

  const [session, setSession] = useState<ReviewSession | null>(null);

  // Same treatment as the dashboard: the day key is resolved from the system clock here, in the
  // adapter layer, so nothing under `src/domain` ever reads the time.
  const today = useMemo(() => createSystemClock().localDayKey(), []);

  /*
   * Read from the store as it was when the session started, not live: grading a card updates `srs`,
   * and recomputing the due count from the new value would make the "cards due" figure tick down
   * under the learner mid-session and disagree with the queue they are working through.
   */
  const due = useMemo(() => dueCount(ACRONYM_CARD_IDS, srs, today), [srs, today]);

  const start = useCallback(() => {
    const seed = createRandomSeed();
    const queue = buildQueue(ACRONYM_CARD_IDS, useAppStore.getState().srs, today, {
      limit: SESSION_LIMIT,
      rng: createSeededRng(seed),
    });

    setSession(startSession(queue));
  }, [today]);

  const reveal = useCallback(() => {
    setSession((current) => (current === null ? current : revealSession(current)));
  }, []);

  /**
   * Grade the current card.
   *
   * The store write happens in the handler body, **not** inside the `setSession` updater. React
   * double-invokes updater functions under StrictMode exactly as it double-invokes effects, so a
   * `gradeCard` call in there would advance the schedule twice for one button press — pushing the
   * card an extra interval out and paying the XP twice. An updater has to stay pure.
   */
  const answer = useCallback(
    (grade: Grade) => {
      if (session?.revealed !== true) {
        return;
      }

      const cardId = currentCardId(session);
      if (cardId === undefined) {
        return;
      }

      gradeCard(cardId, grade);
      setSession(gradeSession(session, grade !== 'again'));
    },
    [session, gradeCard],
  );

  const finish = useCallback(() => {
    setSession(null);
  }, []);

  const cardId = session === null ? undefined : currentCardId(session);

  // Derived, never stored: a phase held in state is a second source of truth waiting to disagree
  // with the session it describes.
  const phase: ReviewPhase =
    session === null ? 'idle' : isFinished(session) ? 'finished' : 'running';

  return {
    phase,
    due,
    deckSize: ACRONYM_CARD_IDS.length,
    card: cardId === undefined ? undefined : findCard(cardId),
    revealed: session?.revealed ?? false,
    remaining: session?.queue.length ?? 0,
    completed: session?.completed.length ?? 0,
    lapses: session?.lapses ?? 0,
    start,
    reveal,
    answer,
    finish,
  };
}
