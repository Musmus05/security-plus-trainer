import { useTranslation } from 'react-i18next';

import { EXAM_META } from '@/content/exam-meta';
import { ExamRunner } from '@/features/exam/ExamRunner';

export function ExamPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('page.exam.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">
          {t('page.exam.subtitle', {
            questions: EXAM_META.maxQuestions,
            minutes: EXAM_META.durationMinutes,
            passing: `${String(EXAM_META.passingScore)}/${String(EXAM_META.scoreScale.max)}`,
          })}
        </p>
      </div>

      <ExamRunner />
    </div>
  );
}
