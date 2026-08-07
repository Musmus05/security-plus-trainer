import { ACRONYMS } from '@/content/exam/sy0-701/acronyms';
import type { ObjectiveId } from '@/content/schemas';

/**
 * Review decks.
 *
 * The acronym deck is **derived** from the glossary rather than authored a second time. 320 cards
 * hand-copied from a list that already exists is 320 chances to disagree with it, and the appendix
 * is exactly the kind of rote material spaced repetition is best at.
 */

export interface ReviewCard {
  /**
   * Stable across regenerations of the deck, because the learner's schedule is keyed by it. Change
   * this format and every card silently starts from scratch.
   */
  id: string;
  /** The side shown first. */
  prompt: string;
  /**
   * The side that must be recalled — in English, always.
   *
   * The exam is delivered in English only (ADR-0004), so a learner who can produce "gestion des
   * identités et des accès" but not "Identity and Access Management" has practised the wrong
   * recall. The French gloss is context on the back, never the answer.
   */
  answer: string;
  /** French comprehension aid, shown under the answer when the interface is French. */
  gloss: string;
  objectives: readonly ObjectiveId[];
}

export const ACRONYM_DECK_ID = 'acronyms';

/** Card ids are namespaced so a future per-objective deck cannot collide with this one. */
export const ACRONYM_DECK: readonly ReviewCard[] = ACRONYMS.map((entry) => ({
  id: `acr:${entry.acronym}`,
  prompt: entry.acronym,
  answer: entry.en,
  gloss: entry.fr,
  objectives: entry.objectives,
}));

export const ACRONYM_CARD_IDS: readonly string[] = ACRONYM_DECK.map((card) => card.id);

const BY_ID = new Map(ACRONYM_DECK.map((card) => [card.id, card]));

export function findCard(id: string): ReviewCard | undefined {
  return BY_ID.get(id);
}
