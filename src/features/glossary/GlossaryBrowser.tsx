import { Search, X } from 'lucide-react';
import { useDeferredValue, useId, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ACRONYMS } from '@/content/exam/sy0-701/acronyms';
import { groupByInitial, searchAcronyms } from '@/domain/glossary';

import { AcronymCard } from './AcronymCard';

/**
 * The searchable acronym appendix.
 *
 * All 320 entries render at once. That is a deliberate non-optimisation: the list is a fixed size
 * known at build time, a browser lays out 320 short rows in a few milliseconds, and virtualising it
 * would cost the browser's own find-in-page — which is the tool a reader reaches for first in a
 * glossary. Measure before adding a windowing library here.
 */
export function GlossaryBrowser() {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const searchId = useId();

  /*
   * The input stays responsive while the (cheap, but not free) filter runs against 320 entries on
   * every keystroke. `useDeferredValue` lets React keep the typed characters ahead of the list.
   */
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => searchAcronyms(ACRONYMS, deferredQuery), [deferredQuery]);
  const groups = useMemo(() => groupByInitial(results), [results]);

  // Ranking is meaningless without a query, and alphabetical sections are the better index; with
  // one, the best match belongs at the top and letter headings would fight the ranking.
  const searching = deferredQuery.trim().length > 0;
  const showGloss = i18n.language !== 'en';

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label className="sr-only" htmlFor={searchId}>
          {t('glossary.searchLabel')}
        </label>
        <Search
          aria-hidden
          className="text-ink-muted pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
        />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder={t('glossary.searchPlaceholder')}
          className="border-edge bg-raised focus-visible:outline-action w-full rounded-xl border py-3 pr-10 pl-10 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
            }}
            aria-label={t('glossary.clearSearch')}
            className="text-ink-muted hover:text-ink focus-visible:outline-action absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-lg focus-visible:outline-2"
          >
            <X aria-hidden className="size-4" />
          </button>
        )}
      </div>

      {/*
        Announced politely rather than assertively: a result count that interrupts on every
        keystroke is worse than no count at all for a screen-reader user typing a word.
      */}
      <p aria-live="polite" className="text-ink-secondary text-sm">
        {t('glossary.resultCount', { count: results.length })}
      </p>

      {results.length === 0 ? (
        <p className="text-ink-muted border-edge rounded-xl border border-dashed p-8 text-center text-sm">
          {t('glossary.noResults', { query: deferredQuery.trim() })}
        </p>
      ) : searching ? (
        <ul className="flex flex-col gap-2">
          {results.map((entry) => (
            <AcronymCard key={entry.acronym} entry={entry} showGloss={showGloss} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-8">
          {groups.map(([letter, entries]) => (
            <section key={letter} aria-labelledby={`${searchId}-${letter}`}>
              <h2
                id={`${searchId}-${letter}`}
                className="border-edge text-ink-secondary bg-surface sticky top-0 z-10 border-b py-2 text-sm font-extrabold tracking-widest"
              >
                {letter}
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {entries.map((entry) => (
                  <AcronymCard key={entry.acronym} entry={entry} showGloss={showGloss} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
