import { Clock, FileText, Info, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { EXAM_META } from '@/content/exam-meta';
import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { type ExamScope, isDomainScope } from '@/domain/exam';
import type { ExamResultRecord } from '@/lib/store/progress.schema';
import { Badge, Button, Card, cn } from '@/ui';

import { DomainExamList } from './DomainExamList';
import { type examPlan } from './useExamAttempt';

export interface ExamStartProps {
  scope: ExamScope;
  plan: ReturnType<typeof examPlan>;
  loading: boolean;
  onStart: () => void;
  /** The scope of an attempt running under a different exam, if one is in progress. */
  otherInProgress: ExamScope | null;
  history: readonly ExamResultRecord[];
}

export function ExamStart({
  scope,
  plan,
  loading,
  onStart,
  otherInProgress,
  history,
}: ExamStartProps) {
  const { t, i18n } = useTranslation();
  const french = i18n.language !== 'en';
  const domain = isDomainScope(scope)
    ? DOMAINS.find((candidate) => candidate.id === scope)
    : undefined;

  // Only attempts at *this* paper. A domain 4 score is not a full-mock score and listing them
  // together would make the history unreadable.
  const ownHistory = history.filter((entry) => entry.scope === scope);

  return (
    <div className="flex flex-col gap-6">
      <Card raised className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <Fact
            icon={<FileText aria-hidden className="size-4" />}
            value={String(plan.questionCount)}
            label={t('exam.factQuestions')}
          />
          <Fact
            icon={<Clock aria-hidden className="size-4" />}
            value={String(plan.durationMs / 60_000)}
            label={t('exam.factMinutes')}
          />
          <Fact
            icon={<Target aria-hidden className="size-4" />}
            value={String(EXAM_META.passingScore)}
            label={t('exam.factPassing')}
          />
        </div>

        {domain === undefined ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold">{t('exam.mixTitle')}</h2>
            {/*
              The split is shown before the exam starts, not discovered afterwards. Knowing that
              domain 4 is 28% of the paper is itself exam-preparation information — it is the first
              thing the official objectives document tells you.
            */}
            <ul className="flex flex-col gap-1.5">
              {DOMAINS.map((entry) => {
                const count = plan.allocation.find((a) => a.domain === entry.id)?.count ?? 0;

                return (
                  <li key={entry.id} className="flex items-center gap-2 text-sm">
                    <span className="tabular text-ink-secondary w-8 shrink-0 font-bold">
                      {entry.number}
                    </span>
                    <span className="min-w-0 flex-1 truncate">
                      {french ? entry.name.fr : entry.name.en}
                    </span>
                    <Badge>{t('exam.questionCount', { count })}</Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="text-ink-secondary text-sm">
            {/*
              Says where the number came from. A candidate who is told "11 questions" with no
              reason assumes it was picked at random; told it is domain 1's actual share of the
              paper, the number becomes information about the exam.
            */}
            {t('exam.domainShare', {
              questions: plan.questionCount,
              total: EXAM_META.maxQuestions,
              domain: domain.number,
            })}
          </p>
        )}

        {otherInProgress === null ? (
          <Button onClick={onStart} disabled={loading}>
            {t(loading ? 'common.loading' : 'exam.start')}
          </Button>
        ) : (
          /*
           * One attempt at a time. Silently replacing an exam somebody is halfway through — with a
           * clock still running on it — is not a trade any button should make on their behalf.
           */
          <div className="border-warning bg-warning-wash flex flex-col gap-3 rounded-xl border-2 p-4">
            <p className="text-warning-text text-sm font-semibold">
              {t('exam.otherInProgress', {
                exam: isDomainScope(otherInProgress)
                  ? t('exam.domainPaper', { domain: otherInProgress })
                  : t('exam.fullPaper'),
              })}
            </p>
            <Link
              to={isDomainScope(otherInProgress) ? `/exam/${String(otherInProgress)}` : '/exam'}
              className="bg-action focus-visible:outline-action w-fit rounded-xl px-4 py-2 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t('exam.resumeOther')}
            </Link>
          </div>
        )}
      </Card>

      {/*
        The honesty notice sits on the start screen as well as the result screen. A candidate who
        reads it only after seeing "812 · passed" has already formed the belief it exists to
        prevent.
      */}
      <Card className="flex items-start gap-3">
        <Info aria-hidden className="text-info-text mt-0.5 size-5 shrink-0" />
        <p className="text-ink-secondary text-sm">
          {t('exam.scoringNotice', { passing: EXAM_META.passingScore })}
        </p>
      </Card>

      {domain === undefined && <DomainExamList history={history} />}

      {ownHistory.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t('exam.historyTitle')}</h2>
          <Card padding="none">
            <ul className="divide-edge divide-y">
              {ownHistory.map((entry) => (
                <li key={entry.at} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="tabular font-bold">{entry.scaled}</p>
                    <p className="text-ink-secondary text-xs">
                      {t('exam.historyDetail', {
                        correct: entry.correct,
                        total: entry.total,
                        date: new Date(entry.at).toLocaleDateString(i18n.language),
                      })}
                    </p>
                  </div>
                  <Badge tone={entry.passed ? 'good' : 'critical'}>
                    {t(entry.passed ? 'exam.passed' : 'exam.failed')}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}
    </div>
  );
}

function Fact({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className={cn('bg-sunken flex flex-col items-center gap-0.5 rounded-xl px-2 py-3')}>
      <span className="text-ink-muted">{icon}</span>
      <span className="tabular text-2xl font-extrabold">{value}</span>
      <span className="text-ink-secondary text-xs">{label}</span>
    </div>
  );
}
