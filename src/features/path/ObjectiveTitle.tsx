import { useTranslation } from 'react-i18next';

import type { LocalizedText } from '@/content/schemas';
import { cn } from '@/ui';

export interface ObjectiveTitleProps {
  title: LocalizedText;
  className?: string;
}

/**
 * An objective title, rendered so the official English wording is never lost.
 *
 * In English there is one line. In French there are two: the translation, then the official English
 * title beneath it. That is not redundancy — the exam is delivered only in English, so the English
 * sentence is the string the learner has to recognise on the day, and every other Security+
 * resource indexes objectives by it. See docs/adr/0004-french-as-comprehension-aid.md.
 */
export function ObjectiveTitle({ title, className }: ObjectiveTitleProps) {
  const { i18n } = useTranslation();
  const showBoth = i18n.language !== 'en';

  return (
    <span className={cn('flex flex-col gap-0.5', className)}>
      <span className="text-ink font-semibold">{showBoth ? title.fr : title.en}</span>
      {showBoth && (
        <span lang="en" className="text-ink-secondary text-xs italic">
          {title.en}
        </span>
      )}
    </span>
  );
}
