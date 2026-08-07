import { useEffect, type RefObject } from 'react';

/**
 * Mark a lesson read once the learner reaches the bottom of it.
 *
 * Pressing a button to record something you have just spent ten minutes doing is busywork, and the
 * consequence of forgetting is worse than the friction: the crown, the XP and the streak all hang
 * off it, so a learner who reads every lesson and never clicks appears to have done nothing.
 *
 * Two guards, both there because the naive version is wrong.
 *
 * **The page must actually be scrollable.** A sentinel at the end of a short lesson is already on
 * screen when the page loads, so an unguarded observer marks it read before a word is read. The
 * manual button still covers that case.
 *
 * **Marking is not undone by the observer firing again.** The store action is idempotent — it pays
 * once — but the effect also disconnects after the first hit rather than relying on that, so the
 * behaviour is right even if the action changes.
 */
export function useMarkReadAtEnd(
  sentinel: RefObject<HTMLElement | null>,
  onReachedEnd: () => void,
  enabled: boolean,
): void {
  useEffect(() => {
    const element = sentinel.current;
    if (!enabled || element === null) {
      return;
    }

    /*
     * `IntersectionObserver` is absent in jsdom and in a handful of very old browsers. Missing it
     * costs the automatic marking, not the lesson — the button is still there — so this degrades
     * rather than throwing.
     */
    if (!('IntersectionObserver' in globalThis)) {
      return;
    }

    const scrollable = () =>
      document.documentElement.scrollHeight > document.documentElement.clientHeight + 1;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && scrollable()) {
          observer.disconnect();
          onReachedEnd();
        }
      },
      // A small negative bottom margin means "the end is comfortably on screen" rather than "one
      // pixel of it has appeared", which on a fast scroll fires while the text is still moving.
      { rootMargin: '0px 0px -48px 0px' },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sentinel, onReachedEnd, enabled]);
}
