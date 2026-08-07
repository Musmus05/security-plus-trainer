import { describe, expect, it } from 'vitest';

import {
  type AcronymLike,
  fold,
  groupByInitial,
  mentions,
  scoreEntry,
  searchAcronyms,
  tokenise,
} from './search';

const entry = (acronym: string, en: string, fr = ''): AcronymLike => ({ acronym, en, fr });

describe('fold', () => {
  it('strips diacritics so an unaccented query still matches', () => {
    expect(fold('Intégrité')).toBe('integrite');
    expect(fold('Autorisation')).toBe('autorisation');
  });

  it('leaves the acronym alphabet alone', () => {
    expect(fold('AES-256')).toBe('aes-256');
    expect(fold('S/MIME')).toBe('s/mime');
  });
});

describe('tokenise', () => {
  it('keeps the characters acronyms are made of', () => {
    // If any of these split, the objective mapping silently loses the entry.
    expect(tokenise('AES-256')).toEqual(['AES-256']);
    expect(tokenise('S/MIME')).toEqual(['S/MIME']);
    expect(tokenise('IEEE 802.1X')).toEqual(['IEEE', '802.1X']);
  });

  it('treats punctuation around a term as a separator', () => {
    expect(tokenise('Availability (CIA)')).toEqual(['Availability', 'CIA']);
  });

  it('drops empty tokens rather than returning blanks', () => {
    expect(tokenise('  ,  ')).toEqual([]);
    expect(tokenise('')).toEqual([]);
  });
});

describe('mentions', () => {
  it('finds a term named in an official topic string', () => {
    expect(mentions('Confidentiality, Integrity, and Availability (CIA)', 'CIA')).toBe(true);
  });

  it('does not match a substring of a longer word', () => {
    // The failure this prevents: "AI" matching "chain", "AIS" and "available", which would put
    // roughly a third of the list on every objective.
    expect(mentions('Supply chain analysis', 'AI')).toBe(false);
    expect(mentions('Automated Indicator Sharing', 'AI')).toBe(false);
  });

  it('is case sensitive, because acronyms are', () => {
    expect(mentions('it infrastructure', 'IT')).toBe(false);
    expect(mentions('IT infrastructure', 'IT')).toBe(true);
  });

  it('matches a multi-word acronym as a consecutive run', () => {
    // Two entries in the official list contain a space, and a naive equality test loses both.
    expect(mentions('Compliance with PCI DSS requirements', 'PCI DSS')).toBe(true);
    expect(mentions('PCI compliance and DSS scoping', 'PCI DSS')).toBe(false);
  });

  it('does not run past the end of the text', () => {
    expect(mentions('PCI', 'PCI DSS')).toBe(false);
  });

  it('reports nothing for an empty needle', () => {
    expect(mentions('anything at all', '')).toBe(false);
  });
});

describe('scoreEntry', () => {
  it('ranks an exact acronym above a prefix above a containment', () => {
    const query = 'AES';
    const exact = scoreEntry(entry('AES', 'Advanced Encryption Standard'), query);
    const prefix = scoreEntry(entry('AES-256', 'Advanced Encryption Standards 256-bit'), query);
    const inside = scoreEntry(entry('XAES', 'Something else'), query);

    expect(exact).toBeGreaterThan(prefix);
    expect(prefix).toBeGreaterThan(inside);
  });

  it('ranks a word-start match in the expansion above a mid-word one', () => {
    const atStart = scoreEntry(entry('AH', 'Authentication Header'), 'auth');
    const midWord = scoreEntry(entry('OOBA', 'Reauthorization band'), 'auth');

    expect(atStart).toBeGreaterThan(midWord);
  });

  it('matches the French gloss too', () => {
    expect(
      scoreEntry(entry('ACL', 'Access Control List', 'Liste de contrôle d’accès'), 'controle'),
    ).toBeGreaterThan(0);
  });

  it('returns every entry for an empty or whitespace query', () => {
    expect(scoreEntry(entry('AAA', 'x'), '')).toBeGreaterThan(0);
    expect(scoreEntry(entry('AAA', 'x'), '   ')).toBeGreaterThan(0);
  });

  it('scores an unrelated entry zero', () => {
    expect(scoreEntry(entry('AAA', 'Authentication, Authorization, and Accounting'), 'zzz')).toBe(
      0,
    );
  });

  it('does not throw on a query made of regex metacharacters', () => {
    // The expansion match builds a RegExp from the query, so an unescaped "(" from a learner
    // half-typing "(CIA)" would throw and blank the screen.
    for (const query of ['(', '[', '\\', '*', '+', '?', '$', '/']) {
      expect(() => scoreEntry(entry('AAA', 'Authentication'), query)).not.toThrow();
    }
  });
});

describe('searchAcronyms', () => {
  const list = [
    entry('SSO', 'Single Sign-On', 'Authentification unique'),
    entry('AES', 'Advanced Encryption Standard', 'Norme de chiffrement avancée'),
    entry('AES-256', 'Advanced Encryption Standards 256-bit', 'Chiffrement AES sur 256 bits'),
  ];

  it('returns the best match first', () => {
    expect(searchAcronyms(list, 'AES').map((e) => e.acronym)).toEqual(['AES', 'AES-256']);
  });

  it('returns everything, in alphabetical order, for an empty query', () => {
    expect(searchAcronyms(list, '').map((e) => e.acronym)).toEqual(['AES', 'AES-256', 'SSO']);
  });

  it('returns nothing rather than everything when nothing matches', () => {
    expect(searchAcronyms(list, 'qqqq')).toEqual([]);
  });

  it('is stable: equal scores break alphabetically, not by input order', () => {
    const shuffled = [list[2], list[0], list[1]].filter((e) => e !== undefined);
    expect(searchAcronyms(shuffled, '').map((e) => e.acronym)).toEqual(
      searchAcronyms(list, '').map((e) => e.acronym),
    );
  });
});

describe('groupByInitial', () => {
  it('buckets by first letter, alphabetically', () => {
    const groups = groupByInitial([entry('SSO', 'x'), entry('AES', 'y'), entry('ACL', 'z')]);

    expect(groups.map(([letter]) => letter)).toEqual(['A', 'S']);
    expect(groups[0]?.[1].map((e) => e.acronym)).toEqual(['AES', 'ACL']);
  });

  it('collapses every digit-initial entry into one bucket', () => {
    // Otherwise "3DES" and "802.1X" each get their own section heading above "A".
    const groups = groupByInitial([entry('3DES', 'x'), entry('802.1X', 'y'), entry('AAA', 'z')]);

    expect(groups.map(([letter]) => letter)).toEqual(['#', 'A']);
    expect(groups[0]?.[1]).toHaveLength(2);
  });

  it('returns nothing for an empty list', () => {
    expect(groupByInitial([])).toEqual([]);
  });
});
