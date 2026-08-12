import { describe, expect, it } from 'vitest';

import { EXAM_META } from '@/content/exam-meta';
import { ALL_OBJECTIVES, DOMAINS } from '@/content/exam/sy0-701/domains';
import { loadQuestions, OBJECTIVES_WITH_QUESTIONS } from '@/content/question-bank';
import type { Question } from '@/content/schemas';
import { allocationFor, examRank, sampleExam, scenarioObjectiveIds } from '@/domain/exam';
import { createSeededRng } from '@/domain/rng';

/**
 * The mock exam, drawn against the **real** corpus rather than a fixture.
 *
 * `realism.test.ts` proves the ranking rules; this proves the corpus can actually satisfy them.
 * The two are different claims, and only this one fails when somebody writes fifteen recall
 * questions for an objective that needed scenarios.
 */

const WEIGHTS = DOMAINS.map((domain) => ({ domain: domain.id, weight: domain.weight }));
const SCENARIO_OBJECTIVES = scenarioObjectiveIds(ALL_OBJECTIVES);
const RUNS = 25;

async function pools(): Promise<Record<number, Question[]>> {
  const banks = (
    await Promise.all(OBJECTIVES_WITH_QUESTIONS.map((id) => loadQuestions(id)))
  ).flat();
  const byDomain: Record<number, Question[]> = {};

  for (const question of banks) {
    (byDomain[Number(question.objective.split('.')[0])] ??= []).push(question);
  }
  return byDomain;
}

function drawPaper(byDomain: Record<number, Question[]>, seed: number): Question[] {
  return sampleExam(
    byDomain,
    allocationFor('full', WEIGHTS, EXAM_META.maxQuestions),
    createSeededRng(seed),
    (question) => examRank(question, SCENARIO_OBJECTIVES),
  );
}

describe('the mock exam over the real corpus', () => {
  it('always draws a full paper', async () => {
    const byDomain = await pools();

    for (let seed = 1; seed <= RUNS; seed += 1) {
      expect(drawPaper(byDomain, seed), `seed ${String(seed)}`).toHaveLength(
        EXAM_META.maxQuestions,
      );
    }
  });

  it('never puts a recall question on the paper', async () => {
    /*
     * This is the difference between the exam and the quizzes, stated as an assertion. Recall is
     * how a term is learnt and it belongs in the quizzes and the flashcards; the real paper
     * describes a situation and asks what you would do.
     *
     * It holds because every domain's non-recall pool is larger than its allocation. If that stops
     * being true this fails, which is the point — the fallback would quietly make the paper less
     * representative and nothing else would notice.
     */
    const byDomain = await pools();

    for (let seed = 1; seed <= RUNS; seed += 1) {
      const recall = drawPaper(byDomain, seed).filter((question) => question.kind === 'recall');
      expect(recall, `seed ${String(seed)}`).toHaveLength(0);
    }
  });

  it('is majority scenario', async () => {
    const byDomain = await pools();
    let scenario = 0;

    for (let seed = 1; seed <= RUNS; seed += 1) {
      scenario += drawPaper(byDomain, seed).filter((q) => q.kind === 'scenario').length;
    }

    // Runs at about 70%. The floor is deliberately well below that: this test exists to catch the
    // ranking being bypassed, not to pin a ratio no evidence supports to the percentage point.
    expect(scenario / (RUNS * EXAM_META.maxQuestions)).toBeGreaterThan(0.5);
  });

  it('never passes over a "Given a scenario" question for a lesser one from the same domain', async () => {
    /*
     * The precise guarantee, which is weaker than "those objectives are examined by scenarios
     * only" and is the honest statement of it. Ranking happens per domain, not per objective:
     * domain 3 needs 16 questions and only 3.2 is a scenario objective, so once 3.2's scenarios
     * are spent the draw falls through to rank 1 — which includes 3.2's own discriminations. That
     * is the intended fallback, not a defect.
     *
     * What must never happen is a rank 2 question sitting unused while a rank 1 one is drawn from
     * the same pool. That is the ordering, and it is what this asserts.
     */
    const byDomain = await pools();
    const rank = (question: Question) => examRank(question, SCENARIO_OBJECTIVES);

    for (let seed = 1; seed <= RUNS; seed += 1) {
      const paper = drawPaper(byDomain, seed);

      for (const [domain, pool] of Object.entries(byDomain)) {
        const drawnIds = new Set(
          paper.filter((q) => q.objective.startsWith(`${domain}.`)).map((q) => q.id),
        );
        if (drawnIds.size === 0) {
          continue;
        }

        const drewLower = pool.some((q) => drawnIds.has(q.id) && rank(q) < 2);
        const skippedTop = pool.filter((q) => rank(q) === 2 && !drawnIds.has(q.id));

        if (drewLower) {
          expect(
            skippedTop.map((q) => q.id),
            `domain ${domain}, seed ${String(seed)}`,
          ).toEqual([]);
        }
      }
    }
  });

  it('draws a different paper each sitting', async () => {
    const byDomain = await pools();
    const first = drawPaper(byDomain, 1).map((question) => question.id);
    const second = drawPaper(byDomain, 2).map((question) => question.id);

    expect(first).not.toEqual(second);
    // Overlapping is fine and expected; being the same paper is not.
    expect(new Set([...first, ...second]).size).toBeGreaterThan(first.length);
  });

  it('keeps the official domain weights', async () => {
    const byDomain = await pools();
    const paper = drawPaper(byDomain, 3);

    for (const [domain, expected] of [
      [1, 11],
      [2, 20],
      [3, 16],
      [4, 25],
      [5, 18],
    ] as const) {
      const drawn = paper.filter((q) => q.objective.startsWith(`${String(domain)}.`));
      expect(drawn, `domain ${String(domain)}`).toHaveLength(expected);
    }
  });
});
