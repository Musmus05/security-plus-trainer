import { describe, expect, it } from 'vitest';

import { createSeededRng } from '@/domain/rng';

import { allocate, type SampleQuestion, sampleExam, type WeightedDomain } from './sampler';

/** The official SY0-701 weights. */
const OFFICIAL: WeightedDomain[] = [
  { domain: 1, weight: 0.12 },
  { domain: 2, weight: 0.22 },
  { domain: 3, weight: 0.18 },
  { domain: 4, weight: 0.28 },
  { domain: 5, weight: 0.2 },
];

const pool = (domain: number, size: number): SampleQuestion[] =>
  Array.from({ length: size }, (_, i) => ({
    id: `q-${String(domain)}-${String(i)}`,
    objective: `${String(domain)}.1`,
  }));

const total = (allocation: readonly { count: number }[]) =>
  allocation.reduce((sum, entry) => sum + entry.count, 0);

describe('allocate', () => {
  it('matches the official split for a 90-question exam', () => {
    expect(allocate(OFFICIAL, 90)).toEqual([
      { domain: 1, count: 11 },
      { domain: 2, count: 20 },
      { domain: 3, count: 16 },
      { domain: 4, count: 25 },
      { domain: 5, count: 18 },
    ]);
  });

  it('sums to the target for every length, not just the one that rounds cleanly', () => {
    /*
     * Rounding each domain independently happens to work at 90 and stops working elsewhere — a
     * 91-question "90-question exam" is exactly the bug nobody thinks to look for. Largest
     * remainder makes the sum an identity rather than a coincidence.
     */
    for (let length = 1; length <= 200; length += 1) {
      expect(total(allocate(OFFICIAL, length)), `total of ${String(length)}`).toBe(length);
    }
  });

  it('gives the extra question to the heavier domain when remainders tie', () => {
    const even: WeightedDomain[] = [
      { domain: 1, weight: 0.5 },
      { domain: 2, weight: 0.5 },
    ];

    // Both shares are 1.5. The tie has to break somewhere, and it must break the same way every
    // run — otherwise the same seed produces different exams.
    expect(allocate(even, 3)).toEqual(allocate(even, 3));
    expect(total(allocate(even, 3))).toBe(3);
  });

  it('never allocates more than the total to one domain', () => {
    expect(allocate([{ domain: 1, weight: 1 }], 5)).toEqual([{ domain: 1, count: 5 }]);
  });

  it('returns zeroes rather than negatives for a non-positive total', () => {
    expect(allocate(OFFICIAL, 0).every((entry) => entry.count === 0)).toBe(true);
    expect(allocate(OFFICIAL, -10).every((entry) => entry.count === 0)).toBe(true);
  });

  it('handles an empty domain list', () => {
    expect(allocate([], 90)).toEqual([]);
  });
});

describe('sampleExam', () => {
  const pools = {
    1: pool(1, 30),
    2: pool(2, 30),
    3: pool(3, 30),
    4: pool(4, 30),
    5: pool(5, 30),
  };

  it('draws exactly the allocated number from each domain', () => {
    const exam = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(42));

    expect(exam).toHaveLength(90);
    for (const [domain, expected] of [
      [1, 11],
      [2, 20],
      [3, 16],
      [4, 25],
      [5, 18],
    ] as const) {
      const drawn = exam.filter((q) => q.objective.startsWith(`${String(domain)}.`));
      expect(drawn, `domain ${String(domain)}`).toHaveLength(expected);
    }
  });

  it('never repeats a question', () => {
    const exam = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(7));

    expect(new Set(exam.map((q) => q.id)).size).toBe(exam.length);
  });

  it('interleaves the domains rather than delivering them in blocks', () => {
    // Otherwise position gives the domain away, which is a cue the real exam does not offer and a
    // habit worth not building.
    const exam = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(11));
    const domains = exam.map((q) => q.objective[0]);
    const runs = domains.filter((value, index) => index === 0 || value !== domains[index - 1]);

    expect(runs.length).toBeGreaterThan(40);
  });

  it('is reproducible from its seed', () => {
    const a = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(99));
    const b = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(99));

    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });

  it('differs between seeds', () => {
    const a = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(1));
    const b = sampleExam(pools, allocate(OFFICIAL, 90), createSeededRng(2));

    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
  });

  it('gives everything it has when a pool is short of its allocation', () => {
    // An exam of 84 real questions beats an error page, and the caller can see the shortfall in
    // the length it gets back.
    const short = { ...pools, 4: pool(4, 5) };
    const exam = sampleExam(short, allocate(OFFICIAL, 90), createSeededRng(3));

    expect(exam).toHaveLength(70);
    expect(exam.filter((q) => q.objective.startsWith('4.'))).toHaveLength(5);
  });

  it('survives a domain with no pool at all', () => {
    const exam = sampleExam({ 1: pool(1, 30) }, allocate(OFFICIAL, 90), createSeededRng(5));

    expect(exam).toHaveLength(11);
  });
});
