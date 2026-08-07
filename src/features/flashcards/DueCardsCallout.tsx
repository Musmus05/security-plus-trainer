import { Layers } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { dueCount } from '@/domain/srs';
import { createSystemClock } from '@/lib/clock';
import { useAppStore } from '@/lib/store/store';
import { ButtonLink, Card } from '@/ui';

import { ACRONYM_CARD_IDS } from './decks';

/**
 * Due-card prompt for the dashboard.
 *
 * Renders nothing when the queue is empty. A permanent "0 cards due" tile trains the learner to
 * stop reading that part of the screen, which costs the prompt its only job on the day it matters.
 */
export function DueCardsCallout() {
  const { t } = useTranslation();
  const srs = useAppStore((state) => state.srs);

  const today = useMemo(() => createSystemClock().localDayKey(), []);
  const due = useMemo(() => dueCount(ACRONYM_CARD_IDS, srs, today), [srs, today]);

  if (due === 0) {
    return null;
  }

  return (
    <Card className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="bg-info-wash text-info-text grid size-10 shrink-0 place-items-center rounded-xl">
          <Layers aria-hidden className="size-5" />
        </span>
        <div className="min-w-0">
          <span className="text-ink-secondary text-xs font-bold tracking-wider uppercase">
            {t('dashboard.reviewDue')}
          </span>
          <p className="mt-0.5 font-semibold">{t('flashcards.dueSummary', { count: due })}</p>
        </div>
      </div>
      <ButtonLink to="/flashcards">{t('flashcards.start')}</ButtonLink>
    </Card>
  );
}
