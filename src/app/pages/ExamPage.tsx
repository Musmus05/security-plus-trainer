import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router';

import { EXAM_META } from '@/content/exam-meta';
import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { isDomainScope, parseScope } from '@/domain/exam';
import { ExamRunner } from '@/features/exam/ExamRunner';
import { examPlan } from '@/features/exam/useExamAttempt';
import { ButtonLink, cn, domainAccent } from '@/ui';

const DOMAIN_IDS = DOMAINS.map((domain) => domain.id);

/**
 * The full mock exam, or one domain's paper.
 *
 * One component for both, because they differ in exactly two things — which questions are drawn and
 * how long the clock runs — and both of those come from the scope. A separate page per paper would
 * be five copies of the same runner waiting to drift apart.
 */
export function ExamPage() {
  const { t, i18n } = useTranslation();
  const { scope: segment } = useParams();
  const scope = parseScope(segment, DOMAIN_IDS);

  if (scope === null) {
    // A guessed URL like /exam/9 gets an honest dead end rather than an exam of zero questions.
    return (
      <div className="mx-auto flex max-w-md flex-col items-start gap-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight">{t('exam.unknownTitle')}</h1>
        <p className="text-ink-secondary">{t('exam.unknownBody', { id: segment ?? '—' })}</p>
        <ButtonLink to="/exam">{t('exam.backToExams')}</ButtonLink>
      </div>
    );
  }

  const domain = isDomainScope(scope)
    ? DOMAINS.find((candidate) => candidate.id === scope)
    : undefined;
  const french = i18n.language !== 'en';
  const plan = examPlan(scope);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      {domain !== undefined && (
        <Link
          to="/exam"
          className="text-ink-secondary hover:text-ink focus-visible:outline-action inline-flex w-fit items-center gap-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {t('exam.backToExams')}
        </Link>
      )}

      <div>
        {domain !== undefined && (
          <p className={cn('tabular text-xs font-extrabold', domainAccent(domain.id).text)}>
            {domain.number}
          </p>
        )}
        <h1 className="text-3xl font-extrabold tracking-tight">
          {domain === undefined ? t('page.exam.title') : french ? domain.name.fr : domain.name.en}
        </h1>
        {domain !== undefined && (
          // The English domain name stays visible for the same reason objective titles do: it is
          // the exam's own index, and it is what the candidate will see on the day.
          <p lang="en" className="text-ink-secondary mt-0.5 text-sm">
            {domain.name.en}
          </p>
        )}
        <p className="text-ink-secondary mt-1 text-sm">
          {t('page.exam.subtitle', {
            questions: plan.questionCount,
            minutes: plan.durationMs / 60_000,
            passing: `${String(EXAM_META.passingScore)}/${String(EXAM_META.scoreScale.max)}`,
          })}
        </p>
      </div>

      {/* Remounted per scope, so switching papers cannot leave the previous one's state on screen. */}
      <ExamRunner key={String(scope)} scope={scope} />
    </div>
  );
}
