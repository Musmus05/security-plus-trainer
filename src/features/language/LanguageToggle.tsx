import { useTranslation } from 'react-i18next';

import { i18next } from '@/i18n';
import { type Locale, LOCALES } from '@/lib/store/settings.schema';
import { useAppStore } from '@/lib/store/store';
import { SegmentedControl } from '@/ui';

/**
 * Interface language switch.
 *
 * The locale lives in the persisted store, not in the URL — see
 * docs/adr/0007-locale-and-theme-in-the-store.md. Changing it drives i18next directly rather than
 * through an effect, so the label under the pointer updates in the same frame as the click.
 */
export function LanguageToggle() {
  const { t } = useTranslation();
  const locale = useAppStore((state) => state.settings.locale);
  const setLocale = useAppStore((state) => state.setLocale);

  const change = (next: Locale) => {
    setLocale(next);
    void i18next.changeLanguage(next);
  };

  return (
    <SegmentedControl
      name="locale"
      legend={t('language.label')}
      value={locale}
      onChange={change}
      size="sm"
      options={LOCALES.map((candidate) => ({
        value: candidate,
        label: <span className="uppercase">{candidate}</span>,
        accessibleName: t('language.switchTo', { language: t(`language.${candidate}`) }),
      }))}
    />
  );
}
