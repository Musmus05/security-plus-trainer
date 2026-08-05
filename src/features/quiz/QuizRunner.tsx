import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Objective } from '@/content/schemas';
import { Badge, Button, ButtonLink, Card, ProgressBar } from '@/ui';

import { QuestionCard } from './QuestionCard';
import { useQuizSession } from './useQuizSession';

export interface QuizRunnerProps {
  objective: Objective;
}

/**
 * One quiz, for one objective.
 *
 * The caller mounts this with `key={objective.id}`, so navigating between objectives gives a fresh
 * component rather than a component that has to remember to reset itself. That is what lets
 * `useQuizSession` hold no reset logic at all.
 */
export function QuizRunner({ objective }: QuizRunnerProps) {
  const { t } = useTranslation();
  const quiz = useQuizSession(objective.id);

  if (quiz.phase === 'loading') {
    return <Card className="text-ink-secondary text-sm">{t('common.loading')}</Card>;
  }

  if (quiz.phase === 'empty') {
    return (
      <Card className="flex flex-col items-start gap-3">
        <p className="text-ink-secondary text-sm">{t('quiz.noQuestions')}</p>
        <ButtonLink variant="secondary" to={`/objective/${objective.id}`}>
          {t('quiz.backToObjective')}
        </ButtonLink>
      </Card>
    );
  }

  if (quiz.phase === 'finished' && quiz.result) {
    return (
      <Card raised className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-ink-secondary text-xs font-bold tracking-wider uppercase">
            {t('quiz.resultTitle')}
          </span>
          <span className="tabular text-3xl font-extrabold">
            {quiz.result.correct} / {quiz.result.total}
          </span>
          <Badge tone={quiz.result.accuracy >= 0.8 ? 'good' : 'warning'}>
            {t('quiz.accuracy', { percent: Math.round(quiz.result.accuracy * 100) })}
          </Badge>
        </div>

        <ProgressBar value={quiz.result.accuracy} label={t('quiz.accuracyLabel')} />

        <div className="flex flex-wrap gap-3">
          {quiz.result.wrongQuestionIds.length > 0 && (
            <Button onClick={quiz.retryWrong}>
              {t('quiz.retryWrong', { count: quiz.result.wrongQuestionIds.length })}
            </Button>
          )}
          <Button variant="secondary" onClick={quiz.restart}>
            <RotateCcw aria-hidden className="size-4" />
            {t('quiz.restart')}
          </Button>
          <ButtonLink variant="ghost" to={`/objective/${objective.id}`}>
            {t('quiz.backToObjective')}
          </ButtonLink>
        </div>
      </Card>
    );
  }

  if (!quiz.item) {
    return <Card className="text-ink-secondary text-sm">{t('common.loading')}</Card>;
  }

  return (
    <>
      <p className="text-ink-secondary text-sm">
        {t('quiz.progress', { current: quiz.questionNumber, total: quiz.questionCount })}
      </p>
      <ProgressBar
        value={(quiz.questionNumber - 1) / Math.max(1, quiz.questionCount)}
        label={t('quiz.progressLabel')}
        size="sm"
      />
      <QuestionCard
        item={quiz.item}
        isLast={quiz.isLast}
        onSelect={quiz.select}
        onReveal={quiz.reveal}
        onNext={quiz.next}
      />
    </>
  );
}
