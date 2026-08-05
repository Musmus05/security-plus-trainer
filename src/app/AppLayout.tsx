import { BookOpen, GraduationCap, Home, Layers, Settings, SpellCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router';

import { LanguageToggle } from '@/features/language/LanguageToggle';
import { ThemeToggle } from '@/features/theme/ThemeToggle';
import { useDocumentChrome } from '@/features/theme/useDocumentChrome';
import { cn } from '@/ui';

const NAV = [
  { to: '/', key: 'dashboard', icon: Home },
  { to: '/path', key: 'path', icon: BookOpen },
  { to: '/exam', key: 'exam', icon: GraduationCap },
  { to: '/flashcards', key: 'flashcards', icon: Layers },
  { to: '/glossary', key: 'glossary', icon: SpellCheck },
  { to: '/settings', key: 'settings', icon: Settings },
] as const;

/**
 * The shell: a header with the language and theme controls, and a navigation bar that sits at the
 * bottom on phones and along the side on wide screens — thumbs are at the bottom of a phone, and a
 * study app gets used one-handed on a sofa.
 */
export function AppLayout() {
  const { t } = useTranslation();
  useDocumentChrome();

  return (
    <div className="min-h-dvh sm:grid sm:grid-cols-[13rem_1fr]">
      <a
        href="#main"
        className="bg-action sr-only rounded-lg px-4 py-2 font-bold text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
      >
        {t('app.skipToContent')}
      </a>

      <nav
        aria-label={t('nav.label')}
        className={cn(
          'border-edge bg-surface fixed inset-x-0 bottom-0 z-40 border-t',
          'sm:sticky sm:inset-x-auto sm:top-0 sm:h-dvh sm:border-t-0 sm:border-r',
        )}
      >
        <span className="text-ink hidden px-4 pt-5 pb-3 text-base font-extrabold tracking-tight sm:block">
          {t('app.name')}
        </span>
        <ul className="flex justify-around sm:flex-col sm:justify-start sm:gap-1 sm:px-2">
          {NAV.map(({ to, key, icon: Icon }) => (
            <li key={to} className="flex-1 sm:flex-none">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-0.5 px-2 py-2.5 text-[0.6875rem] font-bold',
                    'sm:flex-row sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm',
                    'focus-visible:outline-action focus-visible:outline-2 focus-visible:outline-offset-2',
                    isActive ? 'text-info-text sm:bg-sunken' : 'text-ink-secondary hover:text-ink',
                  )
                }
              >
                <Icon aria-hidden className="size-5 shrink-0" />
                {t(`nav.${key}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex min-w-0 flex-col">
        <header className="border-edge bg-page/85 sticky top-0 z-30 flex items-center justify-end gap-2 border-b px-4 py-2.5 backdrop-blur sm:px-8">
          <LanguageToggle />
          <ThemeToggle />
        </header>

        <main id="main" className="flex-1 px-4 pt-6 pb-24 sm:px-8 sm:pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
