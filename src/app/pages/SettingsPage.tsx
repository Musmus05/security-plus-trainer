import { useTranslation } from 'react-i18next';

import { LanguageToggle } from '@/features/language/LanguageToggle';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { DAILY_GOALS, QUESTION_LANGUAGES } from '@/lib/store/settings.schema';
import { useAppStore } from '@/lib/store/store';
import { Card, SegmentedControl } from '@/ui';

function Row({ label, help, control }: { label: string; help?: string; control: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 py-3.5">
      <div className="min-w-40 flex-1">
        <span className="text-ink text-sm font-semibold">{label}</span>
        {help !== undefined && <p className="text-ink-secondary mt-0.5 text-xs">{help}</p>}
      </div>
      {control}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-1">
      <h2 className="text-ink-secondary px-1 text-xs font-bold tracking-wider uppercase">
        {title}
      </h2>
      <Card padding="sm" className="divide-edge divide-y px-4">
        {children}
      </Card>
    </section>
  );
}

export function SettingsPage() {
  const { t } = useTranslation();
  const settings = useAppStore((state) => state.settings);
  const setQuestionLanguage = useAppStore((state) => state.setQuestionLanguage);
  const setDailyGoalXp = useAppStore((state) => state.setDailyGoalXp);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-2xl font-extrabold tracking-tight">{t('settings.title')}</h1>

      <Section title={t('settings.appearance')}>
        <Row label={t('theme.label')} control={<ThemeToggle />} />
        <Row
          label={t('settings.sound')}
          control={
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(event) => {
                  setSoundEnabled(event.target.checked);
                }}
                className="accent-action size-4"
              />
              {settings.soundEnabled ? t('settings.on') : t('settings.off')}
            </label>
          }
        />
      </Section>

      <Section title={t('settings.languageSection')}>
        <Row label={t('language.label')} control={<LanguageToggle />} />
        <Row
          label={t('settings.questionLanguage')}
          help={t('settings.questionLanguageHelp')}
          control={
            <SegmentedControl
              name="questionLanguage"
              legend={t('settings.questionLanguage')}
              value={settings.questionLanguage}
              onChange={setQuestionLanguage}
              size="sm"
              options={QUESTION_LANGUAGES.map((option) => ({
                value: option,
                label:
                  option === 'interface'
                    ? t('settings.questionLanguageInterface')
                    : t('settings.questionLanguageEnglish'),
              }))}
            />
          }
        />
      </Section>

      <Section title={t('settings.study')}>
        <Row
          label={t('settings.dailyGoal')}
          control={
            <SegmentedControl
              name="dailyGoal"
              legend={t('settings.dailyGoal')}
              value={String(settings.dailyGoalXp)}
              onChange={(next) => {
                setDailyGoalXp(Number(next));
              }}
              size="sm"
              options={DAILY_GOALS.map((goal) => ({
                value: String(goal),
                label: <span className="tabular">{goal}</span>,
                accessibleName: `${String(goal)} XP`,
              }))}
            />
          }
        />
      </Section>
    </div>
  );
}
