import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { STORE_VERSION } from './migrations';
import { DEFAULT_SETTINGS } from './settings.schema';
import { STORAGE_KEY, useAppStore } from './store';

/** Write a persisted blob in the shape zustand's `persist` middleware expects. */
function seedStorage(state: unknown, version: number = STORE_VERSION): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, version }));
}

describe('useAppStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAppStore.setState({ settings: { ...DEFAULT_SETTINGS } });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('starts from the defaults', () => {
    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('updates one setting without disturbing the others', () => {
    useAppStore.getState().setLocale('en');

    expect(useAppStore.getState().settings).toEqual({ ...DEFAULT_SETTINGS, locale: 'en' });
  });

  it('writes changes through to storage', async () => {
    useAppStore.getState().setDailyGoalXp(250);
    await useAppStore.persist.rehydrate();

    expect(localStorage.getItem(STORAGE_KEY)).toContain('250');
  });

  it('does not persist the action functions', () => {
    useAppStore.getState().setTheme('dark');

    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as {
      state?: Record<string, unknown>;
    };

    expect(Object.keys(persisted.state ?? {})).toEqual(['settings']);
  });

  it('restores a valid persisted state', async () => {
    seedStorage({ settings: { ...DEFAULT_SETTINGS, locale: 'en', theme: 'dark' } });

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().settings.locale).toBe('en');
    expect(useAppStore.getState().settings.theme).toBe('dark');
  });

  it('repairs a partially corrupt persisted state instead of discarding it', async () => {
    // A hand-edited or half-written blob should cost the bad field, not the whole session.
    seedStorage({ settings: { locale: 'en', theme: 'banana', dailyGoalXp: 'lots' } });

    await useAppStore.persist.rehydrate();

    const { settings } = useAppStore.getState();
    expect(settings.locale).toBe('en');
    expect(settings.theme).toBe(DEFAULT_SETTINGS.theme);
    expect(settings.dailyGoalXp).toBe(DEFAULT_SETTINGS.dailyGoalXp);
  });

  it('falls back to defaults when the persisted state is unusable', async () => {
    seedStorage('not an object at all');

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('falls back to defaults for a state written by a newer build', async () => {
    // Two tabs across a deploy. The older build must not guess at the newer shape.
    seedStorage({ settings: { locale: 'en' }, somethingNew: true }, STORE_VERSION + 1);

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('still renders the app when storage is entirely absent', async () => {
    localStorage.removeItem(STORAGE_KEY);

    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });

  it('resetAll returns every setting to its default', () => {
    const state = useAppStore.getState();
    state.setLocale('en');
    state.setTheme('dark');
    state.setSoundEnabled(true);

    useAppStore.getState().resetAll();

    expect(useAppStore.getState().settings).toEqual(DEFAULT_SETTINGS);
  });
});
