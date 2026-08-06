import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { crownsFor } from '@/domain/gamification';
import { toObjectiveProgress, useDashboard } from '@/features/dashboard/useDashboard';
import { PathTrail } from '@/features/path/PathTrail';
import { useAppStore } from '@/lib/store/store';
import { Badge, Card, cn, domainAccent, ProgressBar } from '@/ui';

export function PathPage() {
  const { t, i18n } = useTranslation();
  const dashboard = useDashboard();
  const progress = useAppStore((state) => state.progress);
  const locale = useAppStore((state) => state.settings.locale);
  const french = i18n.language !== 'en';

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('page.path.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">{t('page.path.subtitle')}</p>
      </div>

      {DOMAINS.map((domain) => {
        const accent = domainAccent(domain.id);
        const summary = dashboard.domains.find((entry) => entry.id === domain.id);

        return (
          <section key={domain.id} className="flex flex-col gap-6">
            <Card padding="none" raised className="overflow-hidden">
              {/*
                A solid accent strip rather than a barely-visible gradient. It makes each domain
                recognisable while scrolling, and it costs no contrast because no text sits on it —
                which is what keeps it compatible with ADR-0006's rule on domain colour.
              */}
              <div aria-hidden className={cn('h-2', accent.bg)} />

              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className={cn('tabular text-xs font-extrabold', accent.text)}>
                      {domain.number}
                    </p>
                    <h2 className="text-lg font-extrabold tracking-tight">
                      {french ? domain.name.fr : domain.name.en}
                    </h2>
                    <p lang="en" className="text-ink-secondary mt-0.5 truncate text-xs">
                      {domain.name.en}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <Badge tone="info">
                      {t('path.weight', { percent: Math.round(domain.weight * 100) })}
                    </Badge>
                    {summary && (
                      <Badge tone={summary.crowns > 0 ? 'good' : 'neutral'}>
                        <Trophy aria-hidden className="size-3" />
                        <span className="tabular">
                          {`${String(summary.crowns)}/${String(summary.maxCrowns)}`}
                        </span>
                      </Badge>
                    )}
                  </div>
                </div>
                {summary && (
                  <div className="mt-3.5">
                    <ProgressBar
                      value={summary.mastery}
                      label={t('path.domainMastery', { domain: domain.number })}
                      size="sm"
                    />
                  </div>
                )}
              </div>
            </Card>

            <PathTrail
              objectives={domain.objectives}
              domain={domain.id}
              crownsFor={(objectiveId) => crownsFor(toObjectiveProgress(progress[objectiveId]))}
              nextObjectiveId={dashboard.nextUp.objectiveId}
              french={french}
              locale={locale}
            />
          </section>
        );
      })}
    </div>
  );
}
