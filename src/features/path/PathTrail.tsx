import { useTranslation } from 'react-i18next';

import { hasLesson } from '@/content/lesson-bank';
import type { DomainId, Objective } from '@/content/schemas';
import { cn, domainAccent } from '@/ui';

import { PathNode } from './PathNode';
import { labelSide, NODE_SIZE, trailHeight, trailPath, trailPoints } from './trail-geometry';

export interface PathTrailProps {
  objectives: readonly Objective[];
  domain: DomainId;
  crownsFor: (objectiveId: string) => number;
  nextObjectiveId: string | undefined;
  /** Interface locale, for lesson availability and titles. */
  french: boolean;
  locale: 'en' | 'fr';
}

/**
 * The trail is a fixed-width column, drawn 1:1.
 *
 * An earlier version scaled a 320-wide viewBox to the container with `preserveAspectRatio="none"`,
 * which stretches the stroke horizontally — the connector rendered as a fat, lopsided band instead
 * of an even line. At 1:1 the stroke keeps its width and the nodes land exactly on the curve.
 * Labels are positioned beside the nodes and are free to overflow the column.
 */
const TRAIL_WIDTH = 320;
const CENTRE_X = TRAIL_WIDTH / 2;

/**
 * One domain's objectives as a connected trail.
 *
 * The connector is an SVG curve computed from the node positions rather than a straight rule drawn
 * behind them, which is what made the earlier version look broken: offset nodes floated away from a
 * line that ran straight down the middle, so nothing appeared connected.
 *
 * The travelled part of the curve is drawn in the domain's accent up to the furthest objective with
 * any progress, so the trail shows how far along the domain you are at a glance.
 */
export function PathTrail({
  objectives,
  domain,
  crownsFor,
  nextObjectiveId,
  french,
  locale,
}: PathTrailProps) {
  const { t } = useTranslation();
  const accent = domainAccent(domain);

  const points = trailPoints(objectives.length, CENTRE_X);
  const height = trailHeight(objectives.length);

  // The furthest node with progress, so the coloured segment stops where the learner did.
  const lastStarted = objectives.reduce(
    (furthest, objective, index) => (crownsFor(objective.id) > 0 ? index : furthest),
    -1,
  );
  const travelled = lastStarted > 0 ? trailPath(points.slice(0, lastStarted + 1)) : '';

  return (
    <div className="relative mx-auto" style={{ width: TRAIL_WIDTH, height }}>
      <svg
        aria-hidden
        width={TRAIL_WIDTH}
        height={height}
        viewBox={`0 0 ${String(TRAIL_WIDTH)} ${String(height)}`}
        className="absolute inset-0"
      >
        <path
          d={trailPath(points)}
          fill="none"
          stroke="var(--sp-track)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {travelled !== '' && (
          <path
            d={travelled}
            fill="none"
            stroke="currentColor"
            strokeWidth={10}
            strokeLinecap="round"
            className={accent.text}
          />
        )}
      </svg>

      {objectives.map((objective, index) => {
        const point = points[index];
        if (point === undefined) {
          return null;
        }

        const side = labelSide(index);
        const title = french ? objective.title.fr : objective.title.en;

        return (
          <div
            key={objective.id}
            className="absolute"
            style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <PathNode
                objectiveId={objective.id}
                domain={domain}
                crowns={crownsFor(objective.id)}
                isNext={nextObjectiveId === objective.id}
                label={`${objective.id} — ${title}`}
              />

              {/*
                The label sits opposite the swing so it never crosses the curve, and is hidden on
                narrow screens where there is no room beside the trail — the node's accessible name
                already carries the title for anyone who needs it.
              */}
              <div
                className={cn(
                  'absolute top-1/2 hidden w-44 -translate-y-1/2 sm:block',
                  side === 'right' ? 'left-full ml-4 text-left' : 'right-full mr-4 text-right',
                )}
              >
                <p className="text-ink text-xs leading-snug font-medium">{title}</p>
                {hasLesson(objective.id, locale) && (
                  <span className="text-ink-secondary mt-0.5 block text-[0.625rem] font-bold tracking-wider uppercase">
                    {t('path.lessonAvailable')}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <span className="sr-only">{t('path.trailLabel', { count: objectives.length })}</span>
      <span aria-hidden style={{ display: 'block', height: NODE_SIZE / 2 }} />
    </div>
  );
}
