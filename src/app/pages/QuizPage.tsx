import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from './PagePlaceholder';

export function QuizPage() {
  const { t } = useTranslation();

  return <PagePlaceholder title={t('page.quiz.title')} body={t('page.quiz.placeholder')} />;
}
