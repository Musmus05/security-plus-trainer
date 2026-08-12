import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { EXAM_META } from '@/content/exam-meta';
import { ALL_OBJECTIVES, DOMAINS } from '@/content/exam/sy0-701/domains';
import { loadQuestions, OBJECTIVES_WITH_QUESTIONS } from '@/content/question-bank';
import type { Question } from '@/content/schemas';
import {
  allocationFor,
  answeredCount,
  currentQuestionId,
  type ExamAnswer,
  type ExamAttempt,
  type ExamScope,
  type ExamScore,
  composeRank,
  durationMsFor,
  examRank,
  goTo as goToQuestion,
  isExpired,
  next as nextQuestion,
  previous as previousQuestion,
  remainingMs,
  questionCountFor,
  scenarioObjectiveIds,
  sampleExam,
  scoreAttempt,
  selectOption as selectExamOption,
  startAttempt,
  toggleFlag as toggleExamFlag,
} from '@/domain/exam';
import { createSeededRng } from '@/domain/rng';
import { shuffle } from '@/domain/shuffle';
import { createSystemClock } from '@/lib/clock';
import { createRandomSeed } from '@/lib/rng';
import { useAppStore } from '@/lib/store/store';

const SCORE_OPTIONS = { scale: EXAM_META.scoreScale, passingScore: EXAM_META.passingScore };
const WEIGHTS = DOMAINS.map((domain) => ({ domain: domain.id, weight: domain.weight }));

/**
 * The seven objectives whose official title begins "Given a scenario".
 *
 * Derived from the outline rather than listed, so it cannot fall out of step with the document it
 * came from.
 */
const SCENARIO_OBJECTIVES = scenarioObjectiveIds(ALL_OBJECTIVES);

/** The shape of one exam: how many questions from where, and how long for. */
export function examPlan(scope: ExamScope) {
  const allocation = allocationFor(scope, WEIGHTS, EXAM_META.maxQuestions);
  const questionCount = questionCountFor(allocation);

  return {
    allocation,
    questionCount,
    durationMs: durationMsFor(questionCount, EXAM_META.maxQuestions, EXAM_META.durationMinutes),
  };
}

/** How often the countdown re-renders. One second: the clock shows seconds. */
const TICK_MS = 1000;

export type ExamPhase = 'idle' | 'loading' | 'running' | 'finished';

/**
 * Drives a mock exam.
 *
 * Every rule lives in `src/domain/exam`. This hook owns the three impure parts: loading the
 * question banks, reading the wall clock, and persisting the attempt.
 *
 * The attempt is written to the store on **every** interaction. That looks profligate until you
 * consider what is being protected: ninety minutes of a person's evening. A batched save loses
 * whatever happened since the last one, and the events worth surviving — a crash, a closed laptop,
 * a stray reload — are exactly the ones that give no warning.
 */
