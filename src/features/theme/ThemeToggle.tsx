import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { type ThemePreference, THEME_PREFERENCES } from '@/lib/store/settings.schema';
import { useAppStore } from '@/lib/store/store';
import { SegmentedControl } from '@/ui';

const ICON: Record<ThemePreference, typeof Sun> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

/**
 * A three-way control rather than a two-way switch.
 *
 * A binary toggle cannot express "follow my system", so it forces every learner into a permanent
 * choice that stops tracking their OS at sunset. Three explicit options are one more tap and a lot
 * less surprise.
 */
export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useAppStore((state) => state.settings.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <SegmentedControl
      name="theme"
      legend={t('theme.label')}
      value={theme}
      onChange={setTheme}
      options={THEME_PREFERENCES.map((preference) => {
        const Icon = ICON[preference];
        return {
          value: preference,
          label: <Icon aria-hidden className="size-4" />,
          accessibleName: t(`theme.${preference}`),
        };
      })}
    />
  );
}
