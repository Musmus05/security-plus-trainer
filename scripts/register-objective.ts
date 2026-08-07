#!/usr/bin/env tsx
/**
 * Register an authored objective in the three places the app looks for it.
 *
 * The lesson bank, the question bank and the content gate each hold an explicit map — a computed
 * import specifier would make the bundler emit a chunk for every file matching the pattern and turn
 * a typo into a runtime 404 instead of a type error. The cost of that choice is three edits per
 * objective, and forgetting one leaves content that exists on disk and is invisible in the app. That
 * happened, which is why this exists.
 *
 * Deliberately strict: every insertion point must be found, the objective must not already be
 * present, and nothing is written until all three edits have been prepared. A half-registered
 * objective is worse than an unregistered one, because the content gate would pass while the path
 * stayed empty.
 *
 * Usage: npx tsx scripts/register-objective.ts 2.1
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

interface Target {
  path: string;
  /** Matches an existing entry. Capture 1 is the indent, capture 2 the objective it registers. */
  anchor: RegExp;
  addition: (indent: string) => string;
}

const [objective] = process.argv.slice(2);

if (objective === undefined || !/^[1-5]\.[1-9]$/.test(objective)) {
  console.error('usage: npx tsx scripts/register-objective.ts <objective>   e.g. 2.1');
  process.exit(1);
}

const slug = objective.replace('.', '-');
const constant = `QUESTIONS_${slug.replace('-', '_')}`;

const targets: Target[] = [
  {
    path: 'src/content/question-bank.ts',
    anchor:
      /^([ \t]*)'(\d\.\d)': async \(\) => \(await import\('\.\/exam\/sy0-701\/questions\/\d-\d'\)\)\.QUESTIONS_\d_\d,$/gm,
    addition: (indent) =>
      `${indent}'${objective}': async () => ` +
      `(await import('./exam/sy0-701/questions/${slug}')).${constant},`,
  },
  {
    path: 'src/content/lesson-bank.ts',
    anchor: /^([ \t]*)'(\d\.\d)': \{\n[ \t]*fr: [^\n]+\n[ \t]*en: [^\n]+\n[ \t]*\},$/gm,
    addition: (indent) =>
      [
        `${indent}'${objective}': {`,
        `${indent}  fr: async () => (await import('./exam/sy0-701/lessons/${slug}.fr.mdx')).default,`,
        `${indent}  en: async () => (await import('./exam/sy0-701/lessons/${slug}.en.mdx')).default,`,
        `${indent}},`,
      ].join('\n'),
  },
  {
    path: 'scripts/validate-content.ts',
    anchor: /^([ \t]*)\{ objective: '(\d\.\d)', questions: QUESTIONS_\d_\d \},$/gm,
    addition: (indent) => `${indent}{ objective: '${objective}', questions: ${constant} },`,
  },
];

function fail(message: string): never {
  console.error(`✖ ${message}`);
  process.exit(1);
}

// Prepare every file before writing any of them. Writing one and then failing on the next is the
// half-registered state this script exists to prevent.
const writes: { path: string; next: string }[] = [];

for (const { path, anchor, addition } of targets) {
  if (!existsSync(path)) {
    fail(`${path} does not exist`);
  }

  const source = readFileSync(path, 'utf8');

  if (source.includes(`'${objective}'`)) {
    fail(`${path} already mentions ${objective}`);
  }

  const last = [...source.matchAll(anchor)].at(-1);

  if (last?.index === undefined) {
    fail(`${path}: found no existing entry to insert after`);
  }

  const [matched, indent, registered] = last;

  // Entries stay in objective order. Inserting after the last one preserves that only while
  // objectives are authored in order, so the ordering is checked rather than assumed.
  if (registered !== undefined && registered > objective) {
    fail(`${path}: last entry is ${registered}, which sorts after ${objective}`);
  }

  const end = last.index + matched.length;

  writes.push({
    path,
    next: `${source.slice(0, end)}\n${addition(indent ?? '  ')}${source.slice(end)}`,
  });
}

// The gate imports each bank by name, so it needs a fourth edit the others do not.
const gate = writes.find((write) => write.path === 'scripts/validate-content.ts');

if (gate !== undefined) {
  const lastImport = [...gate.next.matchAll(/^import \{ QUESTIONS_\d_\d \} from '[^']+';$/gm)].at(
    -1,
  );

  if (lastImport?.index === undefined) {
    fail('scripts/validate-content.ts: found no existing question-bank import');
  }

  const end = lastImport.index + lastImport[0].length;
  gate.next =
    gate.next.slice(0, end) +
    `\nimport { ${constant} } from '../src/content/exam/sy0-701/questions/${slug}.ts';` +
    gate.next.slice(end);
}

for (const { path, next } of writes) {
  writeFileSync(path, next);
}

console.log(`✔ registered ${objective} in ${String(writes.length)} files`);
