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
