import { describe, expect, it, vi } from 'vitest';

import { type Migration, MIGRATIONS, runMigrations, STORE_VERSION } from './migrations';

describe('runMigrations', () => {
  it('returns the state untouched when it is already current', () => {
    const state = { settings: { locale: 'fr' } };

    expect(runMigrations(state, STORE_VERSION)).toEqual({ state, discarded: false });
  });

  it('applies steps in order, feeding each the previous output', () => {
    const migrations: Record<number, Migration> = {
      1: (state) => ({ ...(state as object), touchedBy1: true }),
      2: (state) => ({ ...(state as object), touchedBy2: true }),
      3: (state) => ({ ...(state as object), touchedBy3: true }),
    };

    const outcome = runMigrations({ original: true }, 1, 4, migrations);

    expect(outcome.discarded).toBe(false);
    expect(outcome.state).toEqual({
      original: true,
      touchedBy1: true,
      touchedBy2: true,
      touchedBy3: true,
    });
  });

  it('runs only the steps needed to reach the target', () => {
    const step1 = vi.fn((state: unknown) => state);
    const step2 = vi.fn((state: unknown) => state);

    runMigrations({}, 2, 3, { 1: step1, 2: step2 });

    expect(step1).not.toHaveBeenCalled();
    expect(step2).toHaveBeenCalledOnce();
  });

  it('discards the state when a step in the chain is missing', () => {
    // Guessing at an unrecognised shape is how corrupt data spreads. Better to lose the
    // preferences than to hand a half-understood object to the app.
    const outcome = runMigrations({ some: 'state' }, 1, 3, { 1: (state) => state });

    expect(outcome).toEqual({ state: undefined, discarded: true });
  });

  it('discards a state written by a newer build', () => {
    // Two tabs open across a deploy: the old tab must not try to downgrade the new tab's data.
    const outcome = runMigrations({ from: 'the future' }, STORE_VERSION + 3);

    expect(outcome).toEqual({ state: undefined, discarded: true });
  });
});

describe('the migration table', () => {
  it('has a step for every version below the current one', () => {
    // This is the guard the review gate leans on: bump STORE_VERSION without writing the
    // migration and this test fails immediately.
    for (let version = 1; version < STORE_VERSION; version += 1) {
      expect(MIGRATIONS[version], `missing migration from version ${String(version)}`).toBeTypeOf(
        'function',
      );
    }
  });
});
