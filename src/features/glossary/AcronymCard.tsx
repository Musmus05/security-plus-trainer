import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { Acronym } from '@/content/schemas';
import { domainOf } from '@/content/exam/sy0-701/domains';
import { cn, domainAccent, isDomainId } from '@/ui';

export interface AcronymCardProps {
  entry: Acronym;
  /** Whether to show the French comprehension gloss beneath the official expansion. */
  showGloss: boolean;
}

/**
 * One appendix entry.
 *
 * The English expansion is the primary text in both interface languages, and the French gloss sits
 * under it in a quieter tone. That ordering is ADR-0004 made visible: the exam is delivered in
 * English only, so a learner who revises the French and not the English has revised the wrong
 * thing. The gloss is an aid to understanding the English, never a substitute for it.
 */
export function AcronymCard({ entry, showGloss }: AcronymCardProps) {
  const { t } = useTranslation();

  return (
    <li className="border-edge bg-raised rounded-xl border p-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 lang="en" className="tabular text-base font-extrabold tracking-tight">
          {entry.acronym}
        </h3>
        <p lang="en" className="text-ink-secondary min-w-0 flex-1 text-sm">
          {entry.en}
        </p>
      </div>

      {showGloss && <p className="text-ink-muted mt-1 text-sm">{entry.fr}</p>}

      {entry.objectives.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-ink-muted text-xs font-semibold">{t('glossary.examinedIn')}</span>
          {entry.objectives.map((objectiveId) => {
            const domain = domainOf(objectiveId);
            const accent =
              domain !== undefined && isDomainId(domain) ? domainAccent(domain) : undefined;

            return (
              <Link
                key={objectiveId}
                to={`/objective/${objectiveId}`}
                className={cn(
                  'tabular focus-visible:outline-action rounded-full px-2 py-0.5 text-xs font-bold',
                  'focus-visible:outline-2 focus-visible:outline-offset-2',
                  // The accent is a wayfinding cue, not the label: the objective number is always
                  // written out, so the chip is readable with the colour ignored entirely.
                  accent === undefined
                    ? 'bg-sunken text-ink-secondary'
                    : cn(accent.fill, 'text-white'),
                )}
              >
                {objectiveId}
              </Link>
            );
          })}
        </div>
      )}
    </li>
  );
}
