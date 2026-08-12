import { useCallback, useEffect, useRef, useState } from 'react';

import { loadQuestions } from '@/content/question-bank';
import type { Question } from '@/content/schemas';
import {
  advance,
  buildSession,
  currentItem,
  isComplete,
  isLastQuestion,
  type QuizSession,
  retryWrongOnly,
  revealCurrent,
  scoreSession,
  selectOption,
} from '@/domain/quiz/session';
import { createSeededRng } from '@/domain/rng';
import { createRandomSeed } from '@/lib/rng';
import { useAppStore } from '@/lib/store/store';

/** How many questions an objective quiz draws when the bank is large enough. */
export const QUIZ_LENGTH = 10;

export type QuizPhase = 'loading' | 'empty' | 'running' | 'finished';

/**
 * Drives one quiz.
 *
 * All the rules live in `src/domain/quiz/session.ts`; this hook loads the bank, holds the session
 * value, and reports the result to the store. Keeping the transitions pure is what lets the awkward
 * cases — multi-select scoring, re-answering after reveal — be tested without rendering anything.
 *
 * Two things here were arrived at the hard way.
 *
 * `phase` is *derived*, not stored. An earlier version kept it in state and updated it from an
 * effect, which the `react-hooks/set-state-in-effect` rule rightly rejected: state that is a pure
 * function of other state is a second source of truth waiting to disagree with the first.
 *
 * Nothing here resets state when the objective changes, because the caller remounts instead — see
 * the `key` on `QuizRunner`. Resetting five pieces of state from an effect is the pattern a `key`
 * exists to replace, and it leaves a frame of the previous quiz on screen.
 *
 * The result is recorded in the reveal handler, not in an effect, guarded by a ref. An event handler
 * is where a side effect belongs, and the ref survives React's StrictMode double-invocation — which
 * would otherwise record two quiz attempts for one quiz.
 */
export function useQuizSession(objectiveId: string) {
  /** null while the dynamic import is in flight. */
  const [bank, setBank] = useState<Question[] | null>(null);
  const [session, setSession] = useState<QuizSession<Question> | null>(null);
  /**
   * Set by "see result". Separate from `isComplete` on purpose: revealing the last answer completes
   * the session, but the learner still has to read that question's explanations. Deriving the
   * results screen straight from `isComplete` snatched them away.
   */
  const [showResult, setShowResult] = useState(false);
  const recorded = useRef(false);
  const recordQuizAttempt = useAppStore((state) => state.recordQuizAttempt);
  const markQuestionsSeen = useAppStore((state) => state.markQuestionsSeen);

  useEffect(() => {
    let cancelled = false;

    void loadQuestions(objectiveId).then((loaded) => {
      // The objective can change while an import is in flight; without this guard a slow fetch for
      // 1.1 can overwrite a fast one for 1.2 and show the wrong quiz.
      if (cancelled) {
        return;
      }

      setBank(loaded);
      if (loaded.length > 0) {
        const seed = createRandomSeed();
        setSession(buildSession(loaded, { count: QUIZ_LENGTH, seed, rng: createSeededRng(seed) }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [objectiveId]);

  const select = useCallback((optionId: string) => {
    setSession((current) => (current === null ? current : selectOption(current, optionId)));
  }, []);

  const reveal = useCallback(() => {
    if (session === null) {
      return;
    }

    const next = revealCurrent(session);
    setSession(next);

    /*
     * Recorded on reveal, not when the session is drawn. Drawing ten questions and answering two
     * would otherwise age all ten, and the mock exam would go on to avoid eight questions the
     * learner never actually read.
     */
    const answered = currentItem(next);
    if (answered?.revealed === true) {
      markQuestionsSeen([answered.question.id]);
    }

    if (isComplete(next) && !recorded.current) {
      recorded.current = true;
      const result = scoreSession(next);
      recordQuizAttempt(objectiveId, result.correct, result.total);
    }
  }, [session, objectiveId, recordQuizAttempt, markQuestionsSeen]);

  const next = useCallback(() => {
    if (session === null) {
      return;
    }
    if (isLastQuestion(session)) {
      setShowResult(true);
      return;
    }
    setSession(advance(session));
  }, [session]);

  const retryWrong = useCallback(() => {
    if (session === null) {
      return;
    }
    const seed = createRandomSeed();
    const retry = retryWrongOnly(session, seed, createSeededRng(seed));
    if (retry === null) {
      return;
    }

    setSession(retry);
    setShowResult(false);
    recorded.current = false;
  }, [session]);

  const restart = useCallback(() => {
    if (bank === null || bank.length === 0) {
      return;
    }
    const seed = createRandomSeed();

    setSession(buildSession(bank, { count: QUIZ_LENGTH, seed, rng: createSeededRng(seed) }));
    setShowResult(false);
    recorded.current = false;
  }, [bank]);

  const phase: QuizPhase =
    bank === null ? 'loading' : bank.length === 0 ? 'empty' : showResult ? 'finished' : 'running';

  return {
    phase,
    session,
    item: session === null ? undefined : currentItem(session),
    isLast: session === null ? false : isLastQuestion(session),
    result: session === null ? null : scoreSession(session),
    questionNumber: session === null ? 0 : session.index + 1,
    questionCount: session?.items.length ?? 0,
    select,
    reveal,
    next,
    retryWrong,
    restart,
  };
}
