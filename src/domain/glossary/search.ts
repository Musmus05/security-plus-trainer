/**
 * Acronym lookup and ranking.
 *
 * Pure: the glossary screen is a text box over a fixed list, and every decision about what that box
 * returns is made here so it can be tested without rendering anything.
 */

export interface AcronymLike {
  acronym: string;
  /** The official English expansion. */
  en: string;
  /** The French comprehension gloss. */
  fr: string;
}

/**
 * Fold a string to a comparable form: lower case, no diacritics.
 *
 * Without the diacritic fold, a learner typing "integrite" finds nothing while the entry reads
 * "intégrité" — and typing the accent on a phone keyboard is exactly the friction a search box
 * exists to remove.
 */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

/**
 * Split prose into comparable tokens.
 *
 * The kept characters are the ones acronyms themselves contain: `AES-256`, `S/MIME` and `802.1X`
 * are single tokens, while the parentheses in "Availability (CIA)" are separators. A plain
 * `\b`-anchored regex cannot express that — `\b` sits in the middle of `S/MIME`.
 */
export function tokenise(text: string): string[] {
  return text.split(/[^A-Za-z0-9/.-]+/u).filter((token) => token.length > 0);
}

/**
 * Whether `text` names `acronym` as a standalone term.
 *
 * Token equality rather than substring containment, and case-sensitive. Both matter: "AI" occurs
 * inside "chain" and "AIS", and a case-insensitive substring test maps roughly a third of the
 * 320-entry list onto every objective, which is the same as mapping none of them.
 *
 * Two acronyms in the official list contain a space (`PCI DSS`, `SE Linux`), so the needle is
 * tokenised too and matched as a consecutive run.
 */
export function mentions(text: string, acronym: string): boolean {
  return mentionsIn(tokenise(text), acronym);
}

/**
 * `mentions`, against text that is already tokenised.
 *
 * The pairing is 320 acronyms against 28 objectives. Re-tokenising each objective's syllabus 320
 * times is roughly nine thousand redundant splits at module load; hoisting the tokenisation out of
 * the loop is the difference between an imperceptible cost and a visible one on the glossary route.
 */
export function mentionsIn(haystack: readonly string[], acronym: string): boolean {
  const needle = tokenise(acronym);
  if (needle.length === 0) {
    return false;
  }

  return haystack.some(
    (_, start) =>
      start + needle.length <= haystack.length &&
      needle.every((part, offset) => haystack[start + offset] === part),
  );
}

/**
 * How well an entry answers a query. Higher is better; 0 means "do not show".
 *
 * The tiers exist because a learner who types "AES" wants `AES` at the top, not `AES-256` and the
 * six entries whose expansion happens to contain the word "advanced". Ranking by relevance and
 * showing everything beats filtering hard and showing nothing.
 */
export function scoreEntry(entry: AcronymLike, query: string): number {
  const needle = fold(query.trim());
  if (needle.length === 0) {
    return 1;
  }

  const acronym = fold(entry.acronym);

  if (acronym === needle) return 100;
  if (acronym.startsWith(needle)) return 80;
  if (acronym.includes(needle)) return 60;

  // Word-start matches in the expansion beat mid-word ones: "auth" should surface
  // "Authentication Header" above "Out-of-band Authentication".
  const en = fold(entry.en);
  if (en.startsWith(needle)) return 50;
  if (new RegExp(`\\b${escapeRegExp(needle)}`, 'u').test(en)) return 40;
  if (en.includes(needle)) return 20;

  const fr = fold(entry.fr);
  if (new RegExp(`\\b${escapeRegExp(needle)}`, 'u').test(fr)) return 30;
  if (fr.includes(needle)) return 10;

  return 0;
}

/**
 * Entries matching `query`, best first.
 *
 * Ties break alphabetically rather than by list order, so the result is stable and a repeated
 * search never reshuffles the rows under the reader's finger.
 */
export function searchAcronyms<T extends AcronymLike>(entries: readonly T[], query: string): T[] {
  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.acronym.localeCompare(b.entry.acronym))
    .map(({ entry }) => entry);
}

/**
 * Group entries under their initial character, in alphabetical order.
 *
 * Digits collapse into a single `#` bucket — the list has four of them, and four one-entry sections
 * before "A" is a worse index than one.
 */
export function groupByInitial<T extends AcronymLike>(entries: readonly T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();

  for (const entry of entries) {
    const first = entry.acronym.charAt(0).toUpperCase();
    const key = /[0-9]/u.test(first) ? '#' : first;
    const bucket = groups.get(key);
    if (bucket === undefined) {
      groups.set(key, [entry]);
    } else {
      bucket.push(entry);
    }
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\/-]/gu, '\\$&');
}
