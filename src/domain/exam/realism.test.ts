import { describe, expect, it } from 'vitest';

import { createSeededRng } from '@/domain/rng';

import {
  examRank,
  type QuestionKind,
  type RankableQuestion,
  sampleByRank,
  scenarioObjectiveIds,
} from './realism';

const SCENARIO = new Set(['2.4', '3.2', '4.1', '4.5', '4.6', '4.9', '5.6']);

const q = (objective: string, kind: QuestionKind): RankableQuestion => ({ objective, kind });

describe('scenarioObjectiveIds', () => {
  it('picks out the objectives whose official title begins "Given a scenario"', () => {
    // Read off the document rather than listed by hand, so it cannot fall out of step with it.
    const ids = scenarioObjectiveIds([
      { id: '4.6', title: { en: 'Given a scenario, implement and maintain identity and access.' } },
      { id: '1.1', title: { en: 'Compare and contrast various types of security controls.' } },
      { id: '2.4', title: { en: 'Given a scenario, analyze indicators of malicious activity.' } },
    ]);

    expect([...ids].sort()).toEqual(['2.4', '4.6']);
  });

  it('is not fooled by the phrase appearing later in a title', () => {
    const ids = scenarioObjectiveIds([
      { id: '9.9', title: { en: 'Explain what to do given a scenario involving malware.' } },
    ]);

    expect(ids.size).toBe(0);
  });

  it('tolerates leading whitespace and casing', () => {
    const ids = scenarioObjectiveIds([{ id: '4.1', title: { en: '  given a scenario, apply…' } }]);

    expect([...ids]).toEqual(['4.1']);
  });
});

describe('examRank', () => {
  it('puts a scenario question on a "Given a scenario" objective at the top', () => {
    // Not an interpretation of the exam's style — it is the exam's own instruction, verbatim.
    expect(examRank(q('4.6', 'scenario'), SCENARIO)).toBe(2);
  });

  it('treats a scenario elsewhere as an ordinary non-recall question', () => {
    expect(examRank(q('1.1', 'scenario'), SCENARIO)).toBe(1);
    expect(examRank(q('1.1', 'discrimination'), SCENARIO)).toBe(1);
  });

  it('ranks a discrimination on a scenario objective below its scenarios', () => {
    expect(examRank(q('4.6', 'discrimination'), SCENARIO)).toBeLessThan(
      examRank(q('4.6', 'scenario'), SCENARIO),
    );
  });

  it('puts recall last wherever it appears', () => {
    // Recall is how a term is learnt, which is what the quizzes are for. The real paper does not
    // ask what an acronym stands for.
    expect(examRank(q('4.6', 'recall'), SCENARIO)).toBe(0);
    expect(examRank(q('1.1', 'recall'), SCENARIO)).toBe(0);
  });
});

describe('sampleByRank', () => {
  /*
   * Each entry carries an id. Without one, five `scenario` questions are structurally identical
   * objects and a shuffled array compares deeply equal to an unshuffled one — the shuffle assertion
   * below would pass against a function that did no shuffling at all.
   */
  const pool = (['scenario', 'discrimination', 'recall'] as const).flatMap((kind) =>
    Array.from({ length: 5 }, (_, index) => ({
      ...q('4.6', kind),
      id: `${kind}-${String(index)}`,
    })),
  );
  const rank = (question: RankableQuestion) => examRank(question, SCENARIO);

  it('exhausts the highest rank before touching the next', () => {
    const drawn = sampleByRank(pool, 5, rank, createSeededRng(1));

    expect(drawn).toHaveLength(5);
    expect(drawn.every((question) => question.kind === 'scenario')).toBe(true);
  });

  it('falls through rather than returning a short paper', () => {
    /*
     * A domain whose scenario pool is thin still produces a full paper made of the most exam-like
     * questions it has. An exam that refuses to start because the corpus is uneven is worse than
     * one that is slightly less representative.
     */
    const drawn = sampleByRank(pool, 12, rank, createSeededRng(1));

    expect(drawn).toHaveLength(12);
    expect(drawn.filter((question) => question.kind === 'scenario')).toHaveLength(5);
    expect(drawn.filter((question) => question.kind === 'discrimination')).toHaveLength(5);
    expect(drawn.filter((question) => question.kind === 'recall')).toHaveLength(2);
  });

  it('reaches recall only when everything above it is spent', () => {
    const drawn = sampleByRank(pool, 10, rank, createSeededRng(1));

    expect(drawn.some((question) => question.kind === 'recall')).toBe(false);
  });

  it('gives everything it has when asked for more than the pool holds', () => {
    expect(sampleByRank(pool, 99, rank, createSeededRng(1))).toHaveLength(15);
  });

  it('shuffles within a rank, so two sittings are not the same paper', () => {
    const a = sampleByRank(pool, 12, rank, createSeededRng(1));
    const b = sampleByRank(pool, 12, rank, createSeededRng(2));

    expect(a).not.toEqual(b);
  });

  it('is deterministic for a seed', () => {
    expect(sampleByRank(pool, 12, rank, createSeededRng(7))).toEqual(
      sampleByRank(pool, 12, rank, createSeededRng(7)),
    );
  });

  it('returns nothing for a non-positive count rather than the whole pool', () => {
    expect(sampleByRank(pool, 0, rank, createSeededRng(1))).toEqual([]);
    expect(sampleByRank(pool, -4, rank, createSeededRng(1))).toEqual([]);
  });

  it('handles an empty pool', () => {
    expect(sampleByRank([], 10, rank, createSeededRng(1))).toEqual([]);
  });
});
