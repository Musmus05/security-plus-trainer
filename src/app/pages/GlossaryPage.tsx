import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from './PagePlaceholder';

export function GlossaryPage() {
  const { t } = useTranslation();

  return <PagePlaceholder title={t('page.glossary.title')} body={t('page.glossary.placeholder')} />;
}
