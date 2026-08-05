import { useTranslation } from 'react-i18next';

import { ButtonLink } from '@/ui';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-md flex-col items-start gap-4 py-12">
      <h1 className="text-2xl font-extrabold tracking-tight">{t('notFound.title')}</h1>
      <p className="text-ink-secondary">{t('notFound.description')}</p>
      <ButtonLink to="/">{t('notFound.home')}</ButtonLink>
    </div>
  );
}
