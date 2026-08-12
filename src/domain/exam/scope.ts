import { type Allocation, allocate, type WeightedDomain } from './sampler';

/**
 * What an exam attempt covers.
 *
 * `'full'` is the real thing: 90 questions across all five domains at the official weights. A
 * number is a single-domain paper — "sit the domain 1 portion of the exam, on its own clock".
 *
 * A domain paper exists because a full mock costs ninety minutes, and ninety minutes is a
 * commitment nobody makes on a weekday evening. Revising domain 4 alone should not require sitting
 * the other four.
 */
export type ExamScope = 'full' | number;

export function isDomainScope(scope: ExamScope): scope is number {
  return scope !== 'full';
}

/**
 * How many questions an exam of this scope draws from each domain.
 *
 * A domain paper draws **exactly the number that domain contributes to the real exam** — 11 for
 * domain 1, 25 for domain 4, and so on. That is the one non-arbitrary size available: any round
 * number would be invented, and this one answers the question a candidate actually has, which is
 * "can I handle my share of the paper".
 */
export function allocationFor(
  scope: ExamScope,
  domains: readonly WeightedDomain[],
  totalQuestions: number,
): Allocation[] {
  const full = allocate(domains, totalQuestions);

  if (!isDomainScope(scope)) {
    return full;
  }

  return full.filter((entry) => entry.domain === scope);
}

export function questionCountFor(allocation: readonly Allocation[]): number {
  return allocation.reduce((sum, entry) => sum + entry.count, 0);
}

/**
 * How long an exam of this length gets.
 *
 * Derived from the real exam's own budget rather than chosen: 90 questions in 90 minutes is one
 * minute each, so a 25-question domain paper gets 25 minutes. Inventing a round number would
 * quietly change the pressure the paper is supposed to rehearse — and time pressure is half of
 * what makes a mock exam worth sitting.
 */
export function durationMsFor(
  questionCount: number,
  examQuestions: number,
  examDurationMinutes: number,
): number {
  if (examQuestions <= 0) {
    return 0;
  }

  const minutesPerQuestion = examDurationMinutes / examQuestions;

  return Math.round(questionCount * minutesPerQuestion) * 60 * 1000;
}

/** Parse a scope out of a URL segment. Returns null for anything that is not one. */
export function parseScope(
  segment: string | undefined,
  domainIds: readonly number[],
): ExamScope | null {
  if (segment === undefined || segment === 'full') {
    return 'full';
  }

  const domain = Number(segment);

  return domainIds.includes(domain) ? domain : null;
}
