/**
 * Storage resolution.
 *
 * Reading `window.localStorage` is not safe to do unguarded. It is `undefined` or throws when:
 *
 * - Safari is in private browsing with storage disabled — access *throws* a SecurityError rather
 *   than returning null, so even a truthiness check is not enough;
 * - the page is sandboxed or served from an opaque origin;
 * - a browser has evicted the origin's quota.
 *
 * In every one of those cases a study app should still open and work for the session, losing
 * persistence rather than the whole screen. So the resolution below probes storage with a real
 * write and falls back to an in-memory implementation that satisfies the same interface.
 */

/** The subset of the `Storage` interface the persist middleware uses. */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export function createMemoryStorage(): KeyValueStorage {
  const entries = new Map<string, string>();

  return {
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
}

/** True when the candidate can actually be written to, not merely when it exists. */
function isUsable(candidate: KeyValueStorage | undefined): candidate is KeyValueStorage {
  if (candidate === undefined) {
    return false;
  }

  const probe = '__sp_probe__';
  try {
    candidate.setItem(probe, probe);
    candidate.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

let resolved: KeyValueStorage | undefined;

/**
 * The storage the app persists to. Resolved once, then reused.
 *
 * Falls back to memory rather than throwing: the learner keeps a working session and loses only
 * the ability to close the tab and come back.
 */
export function resolveStorage(): KeyValueStorage {
  if (resolved !== undefined) {
    return resolved;
  }

  let candidate: KeyValueStorage | undefined;
  try {
    candidate = (globalThis as { localStorage?: KeyValueStorage }).localStorage;
  } catch {
    // Access itself threw. Safari private browsing does this.
    candidate = undefined;
  }

  resolved = isUsable(candidate) ? candidate : createMemoryStorage();
  return resolved;
}

/** Test seam: drops the cached resolution so a suite can swap the backing store. */
export function resetStorageForTests(): void {
  resolved = undefined;
}
