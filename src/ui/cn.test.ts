import { describe, expect, it } from 'vitest';

import { cn } from './cn';

/**
 * Conditions come in through parameters rather than local literals: a `const x = false` is folded
 * by the compiler, so the test would assert nothing and the linter rightly complains.
 */
const rowClasses = (collapsed: boolean, extra?: string | null): string =>
  cn('rounded', collapsed && 'hidden', extra, 'border');

describe('cn', () => {
  it("lets a caller's utility win over a component default", () => {
    // The whole reason this helper exists instead of a template string.
    expect(cn('px-4 py-2', 'px-6')).toBe('py-2 px-6');
  });

  it('keeps a truthy branch and drops a falsy one', () => {
    expect(rowClasses(true)).toBe('rounded hidden border');
    expect(rowClasses(false)).toBe('rounded border');
  });

  it('ignores null and undefined slots', () => {
    expect(rowClasses(false, null)).toBe('rounded border');
    expect(rowClasses(false, undefined)).toBe('rounded border');
  });

  it('flattens conditional objects and arrays', () => {
    expect(cn(['flex', { hidden: false, 'gap-2': true }])).toBe('flex gap-2');
  });
});
