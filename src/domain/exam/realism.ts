import type { Rng } from '@/domain/ports';
import { shuffle } from '@/domain/shuffle';

/**
 * Choosing questions that sit an exam rather than teach one.
 *
 * The objective quizzes and the mock exam draw from the same 420 questions, and they should not
 * draw them the same way. A quiz is where a term is learnt, so recall belongs there. The exam is a
 * rehearsal of the real paper, and the real paper does not ask what an acronym stands for — it
 * describes a situation and asks what you would do.
 *
 * Two rules, both read off the official objectives document rather than invented:
 *
 * 1. **Seven of the 28 objectives literally begin "Given a scenario".** Those are examined with
 *    scenario questions wherever the corpus has them. This is not an interpretation of the exam's
 *    style; it is the exam's own instruction, verbatim.
 * 2. **Everywhere else, recall is a last resort.** The remaining objectives say "Compare and
 *    contrast", "Explain", "Summarize" — all of which are discriminations, which is why the
 *    corpus's `discrimination` and `scenario` items are the ones that belong on a mock paper.
 *
 * Nothing here reproduces or approximates a real exam item; it changes which of our own original
 * questions are drawn. See NOTICE.md.
 */

export type QuestionKind = 'recall' | 'discrimination' | 'scenario';

export interface RankableQuestion {
  objective: string;
  kind: QuestionKind;
}

/** Objectives whose official English title begins "Given a scenario". */
export function scenarioObjectiveIds(
  objectives: readonly { id: string; title: { en: string } }[],
): Set<string> {
  return new Set(
    objectives.filter((o) => /^given a scenario/i.test(o.title.en.trim())).map((o) => o.id),
  );
}

/**
 * How well a question matches what its objective actually asks. Higher is drawn first.
 *
 * Three tiers rather than a score, because the difference between them is categorical and a
 * numeric weight would invite tuning that no evidence supports.
 */
export function examRank(
  question: RankableQuestion,
  scenarioObjectives: ReadonlySet<string>,
): 0 | 1 | 2 {
  if (question.kind === 'recall') {
    return 0;
  }
  return question.kind === 'scenario' && scenarioObjectives.has(question.objective) ? 2 : 1;
}

/**
 * How many sightings of a question are worth distinguishing.
 *
 * Past three, "seen a lot" is one bucket. The exam only needs to know which questions are freshest,
 * not to maintain a precise history of every impression.
 */
export const MAX_TRACKED_SIGHTINGS = 3;

/** The highest value `examRank` returns. */
export const MAX_KIND_RANK = 2;

/**
 * Fold "how exam-like is it" and "how fresh is it" into one rank.
 *
 * **Recall is always last, whatever its freshness.** That is the one rule freshness may not
 * override: never-seen recall questions are the freshest thing in the corpus, and letting freshness
 * win would fill a second paper with "what does this acronym stand for" — undoing the whole reason
 * the exam ranks at all.
 *
 * Among everything else, **freshness comes first** and the scenario preference breaks ties within
 * it. That ordering was the other way round at first, and it was wrong in practice: 2.4 is the only
 * "Given a scenario" objective in domain 2, so its scenarios were the entire top rank for a paper
 * needing twenty questions — every one of them was drawn regardless of whether the learner had just
 * drilled that objective's quiz. Preferring a fresh discrimination over a stale scenario costs
 * almost nothing, because both are exam-like; showing a question the learner answered ten minutes
 * ago costs the score its meaning.
 */
export function composeRank(kindRank: number, timesSeen: number): number {
  if (kindRank <= 0) {
    return 0;
  }

  const sightings = Math.min(Math.max(0, timesSeen), MAX_TRACKED_SIGHTINGS);
  const freshness = MAX_TRACKED_SIGHTINGS - sightings;

  // `+ 1` on the multiplier so a fresher question of any exam-like kind always beats a staler one.
  return freshness * (MAX_KIND_RANK + 1) + kindRank;
}

/**
 * Draw `count` questions, exhausting the highest rank before touching the next.
 *
 * Falling through to lower ranks rather than failing is the point: a domain whose scenario pool is
 * too thin still produces a full paper, made of the most exam-like questions it has. An exam that
 * refuses to start because the corpus is uneven is worse than one that is slightly less
 * representative, and the shortfall is visible in the result's own breakdown either way.
 *
 * Shuffled within each rank, so two attempts at the same domain are not the same paper.
 */
export function sampleByRank<Q>(
  pool: readonly Q[],
  count: number,
  rankOf: (question: Q) => number,
  rng: Rng,
): Q[] {
  if (count <= 0) {
    return [];
  }

  const byRank = new Map<number, Q[]>();
  for (const question of pool) {
    const rank = rankOf(question);
    const bucket = byRank.get(rank);
    if (bucket === undefined) {
      byRank.set(rank, [question]);
    } else {
      bucket.push(question);
    }
  }

  const drawn: Q[] = [];
  for (const rank of [...byRank.keys()].sort((a, b) => b - a)) {
    if (drawn.length >= count) {
      break;
    }
    drawn.push(...shuffle(byRank.get(rank) ?? [], rng).slice(0, count - drawn.length));
  }

  return drawn;
}
