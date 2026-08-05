import { describe, expect, it } from 'vitest';

import { EXAM_META } from './exam-meta';
import { examMetaSchema } from './exam-meta.schema';

/**
 * A validation gate that never rejects anything is decoration. These tests prove each invariant
 * actually bites, which is what makes a green `npm run validate:content` mean something.
 */
describe('examMetaSchema', () => {
  it('accepts the committed exam metadata', () => {
    expect(examMetaSchema.safeParse(EXAM_META).success).toBe(true);
  });

  const withOverride = (override: Record<string, unknown>): unknown => ({
    ...EXAM_META,
    ...override,
  });

  it('rejects a passing score outside the score scale', () => {
    const result = examMetaSchema.safeParse(withOverride({ passingScore: 950 }));

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      'passingScore must sit strictly inside the reported score scale',
    );
  });

  it('rejects an inverted score scale', () => {
    const result = examMetaSchema.safeParse(withOverride({ scoreScale: { min: 900, max: 100 } }));

    expect(result.success).toBe(false);
  });

  it('rejects a domain count that contradicts the objectives document', () => {
    const result = examMetaSchema.safeParse(withOverride({ domainCount: 6 }));

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      'SY0-701 has exactly 5 domains per the official objectives document',
    );
  });

  it('rejects an objective count that contradicts the objectives document', () => {
    const result = examMetaSchema.safeParse(withOverride({ objectiveCount: 27 }));

    expect(result.success).toBe(false);
  });

  it('trips when French appears as an exam language', () => {
    // The bilingual strategy in ADR-0004 depends on this being false. If it ever becomes true,
    // the failure is the point: it forces the decision to be revisited.
    const result = examMetaSchema.safeParse(
      withOverride({ examLanguages: ['en', 'fr', 'ja', 'pt', 'es', 'th'] }),
    );

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      'French is now listed as an exam language — revisit docs/adr/0004-french-as-comprehension-aid.md',
    );
  });

  it('rejects a malformed exam code', () => {
    expect(examMetaSchema.safeParse(withOverride({ code: 'SEC-PLUS' })).success).toBe(false);
  });

  it('rejects a non-integer question count', () => {
    expect(examMetaSchema.safeParse(withOverride({ maxQuestions: 90.5 })).success).toBe(false);
  });

  it('rejects a language entry that is not a two-letter code', () => {
    expect(examMetaSchema.safeParse(withOverride({ examLanguages: ['english'] })).success).toBe(
      false,
    );
  });
});
