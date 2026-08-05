import { useTranslation } from 'react-i18next';

import { addDays } from '@/domain/day-key';
import type { DailyLedger } from '@/domain/gamification';
import { cn } from '@/ui';

import { bucket, HEAT_LEVELS, type HeatLevel } from './heat-bucket';

export interface ActivityHeatmapProps {
  ledger: DailyLedger;
  /** The learner's local today, so the grid ends on the right day in their timezone. */
  today: string;
  /** Daily XP goal, used to scale the buckets against something meaningful. */
  dailyGoalXp: number;
  weeks?: number;
}

/**
 * Daily XP as a calendar heatmap.
 *
 * Magnitude, so it uses the single sequential ramp rather than a categorical palette — and the ramp
 * *inverts* between themes, because on a light surface more XP should read as darker and on a dark
 * surface as lighter. `tokens.test.ts` asserts that inversion; getting it backwards in one theme is
 * invisible until someone switches.
 *
 * The buckets are scaled to the learner's own goal rather than to fixed XP numbers. A learner with a
 * 50 XP goal and one with a 250 XP goal should both see a full cell for a good day.
 */
export function ActivityHeatmap({ ledger, today, dailyGoalXp, weeks = 26 }: ActivityHeatmapProps) {
  const { t, i18n } = useTranslation();
  const days = weeks * 7;

  // Wind back to the most recent Monday so the columns line up as weeks.
  const weekdayOfToday = (new Date(`${today}T00:00:00Z`).getUTCDay() + 6) % 7;
  const lastDay = addDays(today, 6 - weekdayOfToday);
  const firstDay = addDays(lastDay, -(days - 1));

  const cells = Array.from({ length: days }, (_, index) => {
    const day = addDays(firstDay, index);
    const xp = ledger[day] ?? 0;
    return { day, xp, future: day > today, level: bucket(xp, dailyGoalXp) };
  });

  const formatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: 'long' });

  return (
    <div className="flex flex-col gap-2">
      <div
        className="grid grid-flow-col grid-rows-7 gap-[3px]"
        role="img"
        aria-label={t('dashboard.heatmapLabel', { weeks })}
      >
        {cells.map(({ day, xp, future, level }) => (
          <div
            key={day}
            // A native title is the whole tooltip here: a custom one would need focus management
            // and a live region for 182 cells, and the summary table below already carries the
            // information for anyone not using a pointer.
            title={
              future
                ? undefined
                : t('dashboard.heatmapCell', {
                    date: formatter.format(new Date(`${day}T12:00:00`)),
                    xp,
                  })
            }
            className={cn('size-[11px] rounded-[3px]', future ? 'opacity-0' : LEVEL_CLASS[level])}
          />
        ))}
      </div>

      <div className="text-ink-secondary flex items-center gap-1.5 text-xs">
        <span>{t('dashboard.heatmapLess')}</span>
        {HEAT_LEVELS.map((level) => (
          <span key={level} className={cn('size-[11px] rounded-[3px]', LEVEL_CLASS[level])} />
        ))}
        <span>{t('dashboard.heatmapMore')}</span>
      </div>
    </div>
  );
}

const LEVEL_CLASS: Record<HeatLevel, string> = {
  0: 'bg-track',
  1: 'bg-heat-1',
  2: 'bg-heat-2',
  3: 'bg-heat-3',
  4: 'bg-heat-4',
} as const;
