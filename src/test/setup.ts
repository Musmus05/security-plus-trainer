import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/*
 * Give the test environment a working `localStorage`.
 *
 * Node 26 installs its own `localStorage` global, gated behind the `--localstorage-file` flag. With
 * the flag absent the property exists but resolves to `undefined`, and since Vitest's jsdom
 * environment makes `window` and `globalThis` the same object, it shadows jsdom's implementation on
 * both. `sessionStorage` is unaffected, which is what makes the failure confusing: one works and
 * the other silently does not.
 *
 * Node's own implementation is file-backed and would be shared between parallel workers, so it is
 * the wrong tool here regardless. An in-memory implementation is isolated per worker, deterministic,
 * and exercises exactly the code path a browser takes.
 */
function installMemoryLocalStorage(): void {
  const entries = new Map<string, string>();

  const storage: Storage = {
    get length() {
      return entries.size;
    },
    key: (index) => [...entries.keys()][index] ?? null,
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => {
      entries.set(key, value);
    },
    removeItem: (key) => {
      entries.delete(key);
    },
    clear: () => {
      entries.clear();
    },
  };

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    writable: true,
    value: storage,
  });
}

installMemoryLocalStorage();

afterEach(() => {
  cleanup();
});
