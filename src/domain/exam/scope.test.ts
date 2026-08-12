import { describe, expect, it } from 'vitest';

import type { WeightedDomain } from './sampler';
import { allocationFor, durationMsFor, isDomainScope, parseScope, questionCountFor } from './scope';

const OFFICIAL: WeightedDomain[] = [
  { domain: 1, weight: 0.12 },
  { domain: 2, weight: 0.22 },
  { domain: 3, weight: 0.18 },
  { domain: 4, weight: 0.28 },
  { domain: 5, weight: 0.2 },
];
const DOMAIN_IDS = [1, 2, 3, 4, 5];

describe('isDomainScope', () => {
  it('separates the full paper from a single domain', () => {
    expect(isDomainScope('full')).toBe(false);
    expect(isDomainScope(4)).toBe(true);
  });
});

describe('allocationFor', () => {
  it('gives the whole official split for the full exam', () => {
    expect(questionCountFor(allocationFor('full', OFFICIAL, 90))).toBe(90);
    expect(allocationFor('full', OFFICIAL, 90)).toHaveLength(5);
  });

  it('gives a domain exactly its share of the real exam', () => {
    /*
     * The one non-arbitrary size available. Any round number would be invented, and this one
     * answers the question a candidate actually has: can I handle my share of the paper.
     */
    expect(allocationFor(1, OFFICIAL, 90)).toEqual([{ domain: 1, count: 11 }]);
    expect(allocationFor(4, OFFICIAL, 90)).toEqual([{ domain: 4, count: 25 }]);
    expect(allocationFor(5, OFFICIAL, 90)).toEqual([{ domain: 5, count: 18 }]);
  });

  it('the five domain papers add up to the full paper', () => {
    // If they ever stop agreeing, one of the two is drawing from a distribution nobody chose.
    const perDomain = DOMAIN_IDS.reduce(
      (sum, domain) => sum + questionCountFor(allocationFor(domain, OFFICIAL, 90)),
      0,
    );

    expect(perDomain).toBe(questionCountFor(allocationFor('full', OFFICIAL, 90)));
  });

  it('returns nothing for a domain that is not in the outline', () => {
    expect(allocationFor(9, OFFICIAL, 90)).toEqual([]);
    expect(questionCountFor(allocationFor(9, OFFICIAL, 90))).toBe(0);
  });
});

describe('durationMsFor', () => {
  it('keeps the real exam’s minute per question', () => {
    // 90 questions in 90 minutes. A domain paper inherits the pressure rather than inventing one.
    expect(durationMsFor(90, 90, 90)).toBe(90 * 60 * 1000);
    expect(durationMsFor(25, 90, 90)).toBe(25 * 60 * 1000);
    expect(durationMsFor(11, 90, 90)).toBe(11 * 60 * 1000);
  });

  it('scales with a different exam budget rather than hard-coding one minute', () => {
    // If CompTIA changes the paper to 60 questions in 90 minutes, a 20-question paper gets 30.
    expect(durationMsFor(20, 60, 90)).toBe(30 * 60 * 1000);
  });

  it('rounds to whole minutes, so the clock never starts on a fraction', () => {
    expect(durationMsFor(7, 90, 90) % 60_000).toBe(0);
    expect(durationMsFor(13, 60, 90) % 60_000).toBe(0);
  });

  it('returns zero rather than dividing by zero on a degenerate exam', () => {
    expect(durationMsFor(10, 0, 90)).toBe(0);
  });
});

describe('parseScope', () => {
  it('reads a domain number out of the URL', () => {
    expect(parseScope('3', DOMAIN_IDS)).toBe(3);
  });

  it('treats a missing segment and "full" as the whole paper', () => {
    expect(parseScope(undefined, DOMAIN_IDS)).toBe('full');
    expect(parseScope('full', DOMAIN_IDS)).toBe('full');
  });

  it('rejects anything that is not a real domain', () => {
    // A guessed URL should 404 rather than silently start an empty exam.
    for (const segment of ['9', '0', '-1', '1.5', 'four', '']) {
      expect(parseScope(segment, DOMAIN_IDS), segment).toBeNull();
    }
  });
});
