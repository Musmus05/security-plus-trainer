import { AlertTriangle, ChevronLeft, ChevronRight, Clock, Flag } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EXAM_META } from '@/content/exam-meta';
import { formatRemaining, isAnswered, isFlagged } from '@/domain/exam';
import { Badge, Button, Card, cn, ProgressBar } from '@/ui';

import { ExamQuestion } from './ExamQuestion';
import { ExamResult } from './ExamResult';
import { ExamStart } from './ExamStart';
import { useExamAttempt } from './useExamAttempt';

/** Below this the clock turns urgent. Five minutes is enough to revisit the flagged items. */
const URGENT_MS = 5 * 60 * 1000;

export function ExamRunner() {
  const { t } = useTranslation();
  const exam = useExamAttempt();
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);

  if (exam.phase === 'finished' && exam.score !== null) {
    return <ExamResult score={exam.score} onRestart={exam.start} />;
  }

  if (exam.phase === 'idle' || exam.phase === 'loading') {
    return (
      <ExamStart loading={exam.phase === 'loading'} onStart={exam.start} history={exam.history} />
    );
  }

  const { attempt, question } = exam;
  if (attempt === null || question === undefined) {
    return null;
  }

  const urgent = exam.remainingMs <= URGENT_MS;
  const unanswered = exam.total - exam.answered;

  return (
    <div className="flex flex-col gap-5">
      {/*
        The clock is `aria-live="off"` and marked as a timer. A live region ticking once a second
        would make the screen reader unusable — the candidate cannot hear the question over their
        own countdown. The urgent threshold is announced once instead, below.
      */}
      <div className="border-edge bg-raised sticky top-0 z-20 flex flex-wrap items-center gap-3 rounded-xl border p-3">
        <span
          role="timer"
          aria-live="off"
          aria-label={t('exam.timeRemaining')}
          className={cn(
            'tabular flex items-center gap-1.5 text-lg font-extrabold',
            urgent ? 'text-critical-text' : 'text-ink',
          )}
        >
          <Clock aria-hidden className="size-4" />
          {formatRemaining(exam.remainingMs)}
        </span>

        <div className="flex min-w-32 flex-1 flex-col gap-1">
          <ProgressBar
            value={exam.total === 0 ? 0 : exam.answered / exam.total}
            label={t('exam.answeredOf', { done: exam.answered, total: exam.total })}
            size="sm"
          />
          <span className="tabular text-ink-secondary text-xs">
            {t('exam.answeredOf', { done: exam.answered, total: exam.total })}
          </span>
        </div>

        <Button
          size="sm"
          onClick={() => {
            setConfirmingSubmit(true);
          }}
        >
          {t('exam.submit')}
        </Button>
      </div>

      {urgent && (
        <p
          role="alert"
          className="bg-critical-wash text-critical-text rounded-xl px-4 py-2 text-sm font-semibold"
        >
          {t('exam.fiveMinutesLeft')}
        </p>
      )}

      <p className="tabular text-ink-secondary text-sm font-semibold">
        {t('exam.questionOf', { number: exam.questionNumber, total: exam.total })}
      </p>

      <ExamQuestion
        question={question}
        options={exam.options}
        selected={attempt.answers[question.id] ?? []}
        flagged={isFlagged(attempt, question.id)}
        onSelect={exam.select}
        onToggleFlag={exam.toggleFlag}
      />

      <div className="flex items-center justify-between gap-3">
        <Button variant="secondary" onClick={exam.previous} disabled={attempt.index === 0}>
          <ChevronLeft aria-hidden className="size-4" />
          {t('exam.previous')}
        </Button>
        <Button variant="secondary" onClick={exam.next} disabled={attempt.index >= exam.total - 1}>
          {t('exam.next')}
          <ChevronRight aria-hidden className="size-4" />
        </Button>
      </div>

      {/*
        The review grid. Free navigation is what makes flags useful, and 90 numbered buttons is the
        control the real exam gives you — a "next only" flow would train the wrong habit.
      */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-bold">{t('exam.reviewGrid')}</h2>
        <Card padding="sm">
          <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12">
            {attempt.questionIds.map((id, index) => {
              const answered = isAnswered(attempt, id);
              const flag = isFlagged(attempt, id);
              const current = index === attempt.index;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    exam.goTo(index);
                  }}
                  aria-current={current ? 'true' : undefined}
                  aria-label={t('exam.goToQuestion', {
                    number: index + 1,
                    state: t(
                      flag
                        ? 'exam.stateFlagged'
                        : answered
                          ? 'exam.stateAnswered'
                          : 'exam.stateBlank',
                    ),
                  })}
                  className={cn(
                    'tabular focus-visible:outline-action relative grid h-8 place-items-center rounded-lg border-2 text-xs font-bold',
                    'focus-visible:outline-2 focus-visible:outline-offset-1',
                    current
                      ? 'border-action bg-action text-white'
                      : answered
                        ? 'bg-info-wash text-info-text border-transparent'
                        : 'border-edge bg-surface text-ink-muted',
                  )}
                >
                  {index + 1}
                  {/* Flags carry an icon as well as a colour — a flagged answered item and a
                      flagged blank one must be distinguishable without relying on hue. */}
                  {flag && (
                    <Flag
                      aria-hidden
                      className="text-warning-text absolute -top-1 -right-1 size-3 fill-current"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Card>
      </section>

      {confirmingSubmit && (
        <Card raised className="border-warning border-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle aria-hidden className="text-warning-text mt-0.5 size-5 shrink-0" />
              <div>
                <h2 className="font-bold">{t('exam.confirmSubmitTitle')}</h2>
                <p className="text-ink-secondary mt-1 text-sm">
                  {unanswered > 0
                    ? t('exam.confirmSubmitUnanswered', { count: unanswered })
                    : t('exam.confirmSubmitAll')}
                </p>
                {attempt.flagged.length > 0 && (
                  <Badge tone="warning" className="mt-2">
                    {t('exam.flaggedCount', { count: attempt.flagged.length })}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setConfirmingSubmit(false);
                }}
              >
                {t('common.cancel')}
              </Button>
              <Button onClick={exam.submit}>{t('exam.submitConfirm')}</Button>
            </div>
          </div>
        </Card>
      )}

      <p className="text-ink-muted text-center text-xs">
        {t('exam.disclaimer', {
          passing: EXAM_META.passingScore,
          min: EXAM_META.scoreScale.min,
          max: EXAM_META.scoreScale.max,
        })}
      </p>
    </div>
  );
}
