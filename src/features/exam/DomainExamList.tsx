import { ChevronRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { DOMAINS } from '@/content/exam/sy0-701/domains';
import type { ExamResultRecord } from '@/lib/store/progress.schema';
import { Badge, cn, domainAccent } from '@/ui';

import { examPlan } from './useExamAttempt';

export interface DomainExamListProps {
  history: readonly ExamResultRecord[];
}

/**
 * One exam paper per domain, alongside the full mock.
 *
 * A full mock costs ninety minutes, and ninety minutes is a commitment nobody makes on a weekday
 * evening — so revising domain 4 alone should not require sitting the other four. Each paper draws
 * exactly the number of questions that domain contributes to the real exam, on the real exam's own
 * minute-per-question budget, so the pressure is the same slice rather than an invented one.
 */
export function DomainExamList({ history }: DomainExamListProps) {
  const { t, i18n } = useTranslation();
  const french = i18n.language !== 'en';

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-bold">{t('exam.byDomainExamsTitle')}</h2>
        <p className="text-ink-secondary mt-0.5 text-sm">{t('exam.byDomainExamsHelp')}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {DOMAINS.map((domain) => {
          const plan = examPlan(domain.id);
          const accent = domainAccent(domain.id);
          // The most recent attempt at *this* paper. The full mock is a different exam and its
          // score would be a different thing entirely.
          const last = history.find((entry) => entry.scope === domain.id);

          return (
            <li key={domain.id}>
              <Link
                to={`/exam/${String(domain.id)}`}
                /*
                 * Named explicitly, because the number badge is decorative and hidden. Without
                 * this the link announces as "General Security Concepts, General Security
                 * Concepts, 11 questions" — the domain *number*, which is how the exam itself
                 * identifies its domains, would never be read out.
                 */
                aria-label={t('exam.domainExamLabel', {
                  number: domain.number,
                  name: french ? domain.name.fr : domain.name.en,
                  questions: plan.questionCount,
                  minutes: plan.durationMs / 60_000,
                })}
                className="border-edge bg-raised hover:bg-sunken focus-visible:outline-action flex items-center gap-3 rounded-xl border p-4 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span
                  aria-hidden
                  className={cn(
                    'tabular grid size-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold text-white',
                    accent.fill,
                  )}
                >
                  {domain.id}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">
                    {french ? domain.name.fr : domain.name.en}
                  </span>
                  <span lang="en" className="text-ink-secondary block truncate text-xs">
                    {domain.name.en}
                  </span>
                  <span className="text-ink-muted mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span>{t('exam.questionCount', { count: plan.questionCount })}</span>
                    <span aria-hidden>·</span>
                    <span className="flex items-center gap-1">
                      <Clock aria-hidden className="size-3" />
                      {t('exam.minuteCount', { count: plan.durationMs / 60_000 })}
                    </span>
                  </span>
                </span>

                {last !== undefined && (
                  <Badge tone={last.passed ? 'good' : 'critical'} className="shrink-0">
                    {last.correct}/{last.total}
                  </Badge>
                )}
                <ChevronRight aria-hidden className="text-ink-muted size-4 shrink-0" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
