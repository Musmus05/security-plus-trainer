import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { createMemoryStorage, resetStorageForTests, resolveStorage } from './storage';

describe('createMemoryStorage', () => {
  it('round-trips a value', () => {
    const storage = createMemoryStorage();
    storage.setItem('k', 'v');

    expect(storage.getItem('k')).toBe('v');
  });

  it('returns null for a missing key rather than undefined', () => {
    // The Storage interface returns null, and persist middleware distinguishes the two.
    expect(createMemoryStorage().getItem('nope')).toBeNull();
  });

  it('removes and clears', () => {
    const storage = createMemoryStorage();
    storage.setItem('a', '1');
    storage.setItem('b', '2');

    storage.removeItem('a');
    expect(storage.getItem('a')).toBeNull();
    expect(storage.getItem('b')).toBe('2');

    storage.clear();
    expect(storage.getItem('b')).toBeNull();
  });

  it('keeps instances independent', () => {
    const first = createMemoryStorage();
    const second = createMemoryStorage();
    first.setItem('k', 'v');

    expect(second.getItem('k')).toBeNull();
  });
});

describe('resolveStorage', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');

  beforeEach(() => {
    resetStorageForTests();
  });

  afterEach(() => {
    if (original) {
      Object.defineProperty(globalThis, 'localStorage', original);
    }
    resetStorageForTests();
  });

  it('uses the ambient storage when it works', () => {
    const storage = resolveStorage();
    storage.setItem('probe', 'yes');

    expect(globalThis.localStorage.getItem('probe')).toBe('yes');
    globalThis.localStorage.removeItem('probe');
  });

  it('caches the resolution', () => {
    expect(resolveStorage()).toBe(resolveStorage());
  });

  it('falls back to memory when storage is missing', () => {
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: undefined });

    const storage = resolveStorage();
    storage.setItem('k', 'v');

    expect(storage.getItem('k')).toBe('v');
  });

  it('falls back to memory when reading the property throws', () => {
    // Safari in private browsing throws a SecurityError on *access*, so a truthiness check on
    // `window.localStorage` is not enough — the read itself has to be wrapped.
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('SecurityError: storage is disabled');
      },
    });

    expect(() => resolveStorage()).not.toThrow();
    expect(resolveStorage().getItem('anything')).toBeNull();
  });

  it('falls back to memory when writing throws despite the object existing', () => {
    // The over-quota case: the object is present and reads fine, but every write throws.
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => {
          throw new Error('QuotaExceededError');
        },
        removeItem: () => undefined,
        clear: () => undefined,
      },
    });

    const storage = resolveStorage();

    expect(() => {
      storage.setItem('k', 'v');
    }).not.toThrow();
    expect(storage.getItem('k')).toBe('v');
  });
});
