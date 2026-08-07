import { Clock, FileText, Info, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { EXAM_META } from '@/content/exam-meta';
import { DOMAINS } from '@/content/exam/sy0-701/domains';
import { allocate } from '@/domain/exam';
import type { ExamResultRecord } from '@/lib/store/progress.schema';
import { Badge, Button, Card, cn } from '@/ui';

export interface ExamStartProps {
  loading: boolean;
  onStart: () => void;
  history: readonly ExamResultRecord[];
}

const ALLOCATION = allocate(
  DOMAINS.map((domain) => ({ domain: domain.id, weight: domain.weight })),
  EXAM_META.maxQuestions,
);

export function ExamStart({ loading, onStart, history }: ExamStartProps) {
  const { t, i18n } = useTranslation();
  const french = i18n.language !== 'en';

  return (
    <div className="flex flex-col gap-6">
      <Card raised className="flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <Fact
            icon={<FileText aria-hidden className="size-4" />}
            value={String(EXAM_META.maxQuestions)}
            label={t('exam.factQuestions')}
          />
          <Fact
            icon={<Clock aria-hidden className="size-4" />}
            value={String(EXAM_META.durationMinutes)}
            label={t('exam.factMinutes')}
          />
          <Fact
            icon={<Target aria-hidden className="size-4" />}
            value={String(EXAM_META.passingScore)}
            label={t('exam.factPassing')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold">{t('exam.mixTitle')}</h2>
          {/*
            The split is shown before the exam starts, not discovered afterwards. Knowing that
            domain 4 is 28% of the paper is itself exam-preparation information — it is the first
            thing the official objectives document tells you.
          */}
          <ul className="flex flex-col gap-1.5">
            {DOMAINS.map((domain) => {
              const count = ALLOCATION.find((entry) => entry.domain === domain.id)?.count ?? 0;

              return (
                <li key={domain.id} className="flex items-center gap-2 text-sm">
                  <span className="tabular text-ink-secondary w-8 shrink-0 font-bold">
                    {domain.number}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {french ? domain.name.fr : domain.name.en}
                  </span>
                  <Badge>{t('exam.questionCount', { count })}</Badge>
                </li>
              );
            })}
          </ul>
        </div>

        <Button onClick={onStart} disabled={loading}>
          {t(loading ? 'common.loading' : 'exam.start')}
        </Button>
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

      {history.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">{t('exam.historyTitle')}</h2>
          <Card padding="none">
            <ul className="divide-edge divide-y">
              {history.map((entry) => (
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
