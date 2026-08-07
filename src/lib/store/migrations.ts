/**
 * Persisted-state migrations.
 *
 * Losing a learner's streak, XP and spaced-repetition schedule to a deployment is not an
 * acceptable failure mode, so every change to the persisted shape ships a migration and a test
 * that migrates a fixture of the previous shape. `CONTRIBUTING.md` makes that a review gate.
 *
 * The runner is separated from the migration table so the mechanism can be tested with synthetic
 * steps. There is deliberately no invented `0 → 1` migration: version 1 is the first persisted
 * shape, and writing a fake predecessor just to have something to test would prove nothing.
 */

export const STORE_VERSION = 3;

export type Migration = (state: unknown) => unknown;

/** Keyed by the version being migrated *from*. */
export const MIGRATIONS: Record<number, Migration> = {
  /**
   * 1 → 2: gamification and per-objective progress joined settings.
   *
   * Purely additive, so nothing is rewritten — the two new keys are simply absent, and `merge`
   * coerces a missing key to its initial value. The migration exists anyway rather than relying on
   * that: a version bump with no entry here is treated as unrecoverable and discards the learner's
   * settings, which is a bad way to find out the table was not updated.
   */
  1: (state) => state,

  /**
   * 2 → 3: the spaced-repetition schedule joined the persisted state.
   *
   * Additive again, and listed for the same reason: an absent entry here is not treated as "nothing
   * to do", it is treated as unrecoverable, and the learner loses their streak, XP and progress.
   */
  2: (state) => state,
};

export interface MigrationOutcome {
  state: unknown;
  /**
   * True when the chain could not be completed and the caller should fall back to a fresh state.
   * A missing step is not recoverable: guessing at an unknown shape is how corrupt data spreads.
   */
  discarded: boolean;
}

export function runMigrations(
  persisted: unknown,
  fromVersion: number,
  toVersion: number = STORE_VERSION,
  migrations: Record<number, Migration> = MIGRATIONS,
): MigrationOutcome {
  // A state from the future belongs to a newer build than this one — most likely the learner has
  // an older tab open. Its shape is unknown, so it is discarded rather than downgraded.
  if (fromVersion > toVersion) {
    return { state: undefined, discarded: true };
  }

  let state = persisted;

  for (let version = fromVersion; version < toVersion; version += 1) {
    const step = migrations[version];
    if (step === undefined) {
      return { state: undefined, discarded: true };
    }
    state = step(state);
  }

  return { state, discarded: false };
}
