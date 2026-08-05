import { describe, expect, it } from 'vitest';

import { DOMAIN_IDS, domainAccent, isDomainId } from './domain-accent';

describe('domain accents', () => {
  it('covers the five exam domains', () => {
    expect(DOMAIN_IDS).toEqual([1, 2, 3, 4, 5]);
  });

  it('gives each domain a distinct set of utilities', () => {
    const backgrounds = DOMAIN_IDS.map((id) => domainAccent(id).bg);

    expect(new Set(backgrounds).size).toBe(DOMAIN_IDS.length);
  });

  it('rejects values outside the exam structure', () => {
    expect(isDomainId(0)).toBe(false);
    expect(isDomainId(6)).toBe(false);
    expect(isDomainId(1.5)).toBe(false);
  });

  it('accepts every real domain number', () => {
    for (const id of DOMAIN_IDS) {
      expect(isDomainId(id)).toBe(true);
    }
  });
});
