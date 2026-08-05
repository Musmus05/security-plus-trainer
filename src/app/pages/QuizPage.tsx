import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { findObjective } from '@/content/exam/sy0-701/domains';
import { QuizRunner } from '@/features/quiz/QuizRunner';
import { ButtonLink } from '@/ui';

export function QuizPage() {
  const { t, i18n } = useTranslation();
  const { objectiveId } = useParams();
  const objective = objectiveId === undefined ? undefined : findObjective(objectiveId);

  if (!objective) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-start gap-4 py-12">
        <h1 className="text-2xl font-extrabold tracking-tight">{t('lesson.unknownTitle')}</h1>
        <ButtonLink to="/path">{t('lesson.backToPath')}</ButtonLink>
      </div>
    );
  }

  const title = i18n.language === 'en' ? objective.title.en : objective.title.fr;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-5">
      <Link
        to={`/objective/${objective.id}`}
        className="text-ink-secondary hover:text-ink focus-visible:outline-action inline-flex w-fit items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {t('quiz.backToObjective')}
      </Link>

      <h1 className="text-xl font-extrabold tracking-tight">
        <span className="tabular">{objective.id}</span> — {title}
      </h1>

      {/*
        Keyed by objective so navigating between quizzes remounts rather than resetting. Without it
        the hook would have to clear five pieces of state from an effect, and a frame of the previous
        quiz would show through.
      */}
      <QuizRunner key={objective.id} objective={objective} />
    </div>
  );
}
