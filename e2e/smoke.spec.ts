import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Map to something readable — but keep enough to act on.
 *
 * An earlier version returned only the rule id and a node count. A raw axe dump is unusable in CI
 * output, but that summary was undiagnosable: a contrast failure said nothing about which colours on
 * which element, so fixing one meant reproducing it by hand. The colours and the offending selector
 * *are* the diagnosis, so they stay.
 */
async function accessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();

  return results.violations.map((violation) => ({
    id: violation.id,
    help: violation.help,
    nodes: violation.nodes.map((node) => ({
      target: node.target.join(' '),
      detail: node.any.map((check) => check.message).join(' | '),
    })),
  }));
}

const ROUTES = [
  '/',
  '/path',
  '/objective/4.6',
  '/objective/1.1',
  '/objective/1.1/quiz',
  '/exam',
  '/flashcards',
  '/glossary',
  '/settings',
] as const;

test.describe('application shell', () => {
  test('serves the app', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('accessibility', () => {
  for (const route of ROUTES) {
    test(`light theme has no violations on ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto(route);

      expect(await accessibilityViolations(page)).toEqual([]);
    });

    test(`dark theme has no violations on ${route}`, async ({ page }) => {
      // The dark tokens are a separately computed set, not an automatic inversion, so every
      // route needs its own pass in both themes.
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(route);

      expect(await accessibilityViolations(page)).toEqual([]);
    });
  }
});
