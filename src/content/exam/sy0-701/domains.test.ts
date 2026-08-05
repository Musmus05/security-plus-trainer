import { describe, expect, it } from 'vitest';

import { examOutlineSchema, objectiveSchema } from '@/content/schemas';

import { ALL_OBJECTIVES, DOMAINS, domainOf, findDomain, findObjective } from './domains';

describe('the SY0-701 outline', () => {
  it('satisfies its schema', () => {
    const result = examOutlineSchema.safeParse(DOMAINS);

    expect(
      result.success ? [] : result.error.issues.map((issue) => issue.message),
      'schema violations',
    ).toEqual([]);
  });

  it('has the five domains at their published weights', () => {
    // Straight from the objectives document. If CompTIA reweights the exam, the mock exam's
    // sampling is wrong until these change, so they are asserted rather than assumed.
    expect(DOMAINS.map((domain) => [domain.number, domain.weight])).toEqual([
      ['1.0', 0.12],
      ['2.0', 0.22],
      ['3.0', 0.18],
      ['4.0', 0.28],
      ['5.0', 0.2],
    ]);
  });

  it('has 28 objectives, distributed 4 / 5 / 4 / 9 / 6', () => {
    expect(DOMAINS.map((domain) => domain.objectives.length)).toEqual([4, 5, 4, 9, 6]);
    expect(ALL_OBJECTIVES).toHaveLength(28);
  });

  it('numbers objectives contiguously from 1 within each domain', () => {
    // A gap means an objective was dropped in transcription; a jump means one was invented.
    for (const domain of DOMAINS) {
      expect(domain.objectives.map((objective) => objective.id)).toEqual(
        domain.objectives.map((_, index) => `${String(domain.id)}.${String(index + 1)}`),
      );
    }
  });

  it('keeps every English title verbatim, full stop included', () => {
    // The English title is the exam's own index. Paraphrasing it — or tidying the trailing full
    // stop the document actually has — makes the objective unfindable in any other resource.
    for (const objective of ALL_OBJECTIVES) {
      expect(objective.title.en, objective.id).toMatch(/\.$/);
      expect(objective.title.en, objective.id).toMatch(
        /^(Compare and contrast|Summarize|Explain|Given a scenario,)/,
      );
    }
  });

  it('gives every objective a French title that is not just the English one', () => {
    for (const objective of ALL_OBJECTIVES) {
      expect(objective.title.fr, objective.id).not.toBe(objective.title.en);
      expect(objective.title.fr.length, objective.id).toBeGreaterThan(10);
    }
  });

  it('uses typographic apostrophes in the French titles', () => {
    // Same rule as the interface catalogue: French apostrophes are ’, never '. Mixed quoting is
    // visible in prose this apostrophe-heavy and reads as two authors.
    for (const domain of DOMAINS) {
      expect(domain.name.fr, domain.number).not.toContain("'");
      for (const objective of domain.objectives) {
        expect(objective.title.fr, objective.id).not.toContain("'");
      }
    }
  });

  it('gives every objective at least one official topic', () => {
    for (const objective of ALL_OBJECTIVES) {
      expect(objective.topics.length, objective.id).toBeGreaterThan(0);
      expect(new Set(objective.topics).size, `${objective.id} has duplicate topics`).toBe(
        objective.topics.length,
      );
    }
  });

  it('covers 176 topics in total', () => {
    // Every one of these was cross-checked verbatim against the official objectives text. The
    // count is asserted so a topic cannot be silently dropped while editing a nearby one.
    const total = ALL_OBJECTIVES.reduce((sum, objective) => sum + objective.topics.length, 0);

    expect(total).toBe(176);
  });
});

describe('lookups', () => {
  it('finds an objective by its exam number', () => {
    expect(findObjective('4.6')?.title.en).toBe(
      'Given a scenario, implement and maintain identity and access management.',
    );
  });

  it('returns undefined for an id that does not exist', () => {
    expect(findObjective('4.99')).toBeUndefined();
    expect(findObjective('nonsense')).toBeUndefined();
  });

  it('finds a domain by id', () => {
    expect(findDomain(3)?.name.en).toBe('Security Architecture');
  });

  it('derives the domain from an objective id', () => {
    expect(domainOf('1.1')).toBe(1);
    expect(domainOf('5.6')).toBe(5);
  });

  it('agrees with the stored domain on every objective', () => {
    // The domain is stored *and* derivable from the id. They must not disagree, or the mock exam
    // would sample an objective into the wrong domain quota.
    for (const objective of ALL_OBJECTIVES) {
      expect(domainOf(objective.id), objective.id).toBe(objective.domain);
      expect(objective.id.startsWith(`${String(objective.domain)}.`), objective.id).toBe(true);
    }
  });
});

describe('the objective schema', () => {
  const valid = ALL_OBJECTIVES[0];

  it('rejects an objective id outside the exam numbering', () => {
    expect(objectiveSchema.safeParse({ ...valid, id: '6.1' }).success).toBe(false);
    expect(objectiveSchema.safeParse({ ...valid, id: '1.0' }).success).toBe(false);
    expect(objectiveSchema.safeParse({ ...valid, id: '1.10' }).success).toBe(false);
  });

  it('rejects an objective with no French title', () => {
    expect(
      objectiveSchema.safeParse({ ...valid, title: { en: 'Something.', fr: '' } }).success,
    ).toBe(false);
  });

  it('rejects an objective with no topics', () => {
    expect(objectiveSchema.safeParse({ ...valid, topics: [] }).success).toBe(false);
  });
});
