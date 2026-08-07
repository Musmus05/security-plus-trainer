import type { Acronym, ObjectiveId } from '@/content/schemas';
import { fold, mentionsIn, tokenise } from '@/domain/glossary';

import { ALL_OBJECTIVES } from './domains';
import FRENCH_GLOSSES from './acronyms.fr.json';
import OFFICIAL from './source/acronyms.official.json';

/**
 * The official SY0-701 acronym appendix, joined with its French glosses.
 *
 * Three separate concerns, kept in three separate files on purpose:
 *
 * - `source/acronyms.official.json` is machine-extracted from the objectives PDF and is never
 *   hand-edited. `scripts/extract-acronyms.mjs` must be able to regenerate it byte for byte.
 * - `acronyms.fr.json` is authored. It lives apart precisely so re-running the extraction cannot
 *   silently discard human work — which is what would happen if the gloss were a fourth key in the
 *   extracted file.
 * - The link to objectives is **derived** here rather than stored. See below.
 */

/**
 * Objectives whose official scope names a given acronym.
 *
 * Derived from the syllabus rather than hand-maintained, and that is the whole point: a stored
 * mapping is a third list to keep in step with two others, and it drifts the first time an
 * objective's topics are corrected. Deriving it means the glossary cannot claim a link the official
 * outline does not make.
 *
 * Two ways to match, and the asymmetry between them is the design:
 *
 * - The **acronym** is matched case-sensitively as a whole-token run. Case is the only thing
 *   separating `IT`, `AI`, `IR` and `OS` from ordinary English, and folding case puts them on
 *   nearly every objective — a glossary entry pointing at twenty-eight objectives points at none.
 * - The **expansion** is matched case-insensitively, because the outline usually spells the term
 *   out in sentence case ("Multifactor authentication") where the appendix title-cases it. A
 *   multi-word phrase is specific enough that folding case costs nothing; single-word expansions
 *   are excluded for exactly that reason.
 *
 * Matching the acronym alone found ten entries out of 320. The outline names concepts, not
 * abbreviations, so the expansion is the side that carries the signal.
 */
interface SyllabusEntry {
  id: ObjectiveId;
  /** Original case, for the acronym match. */
  tokens: readonly string[];
  /** Case- and diacritic-folded, for the expansion match. */
  folded: readonly string[];
}

const OBJECTIVE_SYLLABUS: readonly SyllabusEntry[] = ALL_OBJECTIVES.map((objective) => {
  const syllabus = [objective.title.en, ...objective.topics].join(' ');
  return {
    id: objective.id,
    tokens: tokenise(syllabus),
    folded: tokenise(fold(syllabus)),
  };
});

function objectivesNaming(acronym: string, expansion: string): ObjectiveId[] {
  const phrase = fold(expansion);
  // A one-word expansion ("Firewall", "Nonce") is too generic to attribute an objective to.
  const usePhrase = tokenise(phrase).length > 1;

  return OBJECTIVE_SYLLABUS.filter(
    ({ tokens, folded }) =>
      mentionsIn(tokens, acronym) || (usePhrase && mentionsIn(folded, phrase)),
  ).map(({ id }) => id);
}

/**
 * Every acronym the exam expects a candidate to recognise.
 *
 * Typed rather than parsed at import: `npm run validate:content` runs `acronymListSchema` over this
 * array in CI, so the shape is proven once in the build instead of on every visit to the glossary.
 */
export const ACRONYMS: readonly Acronym[] = OFFICIAL.map((entry) => ({
  acronym: entry.acronym,
  en: entry.en,
  // A gloss missing from the JSON is a build failure, not a blank row: the content gate asserts the
  // two key sets are identical, so the fallback below is unreachable and exists only to keep this
  // total. If it ever renders, the gate has been removed.
  fr: (FRENCH_GLOSSES as Record<string, string | undefined>)[entry.acronym] ?? entry.en,
  objectives: objectivesNaming(entry.acronym, entry.en),
}));

/** The French gloss table, exported for the content gate to check against the extraction. */
export const FRENCH_GLOSS_KEYS: readonly string[] = Object.keys(FRENCH_GLOSSES);
