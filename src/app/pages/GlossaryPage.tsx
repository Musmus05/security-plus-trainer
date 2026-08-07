import { useTranslation } from 'react-i18next';

import { ACRONYMS } from '@/content/exam/sy0-701/acronyms';
import { GlossaryBrowser } from '@/features/glossary/GlossaryBrowser';

export function GlossaryPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('page.glossary.title')}</h1>
        <p className="text-ink-secondary mt-1 text-sm">
          {t('page.glossary.subtitle', { count: ACRONYMS.length })}
        </p>
      </div>

      <GlossaryBrowser />
    </div>
  );
}
