import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

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

  test('has no detectable accessibility violations', async ({ page }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
