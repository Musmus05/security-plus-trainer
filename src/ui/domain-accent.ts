/**
 * Domain accent utilities.
 *
 * These are wayfinding accents, **not** a data encoding. The palette validator showed that no
 * five-hue subset of the reference ramps keeps every pair distinguishable when all five are on
 * screen at once — so anything whose meaning depends on telling domain 2 from domain 5 must also
 * carry the domain number or name. Progress is magnitude, and magnitude uses the single
 * sequential ramp instead.
 *
 * Note the split between `text` and the fill utilities: the mark tones are too light to be text
 * (`#1baf7a` is 2.81:1 on white), so `text` points at a separate, darker tone that clears WCAG AA.
 *
 * See docs/adr/0006-domain-colour-and-chart-encoding.md.
 */

export const DOMAIN_IDS = [1, 2, 3, 4, 5] as const;

export type DomainId = (typeof DOMAIN_IDS)[number];

export interface DomainAccent {
  /** AA-compliant text tone. Use for labels. */
  text: string;
  /** Mark tone. Use for fills, rings and borders — never for text. */
  bg: string;
  border: string;
  ring: string;
}

const DOMAIN_ACCENT: Record<DomainId, DomainAccent> = {
  1: {
    text: 'text-domain-1-text',
    bg: 'bg-domain-1',
    border: 'border-domain-1',
    ring: 'ring-domain-1',
  },
  2: {
    text: 'text-domain-2-text',
    bg: 'bg-domain-2',
    border: 'border-domain-2',
    ring: 'ring-domain-2',
  },
  3: {
    text: 'text-domain-3-text',
    bg: 'bg-domain-3',
    border: 'border-domain-3',
    ring: 'ring-domain-3',
  },
  4: {
    text: 'text-domain-4-text',
    bg: 'bg-domain-4',
    border: 'border-domain-4',
    ring: 'ring-domain-4',
  },
  5: {
    text: 'text-domain-5-text',
    bg: 'bg-domain-5',
    border: 'border-domain-5',
    ring: 'ring-domain-5',
  },
};

export function domainAccent(domain: DomainId): DomainAccent {
  return DOMAIN_ACCENT[domain];
}

/** Narrow an arbitrary number to a domain id, for values arriving from routes or storage. */
export function isDomainId(value: number): value is DomainId {
  return DOMAIN_IDS.includes(value as DomainId);
}
