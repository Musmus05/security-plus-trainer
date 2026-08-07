import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { EXAM_META } from '@/content/exam-meta';
import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { type ExamScore, weakestDomains } from '@/domain/exam';
import { Badge, Button, Card, cn, domainAccent, isDomainId, ProgressBar } from '@/ui';

export interface ExamResultProps {
  score: ExamScore;
  onRestart: () => void;
}

/** Below this a domain lands on the "revise this" list. */
const WEAK_THRESHOLD = 0.7;

export function ExamResult({ score, onRestart }: ExamResultProps) {
  const { t, i18n } = useTranslation();
  const french = i18n.language !== 'en';
  const weak = weakestDomains(score, WEAK_THRESHOLD);

  return (
    <div className="flex flex-col gap-6">
      <Card raised className="flex flex-col items-center gap-4 text-center">
        <Badge tone={score.passed ? 'good' : 'critical'}>
          {t(score.passed ? 'exam.passed' : 'exam.failed')}
        </Badge>

        {/*
          The raw score is the headline and the scaled estimate is the subtitle, not the other way
          round. The raw number is the only one this app can actually stand behind; leading with a
          three-digit scaled score borrows a precision it has not earned.
        */}
        <div>
          <p className="tabular text-5xl font-extrabold tracking-tight">
            {score.correct}
            <span className="text-ink-muted text-3xl">/{score.total}</span>
          </p>
          <p className="text-ink-secondary mt-1 text-sm">
            {t('exam.scaledEstimate', { scaled: score.scaled, passing: EXAM_META.passingScore })}
          </p>
        </div>

        {score.unanswered > 0 && (
          <p className="text-warning-text text-sm">
            {t('exam.unansweredCount', { count: score.unanswered })}
          </p>
        )}

        <Button onClick={onRestart}>{t('exam.retake')}</Button>
      </Card>

      <Card className="flex items-start gap-3">
        <Info aria-hidden className="text-info-text mt-0.5 size-5 shrink-0" />
        <p className="text-ink-secondary text-sm">
          {t('exam.scoringNotice', { passing: EXAM_META.passingScore })}
        </p>
      </Card>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{t('exam.byDomainTitle')}</h2>
        <Card className="flex flex-col gap-4">
          {score.byDomain.map((entry) => {
            const domain = DOMAINS.find((candidate) => candidate.id === entry.domain);
            const accent = isDomainId(entry.domain) ? domainAccent(entry.domain) : undefined;

            return (
              <div key={entry.domain} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 truncate text-sm font-semibold">
                    <span className={cn('tabular mr-1.5 font-extrabold', accent?.text)}>
                      {domain?.number ?? entry.domain}
                    </span>
                    {domain === undefined ? '' : french ? domain.name.fr : domain.name.en}
                  </span>
                  <span className="tabular text-ink-secondary shrink-0 text-sm">
                    {entry.correct}/{entry.total}
                  </span>
                </div>
                <ProgressBar
                  value={entry.accuracy}
                  label={t('exam.domainAccuracy', {
                    domain: domain?.number ?? entry.domain,
                    percent: Math.round(entry.accuracy * 100),
                  })}
                  size="sm"
                />
              </div>
            );
          })}
        </Card>
      </section>

      {weak.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t('exam.reviseTitle')}</h2>
          <Card className="flex flex-col gap-2">
            {/*
              Only domains below the threshold, worst first. A "revise this" list that includes
              something the candidate got right is a list they stop reading.
            */}
            {weak.map((entry) => {
              const domain = DOMAINS.find((candidate) => candidate.id === entry.domain);

              return (
                <Link
                  key={entry.domain}
                  to="/path"
                  className="hover:bg-sunken focus-visible:outline-action flex items-center justify-between gap-3 rounded-lg px-2 py-2 focus-visible:outline-2"
                >
                  <span className="min-w-0 truncate text-sm font-semibold">
                    <span className="tabular mr-1.5">{domain?.number ?? entry.domain}</span>
                    {domain === undefined ? '' : french ? domain.name.fr : domain.name.en}
                  </span>
                  <Badge tone="warning">{Math.round(entry.accuracy * 100)}%</Badge>
                </Link>
              );
            })}
          </Card>
        </section>
      )}
    </div>
  );
}
