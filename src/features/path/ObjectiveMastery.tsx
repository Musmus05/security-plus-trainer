import { Check, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { crownsFor, MAX_CROWNS, nextCrownHint } from '@/domain/gamification';
import { toObjectiveProgress } from '@/features/dashboard/useDashboard';
import { useAppStore } from '@/lib/store/store';
import { hasQuestions } from '@/content/question-bank';
import { Badge, Button, ButtonLink, Card, cn } from '@/ui';

export interface ObjectiveMasteryProps {
  objectiveId: string;
}

/**
 * Crown state for one objective, plus the single next action that would raise it.
 *
 * Showing *what to do next* rather than only the score is the difference between a scoreboard and a
 * study aid. The hint comes from the same engine that awards the crowns, so it cannot disagree with
 * them.
 */
export function ObjectiveMastery({ objectiveId }: ObjectiveMasteryProps) {
  const { t } = useTranslation();
  const record = useAppStore((state) => state.progress[objectiveId]);
  const markLessonRead = useAppStore((state) => state.markLessonRead);

  const progress = toObjectiveProgress(record);
  const crowns = crownsFor(progress);
  const hint = nextCrownHint(progress);

  return (
    <Card className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <span className="flex items-center gap-1" aria-hidden>
          {Array.from({ length: MAX_CROWNS }, (_, index) => (
            <Crown
              key={index}
              className={cn('size-4', index < crowns ? 'text-xp' : 'text-track')}
              // The filled crowns carry no information the badge below does not repeat, so they are
              // decoration and hidden from assistive technology rather than announced five times.
              strokeWidth={2.5}
            />
          ))}
        </span>
        <Badge tone={crowns > 0 ? 'info' : 'neutral'}>
          {t('lesson.crowns', { count: crowns, max: MAX_CROWNS })}
        </Badge>
        <p className="text-ink-secondary max-w-sm text-xs">
          {hint.need === 'nothing'
            ? t('lesson.nextCrown.nothing')
            : t(`lesson.nextCrown.${hint.need}`, {
                target: Math.round((hint.target ?? 0) * 100),
              })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {progress.lessonRead ? (
          <Badge tone="good">
            <Check aria-hidden className="size-3" />
            {t('lesson.alreadyRead')}
          </Badge>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              markLessonRead(objectiveId);
            }}
          >
            {t('lesson.markRead')}
          </Button>
        )}

        {/*
          Only offered where questions exist. A "take the quiz" button that leads to "no questions
          yet" is worse than no button — it reads as a broken feature rather than unwritten content.
        */}
        {hasQuestions(objectiveId) && (
          <ButtonLink to={`/objective/${objectiveId}/quiz`}>{t('quiz.startQuiz')}</ButtonLink>
        )}
      </div>
    </Card>
  );
}
