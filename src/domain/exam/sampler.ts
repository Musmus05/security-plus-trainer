import type { Rng } from '@/domain/ports';
import { sample, shuffle } from '@/domain/shuffle';

/**
 * Drawing a mock exam at the official domain weights.
 *
 * Pure. The whole point of putting it here is that "exactly 25 of the 90 questions came from
 * domain 4" is an equality a test can assert, not a statistic it has to sample.
 */

export interface WeightedDomain {
  domain: number;
  /** Share of the exam, 0–1. The five official weights sum to 1. */
  weight: number;
}

export interface Allocation {
  domain: number;
  count: number;
}

/**
 * Split `total` questions between domains by weight, exactly.
 *
 * Largest remainder, not `Math.round` per domain. Rounding each share independently does not have
 * to sum to the total — the five SY0-701 weights happen to round cleanly to 90, but that is luck,
 * and it stops being true the moment the exam is shortened for a practice mode or CompTIA reweights
 * a domain. A 91-question "90-question exam" is the kind of bug nobody looks for.
 *
 * Ties in the remainder break towards the heavier domain, then by domain number, so the allocation
 * is deterministic rather than dependent on sort stability.
 */
export function allocate(domains: readonly WeightedDomain[], total: number): Allocation[] {
  if (total <= 0 || domains.length === 0) {
    return domains.map(({ domain }) => ({ domain, count: 0 }));
  }

  const exact = domains.map(({ domain, weight }) => ({ domain, weight, share: weight * total }));
  const floors = exact.map((entry) => ({ ...entry, count: Math.floor(entry.share) }));

  let remaining = total - floors.reduce((sum, entry) => sum + entry.count, 0);

  const byRemainder = [...floors].sort((a, b) => {
    const remainderA = a.share - Math.floor(a.share);
    const remainderB = b.share - Math.floor(b.share);
    return remainderB - remainderA || b.weight - a.weight || a.domain - b.domain;
  });

  for (const entry of byRemainder) {
    if (remaining <= 0) {
      break;
    }
    entry.count += 1;
    remaining -= 1;
  }

  return floors.map(({ domain, count }) => ({ domain, count }));
}

export interface SampleQuestion {
  id: string;
  objective: string;
}

/**
 * Draw an exam from per-domain pools.
 *
 * A domain whose pool is smaller than its allocation contributes everything it has rather than
 * failing: an exam of 84 real questions is more useful than an error page, and the caller is told
 * how many were actually drawn so the shortfall can be surfaced instead of hidden.
 *
 * The final order is shuffled across domains. Delivering all of domain 1 and then all of domain 2
 * would let a candidate infer the domain from the position, which is a cue the real exam does not
 * give and a habit worth not building.
 */
export function sampleExam<Q extends SampleQuestion>(
  pools: Readonly<Record<number, readonly Q[]>>,
  allocation: readonly Allocation[],
  rng: Rng,
): Q[] {
  const drawn = allocation.flatMap(({ domain, count }) => sample(pools[domain] ?? [], count, rng));

  return shuffle(drawn, rng);
}
