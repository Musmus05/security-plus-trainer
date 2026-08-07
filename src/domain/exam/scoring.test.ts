import { describe, expect, it } from 'vitest';

import {
  accuracyForScaled,
  type ExamAnswer,
  scaledScore,
  scoreAttempt,
  weakestDomains,
} from './scoring';

const SCALE = { min: 100, max: 900 };
const OPTIONS = { scale: SCALE, passingScore: 750 };

const answer = (objective: string, correct: boolean, unanswered = false): ExamAnswer => ({
  questionId: `q-${objective}-${String(Math.abs(objective.length))}${String(correct)}`,
  objective,
  correct,
  unanswered,
});

/** `n` answers for an objective, the first `right` of them correct. */
function answers(objective: string, count: number, right: number): ExamAnswer[] {
  return Array.from({ length: count }, (_, index) => ({
    questionId: `q-${objective}-${String(index)}`,
    objective,
    correct: index < right,
    unanswered: false,
  }));
}

describe('scaledScore', () => {
  it('anchors both ends of the reporting scale', () => {
    expect(scaledScore(0, SCALE)).toBe(100);
    expect(scaledScore(1, SCALE)).toBe(900);
  });

  it('clamps rather than running off the scale', () => {
    expect(scaledScore(-0.5, SCALE)).toBe(100);
    expect(scaledScore(1.5, SCALE)).toBe(900);
  });

  it('places the 750 pass mark at 81.25% under this app’s own mapping', () => {
    /*
     * Stated here so it can be checked by a reader rather than trusted. CompTIA does not publish
     * its scaling — the real exam is item-weighted, so a reported 750 corresponds to no fixed
     * percentage. This is *this app's* threshold and is labelled as an estimate wherever shown.
     */
    expect(accuracyForScaled(750, SCALE)).toBeCloseTo(0.8125, 6);
    expect(scaledScore(0.8125, SCALE)).toBe(750);

    /*
     * A rounding half-step below, not one ten-thousandth below. `scaledScore` rounds, so anything
     * from 0.811875 up already reports 750 and therefore passes. That is deliberate and consistent:
     * the pass decision is made on the number the candidate is shown, so the two cannot disagree.
     */
    expect(scaledScore(0.81, SCALE)).toBeLessThan(750);
  });

  it('is monotonic', () => {
    let previous = -1;
    for (let i = 0; i <= 100; i += 1) {
      const value = scaledScore(i / 100, SCALE);
      expect(value).toBeGreaterThanOrEqual(previous);
      previous = value;
    }
  });
});

describe('scoreAttempt', () => {
  it('counts correct answers and derives accuracy', () => {
    const score = scoreAttempt([...answers('1.1', 4, 3)], OPTIONS);

    expect(score.correct).toBe(3);
    expect(score.total).toBe(4);
    expect(score.accuracy).toBe(0.75);
  });

  it('reports blanks separately while still counting them wrong', () => {
    const score = scoreAttempt(
      [answer('1.1', true), answer('1.2', false, true), answer('1.3', false)],
      OPTIONS,
    );

    expect(score.unanswered).toBe(1);
    expect(score.correct).toBe(1);
  });

  it('decides pass or fail on the scaled score, not on a second threshold', () => {
    /*
     * The candidate has 750 in their head, so the boundary the app draws has to be the same one it
     * displays. Deriving the threshold twice — once as a score, once as a percentage — is how a
     * result screen ends up reading "748 · passed".
     */
    const justUnder = scoreAttempt(answers('1.1', 100, 81), OPTIONS);
    const justOver = scoreAttempt(answers('1.1', 100, 82), OPTIONS);

    expect(justUnder.scaled).toBeLessThan(750);
    expect(justUnder.passed).toBe(false);
    expect(justOver.scaled).toBeGreaterThanOrEqual(750);
    expect(justOver.passed).toBe(true);
  });

  it('breaks the result down by domain, in domain order', () => {
    const score = scoreAttempt(
      [...answers('4.6', 10, 4), ...answers('1.2', 5, 5), ...answers('2.3', 5, 2)],
      OPTIONS,
    );

    expect(score.byDomain.map((entry) => entry.domain)).toEqual([1, 2, 4]);
    expect(score.byDomain.find((entry) => entry.domain === 4)).toEqual({
      domain: 4,
      correct: 4,
      total: 10,
      accuracy: 0.4,
    });
  });

  it('folds every objective of a domain into one row', () => {
    const score = scoreAttempt([...answers('4.1', 4, 2), ...answers('4.9', 6, 3)], OPTIONS);

    expect(score.byDomain).toHaveLength(1);
    expect(score.byDomain[0]).toMatchObject({ domain: 4, correct: 5, total: 10 });
  });

  it('returns zeroes rather than NaN for an empty attempt', () => {
    const score = scoreAttempt([], OPTIONS);

    expect(score.accuracy).toBe(0);
    expect(score.scaled).toBe(100);
    expect(score.passed).toBe(false);
    expect(score.byDomain).toEqual([]);
  });
});

describe('weakestDomains', () => {
  const score = scoreAttempt(
    [
      ...answers('1.1', 10, 9),
      ...answers('2.1', 10, 3),
      ...answers('3.1', 10, 5),
      ...answers('4.1', 10, 1),
    ],
    OPTIONS,
  );

  it('lists the worst first', () => {
    expect(weakestDomains(score, 0.8).map((entry) => entry.domain)).toEqual([4, 2, 3]);
  });

  it('leaves out domains at or above the threshold', () => {
    // A "revise this" list that includes something they got right is a list they stop reading.
    expect(weakestDomains(score, 0.8).some((entry) => entry.domain === 1)).toBe(false);
  });

  it('respects the limit', () => {
    expect(weakestDomains(score, 1, 2)).toHaveLength(2);
  });

  it('is empty when every domain cleared the threshold', () => {
    expect(weakestDomains(score, 0.05)).toEqual([]);
  });
});
