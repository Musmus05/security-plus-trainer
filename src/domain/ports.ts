/**
 * Ports the pure core needs from the impure world.
 *
 * `src/domain/**` may not read the clock or call `Math.random()` — a lint rule enforces it. That
 * is not purism: streaks, spaced repetition, exam sampling and the exam timer are all either
 * time- or chance-dependent, and each is exactly the kind of logic that is impossible to trust
 * without deterministic tests. Injecting these two ports is what makes "a card graded *hard* on
 * 12 March is due again on 14 March" an assertion instead of a hope.
 *
 * Implementations live in `src/lib`.
 */

export interface Clock {
  /** Milliseconds since the Unix epoch. */
  now(): number;

  /**
   * The learner's current calendar day as `YYYY-MM-DD`, in *their* timezone.
   *
   * Streaks are counted in local days, so this cannot be derived from `now()` inside the domain
   * without dragging timezone handling in with it. The adapter resolves the timezone; the domain
   * only ever compares day keys as strings.
   */
  localDayKey(): string;
}

export interface Rng {
  /** A number in [0, 1). */
  next(): number;
}
