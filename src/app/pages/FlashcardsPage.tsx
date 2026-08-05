import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from './PagePlaceholder';

export function FlashcardsPage() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder title={t('page.flashcards.title')} body={t('page.flashcards.placeholder')} />
  );
}
