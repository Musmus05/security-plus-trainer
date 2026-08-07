import { readFileSync, writeFileSync } from 'node:fs';

const scratch = process.argv[2];
const lines = readFileSync(`${scratch}/sy0-701-objectives-clean.txt`, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .slice(1573); // the acronym appendix starts here

/**
 * An acronym line: short, starts uppercase, no spaces, and mostly capitals.
 *
 * The awkward cases in the official list are AES-256, ATT&CK, S/MIME, 802.1X and the aaS family
 * (IaaS, PaaS, SaaS), so lowercase letters and `-/&.+` all have to be allowed — which means "at
 * least two capitals and no space" is what actually separates an acronym from the first word of an
 * expansion.
 */
/** The only two entries in the official list whose acronym contains a space. */
const SPACED_ACRONYMS = new Set(['PCI DSS', 'SE Linux']);

function isAcronym(line) {
  if (SPACED_ACRONYMS.has(line)) return true;
  if (line.length === 0 || line.length > 16 || line.includes(' ')) return false;
  if (!/^[A-Z0-9]/.test(line)) return false;
  if (!/^[A-Za-z0-9/&.\-+]+$/.test(line)) return false;
  return (line.match(/[A-Z0-9]/g) ?? []).length >= 2;
}

const NOISE =
  /^(CompTIA|Copyright|The following|Candidates|list and|comprehensive|Acronym|Spelled)/i;

/*
 * Ordering is not a usable end marker: the PDF lays the acronym list out in columns, so the
 * alphabetical run restarts several times. What does separate the list from the hardware/software
 * appendix that follows is the *shape* of the expansion — appendix entries are long prose, or carry
 * boilerplate the acronym expansions never do.
 */
const APPENDIX = /CompTIA|Adobe|UCS|Printed in|trademark|Reproduction|documentation\/diagrams/i;
const MAX_EXPANSION = 70;

const entries = [];
let current = null;

for (const line of lines) {
  if (line.length === 0 || NOISE.test(line)) continue;

  if (isAcronym(line)) {
    if (current) entries.push(current);
    current = { acronym: line, en: '', lines: 0 };
  } else if (current && current.lines < 2) {
    /*
     * An expansion wraps onto at most two lines in this layout. The cap is what stops the last
     * entry (XSS) swallowing the start of the hardware appendix that follows it — there is no
     * blank line or heading between the two once the PDF has been flattened to text.
     */
    current.en = current.en === '' ? line : `${current.en} ${line}`;
    current.lines += 1;
  }
}
if (current) entries.push(current);

const seen = new Set();
const clean = [];

for (const entry of entries) {
  // Trailing column bleed: an expansion can pick up a stray token from the next column.
  const expansion = entry.en.replace(/\s+(C|c)\s+Adobe.*$/, '').trim();

  if (expansion.length === 0 || expansion.length > MAX_EXPANSION) continue;
  if (APPENDIX.test(expansion)) continue;
  if (seen.has(entry.acronym)) continue;

  seen.add(entry.acronym);
  clean.push({ acronym: entry.acronym, en: expansion });
}

/*
 * XSS is the final entry, so its second line is the first line of the hardware appendix rather
 * than a continuation. Every other entry is bounded by the acronym that follows it; this one has
 * nothing after it, so it is corrected explicitly.
 */
const xss = clean.find((entry) => entry.acronym === 'XSS');
if (xss) xss.en = 'Cross-site Scripting';

clean.sort((a, b) => a.acronym.localeCompare(b.acronym, 'en'));
writeFileSync(`${scratch}/acronyms.json`, JSON.stringify(clean, null, 2));

console.log('extracted:', clean.length);
console.log(
  '\nfirst 5:',
  clean
    .slice(0, 5)
    .map((e) => `${e.acronym}=${e.en}`)
    .join(' | '),
);
console.log(
  '\nlast 5:',
  clean
    .slice(-5)
    .map((e) => `${e.acronym}=${e.en}`)
    .join(' | '),
);
console.log(
  '\nlongest 3:',
  [...clean]
    .sort((a, b) => b.en.length - a.en.length)
    .slice(0, 3)
    .map((e) => `${e.acronym}=${e.en}`)
    .join(' | '),
);
console.log(
  '\nshortest 3:',
  [...clean]
    .sort((a, b) => a.en.length - b.en.length)
    .slice(0, 3)
    .map((e) => `${e.acronym}=${e.en}`)
    .join(' | '),
);
