import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { findDomain, findObjective } from '@/content/exam/sy0-701/domains';
import { LessonBody } from '@/features/lesson/LessonBody';
import { ObjectiveMastery } from '@/features/path/ObjectiveMastery';
import { Badge, ButtonLink, Card, domainAccent } from '@/ui';

/**
 * One objective.
 *
 * The lesson prose itself arrives with the domain content. What is already useful is the official
 * topic list: it is the exact scope the exam holds this objective to, so a learner can see what
 * they are expected to know even before the lesson exists.
 */
export function LessonPage() {
  const { t, i18n } = useTranslation();
  const { objectiveId } = useParams();
  const objective = objectiveId === undefined ? undefined : findObjective(objectiveId);

  if (!objective) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-start gap-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance">
          {t('lesson.unknownTitle')}
        </h1>
        <p className="text-ink-secondary">{t('lesson.unknownBody', { id: objectiveId ?? '—' })}</p>
        <ButtonLink to="/path">{t('lesson.backToPath')}</ButtonLink>
      </div>
    );
  }

  const domain = findDomain(objective.domain);
  const accent = domainAccent(objective.domain);
  const french = i18n.language !== 'en';

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6">
      <Link
        to="/path"
        className="text-ink-secondary hover:text-ink focus-visible:outline-action inline-flex w-fit items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {t('lesson.backToPath')}
      </Link>

      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`tabular text-sm font-extrabold ${accent.text}`}>{objective.id}</span>
          {domain && (
            <Badge tone="info">
              {french ? domain.name.fr : domain.name.en} ·{' '}
              {t('path.weight', { percent: Math.round(domain.weight * 100) })}
            </Badge>
          )}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {french ? objective.title.fr : objective.title.en}
        </h1>
        {french && (
          <p lang="en" className="text-ink-secondary text-sm italic">
            {objective.title.en}
          </p>
        )}
      </header>

      <ObjectiveMastery objectiveId={objective.id} />

      {/* Keyed by objective so navigating between lessons remounts rather than resetting. */}
      <LessonBody key={objective.id} objectiveId={objective.id} />

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">{t('lesson.scopeTitle')}</h2>
        <p className="text-ink-secondary text-sm">{t('lesson.scopeHelp')}</p>
        <Card padding="none" className="divide-edge divide-y overflow-hidden">
          {objective.topics.map((topic) => (
            <div key={topic} className="flex items-baseline gap-3 px-4 py-2.5">
              <span aria-hidden className={`text-xs ${accent.text}`}>
                ●
              </span>
              {/* Official English terminology, untranslated on purpose: this is the wording the
                  exam uses, and it is what has to be recognised on the day. */}
              <span lang="en" className="text-sm">
                {topic}
              </span>
            </div>
          ))}
        </Card>
      </section>
    </article>
  );
}
