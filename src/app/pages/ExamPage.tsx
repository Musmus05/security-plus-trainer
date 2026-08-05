import { useTranslation } from 'react-i18next';

import { EXAM_META } from '@/content/exam-meta';

import { PagePlaceholder } from './PagePlaceholder';

export function ExamPage() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      title={t('page.exam.title')}
      subtitle={t('page.exam.subtitle', {
        questions: EXAM_META.maxQuestions,
        minutes: EXAM_META.durationMinutes,
        passing: `${String(EXAM_META.passingScore)}/${String(EXAM_META.scoreScale.max)}`,
      })}
      body={t('page.exam.placeholder')}
    />
  );
}
