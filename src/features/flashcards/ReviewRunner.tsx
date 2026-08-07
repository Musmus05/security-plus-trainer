import { Check, RotateCcw, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { GRADES, type Grade } from '@/domain/srs';
import { Badge, Button, Card, cn, ProgressBar } from '@/ui';

import { useReviewSession } from './useReviewSession';

/**
 * Grade buttons.
 *
 * "Again" is visually separated from the other three because it is the only one that keeps the card
 * in the queue — the learner is telling the app they forgot, not scoring themselves badly, and the
 * two feel different. It is deliberately not styled as a failure state: forgetting is the thing
 * spaced repetition is built around, and a red button that reads as punishment makes learners lie.
 */
const GRADE_STYLE: Record<Grade, string> = {
  again: 'border-edge-strong text-ink bg-raised',
  hard: 'border-edge-strong text-ink bg-raised',
  good: 'border-transparent bg-action text-white',
  easy: 'border-transparent bg-good text-white',
};

export function ReviewRunner() {
  const { t } = useTranslation();

  const review = useReviewSession();

  if (review.phase === 'idle') {
    return (
      <Card className="flex flex-col gap-5 text-center">
        <div>
          <p className="text-ink-secondary text-sm">{t('flashcards.deckName')}</p>
          <p className="tabular mt-1 text-5xl font-extrabold tracking-tight">
            {review.due}
            <span className="text-ink-muted text-2xl">/{review.deckSize}</span>
          </p>
          <p className="text-ink-secondary mt-2 text-sm">
            {t('flashcards.dueSummary', { count: review.due })}
          </p>
        </div>

        {review.due === 0 ? (
          <p className="text-ink-muted text-sm">{t('flashcards.allCaughtUp')}</p>
        ) : (
          <Button onClick={review.start}>{t('flashcards.start')}</Button>
        )}
      </Card>
    );
  }

  if (review.phase === 'finished') {
    return (
      <Card className="flex flex-col items-center gap-4 text-center">
        <span className="bg-good-wash text-good-text grid size-14 place-items-center rounded-full">
          <Check aria-hidden className="size-7" strokeWidth={3} />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">{t('flashcards.doneTitle')}</h2>
          <p className="text-ink-secondary mt-1 text-sm">
            {t('flashcards.doneBody', { count: review.completed })}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={review.finish}>{t('flashcards.backToDeck')}</Button>
        </div>
      </Card>
    );
  }

  const { card } = review;
  if (card === undefined) {
    return null;
  }

  // The bar measures cards *finished*, not the queue length: a card graded "again" goes back into
  // the queue, so a bar driven by what is left would run backwards and read as a bug.
  const total = review.completed + review.remaining;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <ProgressBar
          value={total === 0 ? 0 : review.completed / total}
          label={t('flashcards.progress', { done: review.completed, total })}
          className="flex-1"
        />
        <span className="tabular text-ink-secondary text-sm font-semibold">
          {review.completed}/{total}
        </span>
      </div>

      <Card className="flex min-h-64 flex-col items-center justify-center gap-6 text-center">
        <div>
          <p className="text-ink-muted text-xs font-bold tracking-widest uppercase">
            {t('flashcards.promptLabel')}
          </p>
          <p lang="en" className="mt-2 text-4xl font-extrabold tracking-tight">
            {card.prompt}
          </p>
        </div>

        {review.revealed ? (
          <div className="border-edge w-full border-t pt-5">
            <p className="text-ink-muted text-xs font-bold tracking-widest uppercase">
              {t('flashcards.answerLabel')}
            </p>
            <p lang="en" className="mt-2 text-xl font-bold">
              {card.answer}
            </p>
            <p className="text-ink-secondary mt-1 text-sm">{card.gloss}</p>

            {card.objectives.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {card.objectives.map((objectiveId) => (
                  <Link key={objectiveId} to={`/objective/${objectiveId}`}>
                    <Badge tone="info">
                      <Sparkles aria-hidden className="size-3" />
                      {objectiveId}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Button variant="secondary" onClick={review.reveal}>
            {t('flashcards.reveal')}
          </Button>
        )}
      </Card>

      {review.revealed && (
        <div
          role="group"
          aria-label={t('flashcards.gradeLabel')}
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {GRADES.map((grade) => (
            <button
              key={grade}
              type="button"
              onClick={() => {
                review.answer(grade);
              }}
              className={cn(
                'focus-visible:outline-action rounded-xl border-2 px-3 py-3 text-sm font-bold',
                'focus-visible:outline-2 focus-visible:outline-offset-2',
                'motion-safe:active:translate-y-0.5',
                GRADE_STYLE[grade],
              )}
            >
              {grade === 'again' && <RotateCcw aria-hidden className="mr-1 inline size-3.5" />}
              {t(`flashcards.grade.${grade}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
