import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { AnswerOption, Question } from '@/content/schemas';
import type { SessionItem } from '@/domain/quiz/session';
import { useAppStore } from '@/lib/store/store';
import { Badge, Button, Card, cn } from '@/ui';

export interface QuestionCardProps {
  item: SessionItem<Question>;
  onSelect: (optionId: string) => void;
  onReveal: () => void;
  onNext: () => void;
  isLast: boolean;
}

/**
 * Choose the language question text is shown in.
 *
 * Separate from the interface language on purpose. The exam is delivered only in English, so a
 * learner reading French lessons still needs to drill English question wording — the "always
 * English" setting exists for exactly that. See docs/adr/0004-french-as-comprehension-aid.md.
 */
function useQuestionLocale(): 'en' | 'fr' {
  const { i18n } = useTranslation();
  const preference = useAppStore((state) => state.settings.questionLanguage);

  return preference === 'english' ? 'en' : i18n.language === 'en' ? 'en' : 'fr';
}

export function QuestionCard({ item, onSelect, onReveal, onNext, isLast }: QuestionCardProps) {
  const { t } = useTranslation();
  const locale = useQuestionLocale();
  const { question, options, selected, revealed } = item;
  const multiSelect = question.multiSelect === true;

  return (
    <Card raised className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="info">{question.objective}</Badge>
          <Badge>{t(`quiz.kind.${question.kind}`)}</Badge>
          <Badge>{t(`quiz.difficulty.${question.difficulty}`)}</Badge>
          {multiSelect && <Badge tone="warning">{t('quiz.multiSelect')}</Badge>}
        </div>
        <p lang={locale} className="text-lg font-semibold text-balance">
          {question.prompt[locale]}
        </p>
      </div>

      {/*
        A radio group for single-answer, checkboxes for multi-select. Native inputs rather than
        buttons with aria-checked: they bring arrow-key navigation, the correct announcements, and
        form semantics that would otherwise all have to be reimplemented.
      */}
      <div
        role={multiSelect ? 'group' : 'radiogroup'}
        aria-label={t('quiz.answerLabel')}
        className="flex flex-col gap-2"
      >
        {options.map((option) => (
          <OptionRow
            key={option.id}
            option={option as AnswerOption}
            locale={locale}
            checked={selected.includes(option.id)}
            revealed={revealed}
            multiSelect={multiSelect}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3">
        {revealed ? (
          <Button onClick={onNext}>{isLast ? t('quiz.seeResult') : t('quiz.nextQuestion')}</Button>
        ) : (
          <Button onClick={onReveal} disabled={selected.length === 0}>
            {t('quiz.check')}
          </Button>
        )}
      </div>
    </Card>
  );
}

interface OptionRowProps {
  option: AnswerOption;
  locale: 'en' | 'fr';
  checked: boolean;
  revealed: boolean;
  multiSelect: boolean;
  onSelect: (optionId: string) => void;
}

function OptionRow({ option, locale, checked, revealed, multiSelect, onSelect }: OptionRowProps) {
  const { t } = useTranslation();

  /*
   * After revealing, EVERY option shows its explanation — not only the one chosen, and not only the
   * correct one. A learner who guessed right still needs to know why the other three were wrong,
   * and that is where most of the teaching in a question bank lives.
   */
  const tone = !revealed
    ? checked
      ? 'selected'
      : 'idle'
    : option.correct
      ? 'correct'
      : checked
        ? 'wrong'
        : 'neutral';

  return (
    <label
      className={cn(
        'relative flex cursor-pointer flex-col gap-1.5 rounded-2xl border-2 p-3.5 transition-colors',
        'has-focus-visible:outline-action has-focus-visible:outline-2 has-focus-visible:outline-offset-2',
        revealed && 'cursor-default',
        TONE_CLASS[tone],
      )}
    >
      <span className="flex items-start gap-2.5">
        <input
          type={multiSelect ? 'checkbox' : 'radio'}
          name="answer"
          value={option.id}
          checked={checked}
          disabled={revealed}
          onChange={() => {
            onSelect(option.id);
          }}
          className="accent-action mt-0.5 size-4 shrink-0"
        />
        <span lang={locale} className="flex-1 text-[0.9375rem] font-medium">
          {option.text[locale]}
        </span>
        {revealed && (
          <span className="shrink-0">
            {option.correct ? (
              <Check aria-label={t('quiz.correctAnswer')} className="text-good-text size-4" />
            ) : checked ? (
              <X aria-label={t('quiz.yourWrongAnswer')} className="text-critical-text size-4" />
            ) : null}
          </span>
        )}
      </span>

      {revealed && (
        <span
          lang={locale}
          className="text-ink-secondary pl-[1.625rem] text-sm whitespace-pre-line"
        >
          {option.explanation[locale]}
        </span>
      )}
    </label>
  );
}

const TONE_CLASS = {
  idle: 'border-edge hover:border-edge-strong bg-surface',
  selected: 'border-action bg-info-wash',
  correct: 'border-good bg-good-wash',
  wrong: 'border-critical bg-critical-wash',
  neutral: 'border-edge bg-surface',
} as const;
