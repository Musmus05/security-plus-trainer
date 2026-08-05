import { Flame, Star, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { EXAM_META } from '@/content/exam-meta';
import { useAppStore } from '@/lib/store/store';
import { Badge, Card, DOMAIN_IDS, ProgressBar, ProgressRing, StatTile } from '@/ui';

/**
 * The dashboard shell.
 *
 * The figures are zeroes rather than invented samples: a dashboard showing a fake 7-day streak is
 * indistinguishable from a broken one, and a reviewer cannot tell whether the wiring works. The
 * gamification engine fills these in.
 */
export function DashboardPage() {
  const { t } = useTranslation();
  const dailyGoalXp = useAppStore((state) => state.settings.dailyGoalXp);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{t('page.dashboard.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">
          {t('app.tagline', { code: EXAM_META.code })}
        </p>
      </div>

      <Card raised className="flex flex-wrap items-center gap-x-10 gap-y-5">
        <StatTile
          label={t('topbar.streak')}
          value={<span className="tabular">{t('topbar.streakDays', { count: 0 })}</span>}
          icon={<Flame aria-hidden className="text-streak size-3.5" />}
        />
        <StatTile
          label={t('topbar.xp')}
          value={<span className="tabular">0</span>}
          icon={<Star aria-hidden className="text-xp size-3.5" />}
        />
        <StatTile
          label={t('topbar.dailyGoal')}
          value={<span className="tabular">{`0 / ${String(dailyGoalXp)}`}</span>}
          icon={<Target aria-hidden className="text-ink-muted size-3.5" />}
          detail={t('topbar.dailyGoalProgress', { earned: 0, goal: dailyGoalXp })}
        />
        <div className="min-w-52 flex-1">
          <ProgressBar value={0} label={t('topbar.dailyGoal')} />
        </div>
      </Card>

      <Card className="flex flex-wrap justify-around gap-6">
        {DOMAIN_IDS.map((id) => (
          <div key={id} className="flex flex-col items-center gap-2">
            <ProgressRing value={0} label={`Domain ${String(id)}`} size={72}>
              <span className="tabular text-base font-extrabold">{id}</span>
            </ProgressRing>
            <Badge>0%</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
