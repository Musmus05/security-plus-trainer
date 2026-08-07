import { useTranslation } from 'react-i18next';

import { ReviewRunner } from '@/features/flashcards/ReviewRunner';

export function FlashcardsPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('page.flashcards.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">{t('page.flashcards.subtitle')}</p>
      </div>

      <ReviewRunner />
    </div>
  );
}
