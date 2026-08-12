import { describe, expect, it } from 'vitest';

import { createSeededRng } from '@/domain/rng';

import {
  composeRank,
  examRank,
  MAX_TRACKED_SIGHTINGS,
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

describe('composeRank', () => {
  const rank2 = (seen: number) => composeRank(2, seen);
  const rank1 = (seen: number) => composeRank(1, seen);
  const rank0 = (seen: number) => composeRank(0, seen);

  it('prefers a fresher question within the same kind', () => {
    expect(rank1(0)).toBeGreaterThan(rank1(1));
    expect(rank1(1)).toBeGreaterThan(rank1(2));
  });

  it('never lets freshness rescue a recall question', () => {
    /*
     * The one rule freshness may not override. Never-seen recall questions are the freshest thing
     * in the corpus, so if freshness won here a second paper would fill with "what does SIEM stand
     * for" — undoing the reason the exam ranks at all.
     */
    expect(rank0(0)).toBeLessThan(rank1(MAX_TRACKED_SIGHTINGS));
    expect(rank0(0)).toBe(rank0(MAX_TRACKED_SIGHTINGS));
  });

  it('prefers a fresh discrimination over a stale scenario', () => {
    /*
     * This ordering was the other way round at first and it was wrong in practice: 2.4 is the only
     * "Given a scenario" objective in domain 2, so its scenarios were the entire top rank for a
     * paper needing twenty questions — all of them drawn whether or not the learner had just
     * drilled that objective's quiz. Both kinds are exam-like; only one of them has already been
     * answered ten minutes ago.
     */
    expect(rank1(0)).toBeGreaterThan(rank2(1));
  });

  it('breaks a freshness tie towards the scenario', () => {
    expect(rank2(1)).toBeGreaterThan(rank1(1));
    expect(rank2(0)).toBeGreaterThan(rank1(0));
  });

  it('stops distinguishing beyond the tracked range', () => {
    // Past three, "seen a lot" is one bucket; the exam needs freshest-first, not a full history.
    expect(rank1(MAX_TRACKED_SIGHTINGS)).toBe(rank1(MAX_TRACKED_SIGHTINGS + 50));
  });

  it('treats a negative count as never seen rather than as extra freshness', () => {
    // A hand-edited store could hold one, and it must not outrank a genuinely unseen question.
    expect(rank1(-5)).toBe(rank1(0));
  });

  it('is monotonic in freshness for a fixed kind', () => {
    for (let seen = 0; seen < 6; seen += 1) {
      expect(rank1(seen)).toBeGreaterThanOrEqual(rank1(seen + 1));
    }
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
