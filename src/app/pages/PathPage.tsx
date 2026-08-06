import { BookOpen, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { hasLesson } from '@/content/lesson-bank';
import { crownsFor } from '@/domain/gamification';
import { toObjectiveProgress, useDashboard } from '@/features/dashboard/useDashboard';
import { PathNode } from '@/features/path/PathNode';
import { useAppStore } from '@/lib/store/store';
import { Badge, Card, cn, domainAccent, ProgressBar } from '@/ui';

/** Repeating zig-zag, so the trail winds rather than running straight down. */
const OFFSETS = [0, 1, 0, -1] as const;

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

            {/*
              The trail. A vertical rule behind the nodes connects them into a route; a flat list of
              28 rows reads as a backlog, and a route reads as something with a position on it.
            */}
            <div className="relative flex flex-col items-center gap-7 py-1">
              <span
                aria-hidden
                className="bg-track absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full"
              />
              {domain.objectives.map((objective, index) => (
                <div key={objective.id} className="relative z-10 flex w-full flex-col items-center">
                  <PathNode
                    objectiveId={objective.id}
                    domain={domain.id}
                    crowns={crownsFor(toObjectiveProgress(progress[objective.id]))}
                    isNext={dashboard.nextUp.objectiveId === objective.id}
                    offset={OFFSETS[index % OFFSETS.length] ?? 0}
                    label={`${objective.id} — ${french ? objective.title.fr : objective.title.en}`}
                  />
                  <p className="text-ink-secondary mt-2 max-w-[22rem] px-2 text-center text-xs leading-snug">
                    {french ? objective.title.fr : objective.title.en}
                  </p>
                  {hasLesson(objective.id, locale) && (
                    <Badge className="mt-1.5">
                      <BookOpen aria-hidden className="size-3" />
                      {t('path.lessonAvailable')}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
