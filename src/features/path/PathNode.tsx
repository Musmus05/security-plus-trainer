import { Check, Crown, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { DomainId } from '@/content/schemas';
import { MAX_CROWNS } from '@/domain/gamification';
import { cn, domainAccent } from '@/ui';

export interface PathNodeProps {
  objectiveId: string;
  crowns: number;
  /** The single objective the dashboard is currently pointing at. */
  isNext: boolean;
  domain: DomainId;
  label: string;
}

/**
 * One objective on the learning path, as a circular node on a winding trail.
 *
 * The zig-zag is not decoration for its own sake: a flat list of 28 rows reads as a backlog, and a
 * trail reads as a route with a position on it. That difference is most of what makes a path feel
 * worth continuing, which is the whole point of the gamified direction.
 *
 * Everything a learner needs is on the node itself — the objective number, the crown count, and a
 * ring that fills as crowns are earned. Colour never carries meaning alone (ADR-0006): the number is
 * always there.
 */
export function PathNode({ objectiveId, crowns, isNext, domain, label }: PathNodeProps) {
  const { t } = useTranslation();
  const accent = domainAccent(domain);
  const complete = crowns >= MAX_CROWNS;
  const started = crowns > 0;

  return (
    <div className="relative flex justify-center">
      <Link
        to={`/objective/${objectiveId}`}
        aria-label={label}
        className={cn(
          'group focus-visible:outline-action relative grid size-[4.25rem] place-items-center rounded-full',
          'transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-offset-4',
          'motion-safe:hover:-translate-y-1 motion-safe:active:translate-y-0.5',
          // The inset bottom edge is what makes a node feel like a physical button to press.
          complete
            ? 'bg-good text-white shadow-[inset_0_-5px_0_0_rgb(0_0_0/0.25)]'
            : started
              ? cn(accent.bg, 'text-white shadow-[inset_0_-5px_0_0_rgb(0_0_0/0.25)]')
              : // Outlined, not filled grey. A column of flat grey circles reads as a dead backlog;
                // an outline in the domain's own colour reads as a stage not yet reached. The text
                // tone is used rather than the mark tone, because the number has to be readable.
                cn('bg-surface border-[3px]', accent.border, accent.text),
        )}
      >
        {complete ? (
          <Check aria-hidden className="size-7" strokeWidth={3.5} />
        ) : (
          <span aria-hidden className="tabular text-lg font-extrabold">
            {objectiveId}
          </span>
        )}

        {/* Crown pips, so progress is legible at a glance without reading a number. */}
        {started && !complete && (
          <span
            aria-hidden
            className="bg-surface border-edge absolute -bottom-1.5 flex items-center gap-0.5 rounded-full border px-1.5 py-0.5"
          >
            {Array.from({ length: MAX_CROWNS }, (_, index) => (
              <Crown
                key={index}
                className={cn('size-2', index < crowns ? 'text-xp' : 'text-track')}
                strokeWidth={3}
              />
            ))}
          </span>
        )}

        {/* The one node the dashboard is pointing at gets a pulse, so "where was I" is answered. */}
        {isNext && (
          <span
            aria-hidden
            className="ring-action absolute inset-0 rounded-full ring-4 ring-offset-2 ring-offset-transparent motion-safe:animate-pulse"
          />
        )}
      </Link>

      {isNext && (
        <span
          aria-hidden
          // `text-info-text`, not `text-action`: the action tone is a *fill* meant to carry white text on
          // top of it, and as text itself it is only 3.23:1 on the dark surface. The border may use it,
          // because a non-text UI boundary needs 3:1 rather than 4.5:1.
          className="text-info-text bg-surface border-action absolute -top-3 flex items-center gap-1 rounded-full border-2 px-2 py-0.5 text-[0.625rem] font-extrabold tracking-wider uppercase"
        >
          <Sparkles className="size-2.5" />
          {t('path.youAreHere')}
        </span>
      )}
    </div>
  );
}
