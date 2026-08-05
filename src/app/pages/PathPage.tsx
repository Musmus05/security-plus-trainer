import { useTranslation } from 'react-i18next';

import { PagePlaceholder } from './PagePlaceholder';

export function PathPage() {
  const { t } = useTranslation();

  return (
    <PagePlaceholder
      title={t('page.path.title')}
      subtitle={t('page.path.subtitle')}
      body={t('page.path.placeholder')}
    />
  );
}
