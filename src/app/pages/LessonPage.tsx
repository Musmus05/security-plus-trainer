import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from './PagePlaceholder';

export function LessonPage() {
  const { t } = useTranslation();

  return <PagePlaceholder title={t('page.lesson.title')} body={t('page.lesson.placeholder')} />;
}
