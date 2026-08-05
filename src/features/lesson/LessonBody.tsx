import { MDXProvider } from '@mdx-js/react';
import { Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type LessonComponent, loadLesson } from '@/content/lesson-bank';
import type { Locale } from '@/lib/store/settings.schema';
import { useAppStore } from '@/lib/store/store';
import { Badge, Card } from '@/ui';

import { lessonComponents } from './mdx-components';

export interface LessonBodyProps {
  objectiveId: string;
}

/**
 * The lesson prose for one objective.
 *
 * Mounted with `key={objectiveId}` by the caller, so navigating between objectives remounts rather
 * than resetting — the same reasoning as `QuizRunner`.
 */
export function LessonBody({ objectiveId }: LessonBodyProps) {
  const { t } = useTranslation();
  const locale = useAppStore((state) => state.settings.locale);
  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'missing' }
    | { status: 'ready'; Lesson: LessonComponent; shownIn: Locale }
  >({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    void loadLesson(objectiveId, locale).then((loaded) => {
      if (cancelled) {
        return;
      }
      setState(
        loaded === null
          ? { status: 'missing' }
          : { status: 'ready', Lesson: loaded.Lesson, shownIn: loaded.locale },
      );
    });

    return () => {
      cancelled = true;
    };
  }, [objectiveId, locale]);

  if (state.status === 'loading') {
    return (
      <Card className="text-ink-secondary text-sm" aria-busy="true">
        {t('common.loading')}
      </Card>
    );
  }

  if (state.status === 'missing') {
    return <Card className="text-ink-secondary text-sm">{t('lesson.notWrittenYet')}</Card>;
  }

  const { Lesson, shownIn } = state;
  const fellBack = shownIn !== locale;

  return (
    <Card padding="lg" className="flex flex-col">
      {/*
        Say so when the requested language was unavailable. Silently serving English to a learner
        who chose French looks like the translation is missing rather than not yet written, and they
        would have no way to tell which.
      */}
      {fellBack && (
        <Badge tone="warning" className="mb-4 self-start">
          <Languages aria-hidden className="size-3" />
          {t('lesson.shownInOtherLanguage', { language: t(`language.${shownIn}`) })}
        </Badge>
      )}

      <div lang={shownIn} className="text-ink">
        <MDXProvider components={lessonComponents}>
          <Lesson />
        </MDXProvider>
      </div>
    </Card>
  );
}
