import { createBrowserRouter } from 'react-router';

import { AppLayout } from './AppLayout';
import { RouteError } from './RouteError';

/**
 * Routes.
 *
 * Every page beyond the dashboard is loaded lazily. That is not premature optimisation: each
 * objective's lesson, question bank and flashcard deck is a dynamic import too, and keeping the
 * route modules split is what stops the whole corpus landing in the entry chunk.
 *
 * No locale segment — language is a persisted setting, not a URL concern. See
 * docs/adr/0007-locale-and-theme-in-the-store.md.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { DashboardPage } = await import('./pages/DashboardPage');
          return { Component: DashboardPage };
        },
      },
      {
        path: 'path',
        lazy: async () => {
          const { PathPage } = await import('./pages/PathPage');
          return { Component: PathPage };
        },
      },
      {
        // The objective id keeps the exam's own numbering — "4.6", not a slug. It is the index
        // every other Security+ resource uses, so a guessed URL should work.
        path: 'objective/:objectiveId',
        lazy: async () => {
          const { LessonPage } = await import('./pages/LessonPage');
          return { Component: LessonPage };
        },
      },
      {
        path: 'objective/:objectiveId/quiz',
        lazy: async () => {
          const { QuizPage } = await import('./pages/QuizPage');
          return { Component: QuizPage };
        },
      },
      {
        path: 'exam',
        lazy: async () => {
          const { ExamPage } = await import('./pages/ExamPage');
          return { Component: ExamPage };
        },
      },
      {
        // The full paper is `/exam`; a domain paper is `/exam/4`. The segment is the domain number
        // the exam itself uses, so a guessed URL works — and one that names no real domain is
        // refused rather than starting an exam of zero questions.
        path: 'exam/:scope',
        lazy: async () => {
          const { ExamPage } = await import('./pages/ExamPage');
          return { Component: ExamPage };
        },
      },
      {
        path: 'flashcards',
        lazy: async () => {
          const { FlashcardsPage } = await import('./pages/FlashcardsPage');
          return { Component: FlashcardsPage };
        },
      },
      {
        path: 'glossary',
        lazy: async () => {
          const { GlossaryPage } = await import('./pages/GlossaryPage');
          return { Component: GlossaryPage };
        },
      },
      {
        path: 'settings',
        lazy: async () => {
          const { SettingsPage } = await import('./pages/SettingsPage');
          return { Component: SettingsPage };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundPage } = await import('./pages/NotFoundPage');
          return { Component: NotFoundPage };
        },
      },
    ],
  },
]);
