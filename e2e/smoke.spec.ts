import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function accessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  // Map to something readable: a raw axe node dump is unreadable in CI output.
  return results.violations.map((violation) => ({
    id: violation.id,
    nodes: violation.nodes.length,
    help: violation.help,
  }));
}

test.describe('application shell', () => {
  test('serves the app and states the exam scope', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: 'Security+ Trainer' })).toBeVisible();
    await expect(page.getByText(/SY0-701/)).toBeVisible();
  });

  test('deep links resolve through the SPA rewrite instead of 404ing', async ({ page }) => {
    const response = await page.goto('/path/domain-1/1.1');

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});

test.describe('accessibility', () => {
  test('light theme has no violations', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    expect(await accessibilityViolations(page)).toEqual([]);
  });

  test('dark theme has no violations', async ({ page }) => {
    // The dark tokens are a separately computed set, not an automatic inversion, so they need
    // their own pass. Every text tone was measured against the dark surface it renders on.
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    expect(await accessibilityViolations(page)).toEqual([]);
  });

  test('explicitly stamped dark theme has no violations', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.dataset['theme'] = 'dark';
    });

    expect(await accessibilityViolations(page)).toEqual([]);
  });
});

test.describe('theme resolution', () => {
  const pageColour = (page: Page) =>
    page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  test('a stamped light theme beats an OS dark preference', async ({ page }) => {
    // This is the whole reason the dark palette is declared twice. If the media query were
    // allowed to win, the in-app toggle would be a no-op for anyone whose OS is set to dark.
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');

    const osDark = await pageColour(page);

    await page.evaluate(() => {
      document.documentElement.dataset['theme'] = 'light';
    });

    expect(await pageColour(page)).not.toBe(osDark);
    expect(await pageColour(page)).toBe('rgb(247, 247, 245)');
  });

  test('a stamped dark theme beats an OS light preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');

    await page.evaluate(() => {
      document.documentElement.dataset['theme'] = 'dark';
    });

    expect(await pageColour(page)).toBe('rgb(13, 15, 20)');
  });
});
