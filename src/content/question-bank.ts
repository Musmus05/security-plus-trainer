import type { Question } from './schemas';

/**
 * Question banks, loaded per objective on demand.
 *
 * The whole corpus will be a few hundred questions with bilingual prompts and an explanation on
 * every option — far too much to ship in the entry chunk for a learner who opens the dashboard and
 * nothing else. Each objective is its own dynamic `import()`, so opening 4.6's quiz fetches 4.6 and
 * nothing else.
 *
 * The map is explicit rather than a template literal in the import. A computed
 * `import(\`./exam/sy0-701/questions/${id}.ts\`)` compiles, but the bundler then has to emit a chunk
 * for every file matching the pattern and cannot tell which are real — so a typo becomes a runtime
 * 404 instead of a type error.
 */
type BankLoader = () => Promise<Question[]>;

const BANKS: Partial<Record<string, BankLoader>> = {
  '1.1': async () => (await import('./exam/sy0-701/questions/1-1')).QUESTIONS_1_1,
  '1.2': async () => (await import('./exam/sy0-701/questions/1-2')).QUESTIONS_1_2,
  '1.3': async () => (await import('./exam/sy0-701/questions/1-3')).QUESTIONS_1_3,
  '1.4': async () => (await import('./exam/sy0-701/questions/1-4')).QUESTIONS_1_4,
  '2.1': async () => (await import('./exam/sy0-701/questions/2-1')).QUESTIONS_2_1,
  '2.2': async () => (await import('./exam/sy0-701/questions/2-2')).QUESTIONS_2_2,
  '2.3': async () => (await import('./exam/sy0-701/questions/2-3')).QUESTIONS_2_3,
  '2.4': async () => (await import('./exam/sy0-701/questions/2-4')).QUESTIONS_2_4,
  '2.5': async () => (await import('./exam/sy0-701/questions/2-5')).QUESTIONS_2_5,
  '3.1': async () => (await import('./exam/sy0-701/questions/3-1')).QUESTIONS_3_1,
  '3.2': async () => (await import('./exam/sy0-701/questions/3-2')).QUESTIONS_3_2,
  '3.3': async () => (await import('./exam/sy0-701/questions/3-3')).QUESTIONS_3_3,
  '3.4': async () => (await import('./exam/sy0-701/questions/3-4')).QUESTIONS_3_4,
  '4.1': async () => (await import('./exam/sy0-701/questions/4-1')).QUESTIONS_4_1,
  '4.2': async () => (await import('./exam/sy0-701/questions/4-2')).QUESTIONS_4_2,
  '4.3': async () => (await import('./exam/sy0-701/questions/4-3')).QUESTIONS_4_3,
  '4.4': async () => (await import('./exam/sy0-701/questions/4-4')).QUESTIONS_4_4,
  '4.5': async () => (await import('./exam/sy0-701/questions/4-5')).QUESTIONS_4_5,
  '4.6': async () => (await import('./exam/sy0-701/questions/4-6')).QUESTIONS_4_6,
  '4.7': async () => (await import('./exam/sy0-701/questions/4-7')).QUESTIONS_4_7,
  '4.8': async () => (await import('./exam/sy0-701/questions/4-8')).QUESTIONS_4_8,
  '4.9': async () => (await import('./exam/sy0-701/questions/4-9')).QUESTIONS_4_9,
  '5.1': async () => (await import('./exam/sy0-701/questions/5-1')).QUESTIONS_5_1,
  '5.2': async () => (await import('./exam/sy0-701/questions/5-2')).QUESTIONS_5_2,
  '5.3': async () => (await import('./exam/sy0-701/questions/5-3')).QUESTIONS_5_3,
  '5.4': async () => (await import('./exam/sy0-701/questions/5-4')).QUESTIONS_5_4,
  '5.5': async () => (await import('./exam/sy0-701/questions/5-5')).QUESTIONS_5_5,
  '5.6': async () => (await import('./exam/sy0-701/questions/5-6')).QUESTIONS_5_6,
};

/** Objectives that currently have a question bank. */
export const OBJECTIVES_WITH_QUESTIONS: readonly string[] = Object.keys(BANKS);

export function hasQuestions(objectiveId: string): boolean {
  return BANKS[objectiveId] !== undefined;
}

/**
 * Load one objective's questions.
 *
 * Returns an empty array for an objective that has none yet, rather than throwing: the corpus is
 * being written objective by objective, and a learner reaching an unwritten one should see "no
 * questions yet" rather than an error boundary.
 */
export async function loadQuestions(objectiveId: string): Promise<Question[]> {
  const loader = BANKS[objectiveId];
  if (loader === undefined) {
    return [];
  }
  return loader();
}
