import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

// Resolved from the project root rather than from `import.meta.url`: under the jsdom
// environment that URL is not a `file:` URL, so `fileURLToPath` throws on it.
const css = readFileSync(resolve('src/ui/tokens.css'), 'utf8');

/** Pull the declarations out of the rule whose selector line starts with `selector`. */
function declarationsOf(selector: string): Map<string, string> {
  const start = css.indexOf(selector);
  if (start < 0) {
    throw new Error(`tokens.css: selector not found: ${selector}`);
  }

  const open = css.indexOf('{', start);
  let depth = 1;
  let index = open + 1;
  while (depth > 0 && index < css.length) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') depth -= 1;
    index += 1;
  }

  const body = css.slice(open + 1, index - 1);
  const declarations = new Map<string, string>();
  for (const match of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    const [, name, value] = match;
    if (name !== undefined && value !== undefined) {
      declarations.set(name, value.trim());
    }
  }
  return declarations;
}

describe('design tokens', () => {
  const osDark = declarationsOf(":root:where(:not([data-theme='light']))");
  const stampedDark = declarationsOf(":root[data-theme='dark']");
  // The first `:root {` block holds the themed roles; status colours sit in their own block
  // below it precisely because they must not be themed.
  const light = declarationsOf(':root {');
  const STATUS_ROLES = ['--sp-good', '--sp-warning', '--sp-serious', '--sp-critical'];

  it('declares the dark palette identically under both scopes', () => {
    // The duplication is deliberate — the explicit theme stamp has to beat the OS preference in
    // both directions, and Tailwind has no mixin. This test is what stops the copies drifting.
    expect(Object.fromEntries(stampedDark)).toEqual(Object.fromEntries(osDark));
  });

  it('overrides every themed role that light mode defines, and only those', () => {
    expect([...osDark.keys()].sort()).toEqual([...light.keys()].sort());
  });

  it('leaves the status colours out of both dark scopes', () => {
    // A state must not change hue with the theme, so these are declared once and never overridden.
    for (const role of STATUS_ROLES) {
      expect(light.has(role), `${role} should not be in the themed block`).toBe(false);
      expect(osDark.has(role), `${role} should not be themed`).toBe(false);
      expect(stampedDark.has(role), `${role} should not be themed`).toBe(false);
    }
  });

  it('keeps the five domain accents distinct within each theme', () => {
    for (const [name, declarations] of [
      ['light', light],
      ['dark', osDark],
    ] as const) {
      const accents = [1, 2, 3, 4, 5].map((n) => declarations.get(`--sp-domain-${String(n)}`));

      expect(
        accents.every((value) => value !== undefined),
        `${name} accents present`,
      ).toBe(true);
      expect(new Set(accents).size, `${name} accents unique`).toBe(5);
    }
  });

  it('inverts the heatmap ramp direction between themes', () => {
    // On a light surface more magnitude reads as darker; on a dark surface, as lighter. If both
    // themes used the same order, one of them would read backwards.
    expect(light.get('--sp-heat-1')).toBe(osDark.get('--sp-heat-4'));
    expect(light.get('--sp-heat-4')).toBe(osDark.get('--sp-heat-1'));
  });

  describe('every text tone clears WCAG AA against the background it actually renders on', () => {
    /*
     * Computed, not read off a table — and measured against the *real* background rather than the
     * surface. An earlier version of this test only checked the surface, which is why a 4.02:1
     * badge (dark red text on a pale red wash) passed here and was caught later by the axe pass
     * in a browser. The pairing below is the fix: each tone is named with what sits behind it.
     */
    const PAIRINGS: { role: string; on: string }[] = [
      { role: '--sp-ink', on: '--sp-surface' },
      { role: '--sp-ink-secondary', on: '--sp-surface' },
      { role: '--sp-ink-muted', on: '--sp-surface' },
      { role: '--sp-ink', on: '--sp-sunken' },
      { role: '--sp-ink-secondary', on: '--sp-sunken' },
      { role: '--sp-ink-muted', on: '--sp-sunken' },
      // Domain labels sit on the surface; the mark tones they pair with are far too light for text.
      { role: '--sp-domain-1-text', on: '--sp-surface' },
      { role: '--sp-domain-2-text', on: '--sp-surface' },
      { role: '--sp-domain-3-text', on: '--sp-surface' },
      { role: '--sp-domain-4-text', on: '--sp-surface' },
      { role: '--sp-domain-5-text', on: '--sp-surface' },
      // Badge text sits on its own wash, which is a lighter background than the surface.
      { role: '--sp-good-text', on: '--sp-good-wash' },
      { role: '--sp-warning-text', on: '--sp-warning-wash' },
      { role: '--sp-critical-text', on: '--sp-critical-wash' },
      { role: '--sp-info-text', on: '--sp-info-wash' },
    ];

    it.each([
      ['light', light],
      ['dark', osDark],
    ])('%s', (themeName, declarations) => {
      for (const { role, on } of PAIRINGS) {
        const foreground = read(declarations, themeName, role);
        const background = read(declarations, themeName, on);
        const ratio = contrastRatio(foreground, background);

        expect(
          ratio,
          `${themeName}: ${role} (${foreground}) on ${on} (${background}) is ${ratio.toFixed(2)}:1`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });
  });

  describe('white labels clear WCAG AA on the action fills', () => {
    // Buttons put white text on a solid fill, so the fill — not the surface — is the constraint.
    // The `#2a78d6` mark tone reaches only 4.42:1, which is why a separate action tone exists.
    it.each([
      ['light', light],
      ['dark', osDark],
    ])('%s', (themeName, declarations) => {
      for (const role of ['--sp-action', '--sp-action-danger']) {
        const fill = read(declarations, themeName, role);
        const ratio = contrastRatio('#ffffff', fill);

        expect(
          ratio,
          `${themeName}: white on ${role} (${fill}) is ${ratio.toFixed(2)}:1`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });
  });
});

function read(declarations: Map<string, string>, themeName: string, role: string): string {
  const value = declarations.get(role);
  if (value === undefined) {
    throw new Error(`${themeName}: ${role} is not declared`);
  }
  return value;
}

/** WCAG 2.1 relative luminance of a `#rrggbb` colour. */
function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  }) as [number, number, number];

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string): number {
  const first = relativeLuminance(a);
  const second = relativeLuminance(b);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return (lighter + 0.05) / (darker + 0.05);
}
