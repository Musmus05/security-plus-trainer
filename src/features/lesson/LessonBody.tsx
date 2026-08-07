import { MDXProvider } from '@mdx-js/react';
import { Languages } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { type LessonComponent, loadLesson } from '@/content/lesson-bank';
import type { Locale } from '@/lib/store/settings.schema';
import { useAppStore } from '@/lib/store/store';
import { Badge, Card } from '@/ui';

import { LessonLocaleContext } from './lesson-locale';
import { lessonComponents } from './mdx-components';
import { useMarkReadAtEnd } from './useMarkReadAtEnd';

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
  const markLessonRead = useAppStore((state) => state.markLessonRead);
  const [state, setState] = useState<
    | { status: 'loading' }
    | { status: 'missing' }
    | { status: 'ready'; Lesson: LessonComponent; shownIn: Locale }
  >({ status: 'loading' });

  const endOfLesson = useRef<HTMLDivElement>(null);
  const markRead = useCallback(() => {
    markLessonRead(objectiveId);
  }, [markLessonRead, objectiveId]);

  // Only once the prose is on the page: arming the observer against a "loading" card would find
  // its sentinel immediately and mark a lesson read that has not rendered yet.
  useMarkReadAtEnd(endOfLesson, markRead, state.status === 'ready');

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

      {/*
        The lesson's own language is provided to everything inside it. Callout headings are part of
        the prose, so they follow `shownIn` rather than the interface language — which also keeps
        them consistent with the fallback badge above whenever the two differ.
      */}
      <LessonLocaleContext value={shownIn}>
        <div lang={shownIn} className="text-ink">
          <MDXProvider components={lessonComponents}>
            <Lesson />
          </MDXProvider>
        </div>
      </LessonLocaleContext>

      {/* The end of the prose. Reaching it is what marks the lesson read. */}
      <div ref={endOfLesson} aria-hidden />
    </Card>
  );
}
