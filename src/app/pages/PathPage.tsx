import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { ObjectiveTitle } from '@/features/path/ObjectiveTitle';
import { Badge, Card, domainAccent, ProgressRing } from '@/ui';

/**
 * The learning path: five domains, twenty-eight objectives.
 *
 * Each domain header shows its exam weight, because that is the single most useful number for
 * deciding what to revise next — domain 4 is 28% of the exam and domain 1 is 12%, and a learner
 * budgeting their last week should see that without doing arithmetic.
 */
export function PathPage() {
  const { t, i18n } = useTranslation();
  const french = i18n.language !== 'en';

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{t('page.path.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">{t('page.path.subtitle')}</p>
      </div>

      {DOMAINS.map((domain) => {
        const accent = domainAccent(domain.id);

        return (
          <section key={domain.id} className="flex flex-col gap-2">
            <header className="flex items-center gap-3 px-1">
              <ProgressRing
                value={0}
                label={t('path.domainMastery', { domain: domain.number })}
                size={44}
              >
                <span className={`text-sm font-extrabold ${accent.text}`}>{domain.id}</span>
              </ProgressRing>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-bold">
                  {french ? domain.name.fr : domain.name.en}
                </h2>
                <p lang="en" className="text-ink-secondary truncate text-xs">
                  {domain.number} · {domain.name.en}
                </p>
              </div>
              <Badge tone="info">
                {t('path.weight', { percent: Math.round(domain.weight * 100) })}
              </Badge>
            </header>

            <Card padding="none" className="divide-edge divide-y overflow-hidden">
              {domain.objectives.map((objective) => (
                <Link
                  key={objective.id}
                  to={`/objective/${objective.id}`}
                  className="hover:bg-sunken focus-visible:outline-action flex items-center gap-3 px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2"
                >
                  <span
                    className={`tabular w-8 shrink-0 text-sm font-extrabold ${accent.text}`}
                    aria-hidden
                  >
                    {objective.id}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="sr-only">{objective.id} — </span>
                    <ObjectiveTitle title={objective.title} />
                    <span className="text-ink-muted mt-1 block text-xs">
                      {t('path.topicCount', { count: objective.topics.length })}
                    </span>
                  </span>
                  <ChevronRight aria-hidden className="text-ink-muted size-4 shrink-0" />
                </Link>
              ))}
            </Card>
          </section>
        );
      })}
    </div>
  );
}
