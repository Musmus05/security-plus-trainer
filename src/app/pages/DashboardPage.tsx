import { Flame, Star, Target, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { ActivityHeatmap } from '@/features/dashboard/ActivityHeatmap';
import { useDashboard } from '@/features/dashboard/useDashboard';
import { Badge, ButtonLink, Card, domainAccent, ProgressBar, ProgressRing, StatTile } from '@/ui';

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  const dashboard = useDashboard();
  const french = i18n.language !== 'en';

  const nextObjective = DOMAINS.flatMap((domain) => domain.objectives).find(
    (objective) => objective.id === dashboard.nextUp.objectiveId,
  );

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{t('page.dashboard.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">
          {t('dashboard.rank', { rank: dashboard.rank, level: dashboard.level.level })}
        </p>
      </div>

      <Card raised className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          <StatTile
            label={t('topbar.streak')}
            value={
              <span className="tabular">
                {t('topbar.streakDays', { count: dashboard.streak.current })}
              </span>
            }
            icon={
              <Flame
                aria-hidden
                className={
                  dashboard.streakAlive ? 'text-streak size-3.5' : 'text-ink-muted size-3.5'
                }
              />
            }
            detail={t('dashboard.longestStreak', { count: dashboard.streak.longest })}
          />
          <StatTile
            label={t('topbar.xp')}
            value={
              <span className="tabular">{dashboard.totalXp.toLocaleString(i18n.language)}</span>
            }
            icon={<Star aria-hidden className="text-xp size-3.5" />}
            detail={t('dashboard.xpToNext', { xp: dashboard.level.xpToNextLevel })}
          />
          <StatTile
            label={t('topbar.dailyGoal')}
            value={
              <span className="tabular">{`${String(dashboard.xpToday)} / ${String(dashboard.dailyGoalXp)}`}</span>
            }
            icon={<Target aria-hidden className="text-ink-muted size-3.5" />}
            detail={
              dashboard.goalMet
                ? t('dashboard.goalMet')
                : t('dashboard.goalRemaining', { xp: dashboard.dailyGoalXp - dashboard.xpToday })
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <ProgressBar value={dashboard.goalFraction} label={t('topbar.dailyGoal')} />
          <span className="text-ink-secondary text-xs">
            {t('topbar.level', { level: dashboard.level.level })} ·{' '}
            {t('dashboard.levelProgress', {
              into: dashboard.level.xpIntoLevel,
              span: dashboard.level.xpForLevel,
            })}
          </span>
        </div>
      </Card>

      {nextObjective && (
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <span className="text-ink-secondary text-xs font-bold tracking-wider uppercase">
              {t(`dashboard.next.${dashboard.nextUp.reason}`)}
            </span>
            <p className="mt-1 font-semibold">
              <span className="tabular">{nextObjective.id}</span>{' '}
              {french ? nextObjective.title.fr : nextObjective.title.en}
            </p>
          </div>
          <ButtonLink to={`/objective/${nextObjective.id}`}>{t('common.continue')}</ButtonLink>
        </Card>
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{t('dashboard.masteryTitle')}</h2>
        <Card className="flex flex-wrap justify-around gap-6">
          {dashboard.domains.map((domain) => (
            <div key={domain.id} className="flex flex-col items-center gap-2">
              <ProgressRing
                value={domain.mastery}
                label={t('path.domainMastery', { domain: domain.number })}
                size={76}
              >
                <span className={`tabular text-lg font-extrabold ${domainAccent(domain.id).text}`}>
                  {domain.id}
                </span>
              </ProgressRing>
              <Badge tone={domain.mastery > 0 ? 'info' : 'neutral'}>
                <Trophy aria-hidden className="size-3" />
                <span className="tabular">{`${String(domain.crowns)}/${String(domain.maxCrowns)}`}</span>
              </Badge>
            </div>
          ))}
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{t('dashboard.activityTitle')}</h2>
        {/* Focusable for the same reason as the lesson tables: a scroll region that cannot be
            focused is unreachable by keyboard. */}
        <Card
          tabIndex={0}
          className="focus-visible:outline-action overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ActivityHeatmap
            ledger={dashboard.ledger}
            today={dashboard.today}
            dailyGoalXp={dashboard.dailyGoalXp}
          />
        </Card>
      </section>
    </div>
  );
}
