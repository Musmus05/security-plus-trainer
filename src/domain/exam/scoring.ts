/**
 * Turning a raw exam result into something a candidate can act on.
 *
 * The scaled score here is an **estimate produced by this app**, not a prediction of a real result,
 * and the code is written so nobody can mistake it for one.
 */

export interface ScoreScale {
  min: number;
  max: number;
}

/**
 * Map raw accuracy onto the 100–900 reporting scale, linearly.
 *
 * CompTIA does not publish its scaling. The real exam is item-weighted — harder items carry more —
 * so a reported 750 does not correspond to any fixed percentage correct, and a passing raw score
 * cannot be computed from the outside. Anyone claiming otherwise has guessed.
 *
 * Rather than guess more elaborately, this is the simplest mapping that can be stated in one line
 * and checked by the reader: the bottom of the scale is 0% and the top is 100%. Under it, the 750
 * pass mark falls at 81.25% correct — which is *this app's* threshold, and is displayed as such.
 *
 * The honest number is the raw one, which is why `scoreAttempt` returns both and the UI leads with
 * accuracy.
 */
export function scaledScore(accuracy: number, scale: ScoreScale): number {
  const clamped = Math.min(1, Math.max(0, accuracy));

  return Math.round(scale.min + clamped * (scale.max - scale.min));
}

/** The raw accuracy this app's scaling puts at a given scaled score. */
export function accuracyForScaled(scaled: number, scale: ScoreScale): number {
  return (scaled - scale.min) / (scale.max - scale.min);
}

export interface ExamAnswer {
  questionId: string;
  /** The objective the question belongs to, e.g. "4.6". */
  objective: string;
  correct: boolean;
  /** True when the candidate left it blank. Counted as wrong, reported separately. */
  unanswered: boolean;
}

export interface DomainBreakdown {
  domain: number;
  correct: number;
  total: number;
  /** 0–1, and 0 rather than NaN for a domain with no questions drawn. */
  accuracy: number;
}

export interface ExamScore {
  correct: number;
  total: number;
  unanswered: number;
  accuracy: number;
  scaled: number;
  passed: boolean;
  byDomain: DomainBreakdown[];
}

export interface ScoreOptions {
  scale: ScoreScale;
  passingScore: number;
}

export function scoreAttempt(
  answers: readonly ExamAnswer[],
  { scale, passingScore }: ScoreOptions,
): ExamScore {
  const total = answers.length;
  const correct = answers.filter((answer) => answer.correct).length;
  const accuracy = total === 0 ? 0 : correct / total;
  const scaled = scaledScore(accuracy, scale);

  const domains = new Map<number, { correct: number; total: number }>();
  for (const answer of answers) {
    // "4.6" → 4. The objective id is validated on the way into the corpus, so this cannot be NaN
    // for authored content; a hand-edited attempt is filtered before it reaches here.
    const domain = Number(answer.objective.split('.')[0]);
    const bucket = domains.get(domain) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (answer.correct) {
      bucket.correct += 1;
    }
    domains.set(domain, bucket);
  }

  return {
    correct,
    total,
    unanswered: answers.filter((answer) => answer.unanswered).length,
    accuracy,
    scaled,
    /*
     * Compared against the scaled score rather than against a raw percentage, because the pass mark
     * the candidate has in their head is 750 and the two must agree at the boundary. Deriving the
     * threshold twice — once as a score, once as a percentage — is how a result reads "748, passed".
     */
    passed: scaled >= passingScore,
    byDomain: [...domains.entries()]
      .map(([domain, { correct: right, total: count }]) => ({
        domain,
        correct: right,
        total: count,
        accuracy: count === 0 ? 0 : right / count,
      }))
      .sort((a, b) => a.domain - b.domain),
  };
}

/**
 * The weakest domains, worst first.
 *
 * Only domains that actually carried questions, and only those below the pass threshold — a
 * "revise this" list that includes something the candidate got right is a list they stop reading.
 */
export function weakestDomains(
  score: ExamScore,
  threshold: number,
  limit = 3,
): readonly DomainBreakdown[] {
  return score.byDomain
    .filter((entry) => entry.total > 0 && entry.accuracy < threshold)
    .sort((a, b) => a.accuracy - b.accuracy || a.domain - b.domain)
    .slice(0, limit);
}
