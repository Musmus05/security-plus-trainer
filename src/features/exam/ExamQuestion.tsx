import { Flag } from 'lucide-react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { AnswerOption, Question } from '@/content/schemas';
import { useAppStore } from '@/lib/store/store';
import { Badge, Button, Card, cn } from '@/ui';

export interface ExamQuestionProps {
  question: Question;
  options: readonly AnswerOption[];
  selected: readonly string[];
  flagged: boolean;
  onSelect: (optionId: string) => void;
  onToggleFlag: () => void;
}

/**
 * One exam item.
 *
 * Deliberately **not** the quiz's `QuestionCard`. The two look similar and differ in the one way
 * that matters: an exam item never reveals whether the answer was right. Sharing a component and
 * passing `revealed={false}` would put the entire feedback path one prop away from an exam screen,
 * which is exactly the sort of accident that only shows up in a screenshot after the fact.
 *
 * The objective is not shown either. On the real exam nobody tells you which objective an item
 * belongs to, and a candidate who knows it is answering a different, easier question.
 */
export function ExamQuestion({
  question,
  options,
  selected,
  flagged,
  onSelect,
  onToggleFlag,
}: ExamQuestionProps) {
  const { t, i18n } = useTranslation();
  const preference = useAppStore((state) => state.settings.questionLanguage);
  const locale = preference === 'english' ? 'en' : i18n.language === 'en' ? 'en' : 'fr';
  const multiSelect = question.multiSelect === true;
  const groupId = useId();

  return (
    <Card raised className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {multiSelect ? (
            <Badge tone="warning">{t('quiz.multiSelect')}</Badge>
          ) : (
            <span aria-hidden />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFlag}
            aria-pressed={flagged}
            className={cn(flagged && 'text-warning-text')}
          >
            <Flag aria-hidden className={cn('size-4', flagged && 'fill-current')} />
            {t(flagged ? 'exam.unflag' : 'exam.flag')}
          </Button>
        </div>
        <p lang={locale} className="text-lg font-semibold text-balance">
          {question.prompt[locale]}
        </p>
      </div>

      <div
        role={multiSelect ? 'group' : 'radiogroup'}
        aria-label={t('quiz.answerLabel')}
        className="flex flex-col gap-2"
      >
        {options.map((option) => {
          const checked = selected.includes(option.id);

          return (
            <label
              key={option.id}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3.5 text-sm transition-colors',
                'focus-within:outline-action focus-within:outline-2 focus-within:outline-offset-2',
                checked ? 'border-action bg-info-wash' : 'border-edge bg-surface hover:bg-sunken',
              )}
            >
              <input
                type={multiSelect ? 'checkbox' : 'radio'}
                name={`${groupId}-answer`}
                checked={checked}
                onChange={() => {
                  onSelect(option.id);
                }}
                className="accent-action mt-0.5 size-4 shrink-0"
              />
              <span lang={locale}>{option.text[locale]}</span>
            </label>
          );
        })}
      </div>
    </Card>
  );
}