export function useExamAttempt(scope: ExamScope = 'full') {
  const plan = useMemo(() => examPlan(scope), [scope]);

  /*
   * Only the attempt belonging to *this* page's scope. There is one attempt at a time, so opening
   * the domain 4 paper while a full mock is running must not silently adopt the other exam's
   * questions and clock. The hub tells the learner which one is in progress instead.
   */
  const stored = useAppStore((state) => state.currentExam);
  const attempt = stored !== null && stored.scope === scope ? stored : null;
  const otherInProgress = stored !== null && stored.scope !== scope ? stored.scope : null;

  const history = useAppStore((state) => state.examHistory);
  const startExam = useAppStore((state) => state.startExam);
  const saveExam = useAppStore((state) => state.saveExam);
  const finishExam = useAppStore((state) => state.finishExam);
  const abandonExam = useAppStore((state) => state.abandonExam);
  const markQuestionsSeen = useAppStore((state) => state.markQuestionsSeen);

  /** Questions for the current attempt, by id. Null while the banks are loading. */
  const [questions, setQuestions] = useState<Map<string, Question> | null>(null);
  const [score, setScore] = useState<ExamScore | null>(null);
  const [starting, setStarting] = useState(false);
  const [now, setNow] = useState(() => createSystemClock().now());

  /*
   * The submit is guarded by a ref rather than by state. Time can run out while a submit triggered
   * by the button is already in flight, and scoring the same attempt twice would file two results
   * and pay the XP twice.
   */
  const submitted = useRef(false);

  const hasAttempt = attempt !== null;

  /* --------------------------------------------------------- loading the corpus */

  /*
   * Loaded once on mount rather than per attempt. The banks do not depend on which exam is in
   * progress — a mock exam samples across all 28 objectives — so keying the load on the attempt
   * meant re-deriving the same map, and any dependency narrow enough to avoid that (the attempt's
   * `startedAt`, say) is a dependency the linter cannot check.
   *
   * Reaching this route is already an intent to sit an exam, and the route itself is lazily loaded.
   */
  useEffect(() => {
    let cancelled = false;

    void loadAllBanks().then((banks) => {
      if (!cancelled) {
        setQuestions(new Map(banks.map((question) => [question.id, question])));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* ------------------------------------------------------------------ the clock */

  useEffect(() => {
    if (!hasAttempt) {
      return;
    }

    const id = setInterval(() => {
      setNow(createSystemClock().now());
    }, TICK_MS);

    return () => {
      clearInterval(id);
    };
  }, [hasAttempt]);

  /* ----------------------------------------------------------------- transitions */

  const start = useCallback(() => {
    setStarting(true);

    void loadAllBanks().then((banks) => {
      const seed = createRandomSeed();

      /*
       * Read once, not per question. The rank function runs over the whole 420-question corpus, and
       * `getState()` inside it would be four hundred store reads to answer the same question.
       *
       * Read here rather than through a selector on purpose: this is a snapshot taken at the moment
       * the paper is drawn, and it must not make the component re-render every time a quiz answer
       * updates it.
       */
      const seen = useAppStore.getState().seenQuestions;

      const drawn = sampleExam(
        groupByDomain(banks),
        plan.allocation,
        createSeededRng(seed),
        /*
         * Two preferences folded into one rank. Exam-likeness dominates — recall is a last resort
         * whatever its freshness — and within each kind the questions the learner has met least
         * often come first, so a mock is not a rerun of the quizzes they have already drilled.
         * See `src/domain/exam/realism.ts`.
         */
        (question) => composeRank(examRank(question, SCENARIO_OBJECTIVES), seen[question.id] ?? 0),
      );

      submitted.current = false;
      setScore(null);
      setQuestions(new Map(banks.map((question) => [question.id, question])));
      startExam(
        startAttempt(
          scope,
          drawn.map((question) => question.id),
          createSystemClock().now(),
          plan.durationMs,
          seed,
        ),
      );
      setStarting(false);
    });
  }, [startExam, scope, plan]);

  const submit = useCallback(() => {
    if (attempt === null || questions === null || submitted.current) {
      return;
    }
    submitted.current = true;

    const answers: ExamAnswer[] = attempt.questionIds.flatMap((questionId) => {
      const question = questions.get(questionId);
      if (question === undefined) {
        return [];
      }

      const selected = attempt.answers[questionId] ?? [];
      const correctIds = question.options.filter((option) => option.correct).map((o) => o.id);

      return [
        {
          questionId,
          objective: question.objective,
          // Set equality, exactly as in the quiz: a multi-select answered with one right option and
          // one wrong one is not a correct answer, and neither is a correct subset.
          correct:
            selected.length === correctIds.length &&
            correctIds.every((id) => selected.includes(id)),
          unanswered: selected.length === 0,
        },
      ];
    });

    /*
     * The whole paper is recorded on submit rather than as each question is reached. A sitting is
     * the unit here: an attempt walked away from was not really taken, and ageing its questions
     * would push them out of the next paper for no reason.
     */
    markQuestionsSeen(attempt.questionIds);

    const result = scoreAttempt(answers, SCORE_OPTIONS);
    setScore(result);
    finishExam({
      scope,
      correct: result.correct,
      total: result.total,
      unanswered: result.unanswered,
      scaled: result.scaled,
      passed: result.passed,
      byDomain: result.byDomain.map(({ domain, correct, total }) => ({ domain, correct, total })),
    });
  }, [attempt, questions, finishExam, scope, markQuestionsSeen]);

  /*
   * Time running out submits the attempt, exactly as the real exam does. Placed in an effect rather
   * than in the tick handler so that it also fires for an attempt that expired while the app was
   * closed — a candidate who reopens the tab two hours later gets their result, not a dead timer.
   */
  useEffect(() => {
    if (attempt !== null && questions !== null && isExpired(attempt, now)) {
      submit();
    }
  }, [attempt, questions, now, submit]);

  const update = useCallback(
    (map: (current: ExamAttempt) => ExamAttempt) => {
      if (attempt === null) {
        return;
      }
      const nextAttempt = map(attempt);
      if (nextAttempt !== attempt) {
        saveExam(nextAttempt);
      }
    },
    [attempt, saveExam],
  );

  const questionId = attempt === null ? undefined : currentQuestionId(attempt);
  const question = questionId === undefined ? undefined : questions?.get(questionId);

  /**
   * Option order for the current question, redrawn from the attempt's own seed.
   *
   * Mixed with the question's index so two questions do not get the same permutation, and stable
   * across reloads — otherwise a candidate who refreshes finds their answer apparently moved to a
   * different row, which reads as the app having lost it.
   */
  const options = useMemo(() => {
    if (question === undefined || attempt === null) {
      return [];
    }
    return shuffle(question.options, createSeededRng(attempt.seed + attempt.index));
  }, [question, attempt]);

  const phase: ExamPhase =
    score !== null
      ? 'finished'
      : attempt === null
        ? starting
          ? 'loading'
          : 'idle'
        : questions === null
          ? 'loading'
          : 'running';

  return {
    phase,
    scope,
    plan,
    /** The scope of an attempt running under a *different* exam, if there is one. */
    otherInProgress,
    attempt,
    question,
    options,
    score,
    history,
    remainingMs: attempt === null ? plan.durationMs : remainingMs(attempt, now),
    answered: attempt === null ? 0 : answeredCount(attempt),
    total: attempt?.questionIds.length ?? 0,
    questionNumber: (attempt?.index ?? 0) + 1,

    start,
    submit,
    abandon: abandonExam,
    select: (optionId: string) => {
      update((current) =>
        selectExamOption(
          current,
          options.map((option) => option.id),
          optionId,
          question?.multiSelect === true,
        ),
      );
    },
    toggleFlag: () => {
      update(toggleExamFlag);
    },
    goTo: (index: number) => {
      update((current) => goToQuestion(current, index));
    },
    next: () => {
      update(nextQuestion);
    },
    previous: () => {
      update(previousQuestion);
    },
  };
}

/**
 * Every question in the corpus.
 *
 * The mock exam is the one screen that genuinely needs all 28 banks — it samples across every
 * domain — so the per-objective code splitting that serves the rest of the app is simply paid for
 * here, once, behind an explicit "start" press.
 */
async function loadAllBanks(): Promise<Question[]> {
  const banks = await Promise.all(OBJECTIVES_WITH_QUESTIONS.map((id) => loadQuestions(id)));

  return banks.flat();
}

function groupByDomain(questions: readonly Question[]): Record<number, Question[]> {
  const pools: Record<number, Question[]> = {};

  for (const question of questions) {
    const domain = Number(question.objective.split('.')[0]);
    (pools[domain] ??= []).push(question);
  }

  return pools;
}
