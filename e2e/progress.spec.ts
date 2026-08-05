import { expect, type Page, test } from '@playwright/test';

const STORAGE_KEY = 'security-plus-trainer';

const persisted = (page: Page) => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

async function waitForPersisted(page: Page, fragment: string): Promise<void> {
  await expect.poll(() => persisted(page), { timeout: 5_000 }).toContain(fragment);
}

/** Set the daily goal so a small amount of activity is enough to complete a day. */
async function setLowestGoal(page: Page): Promise<void> {
  await page.goto('/settings');
  await page.getByRole('radio', { name: '50 XP', exact: true }).check();
  await waitForPersisted(page, '"dailyGoalXp":50');
}

test.describe('earning progress', () => {
  test('a fresh learner starts at zero, not at a fake sample', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('0 jour', { exact: true })).toBeVisible();
    await expect(page.getByText('Curious Newcomer · niveau 1')).toBeVisible();
  });

  test('marking a lesson read awards XP and raises a crown', async ({ page }) => {
    await page.goto('/objective/1.1');

    await expect(page.getByText('0 couronne sur 5')).toBeVisible();

    await page.getByRole('button', { name: 'Marquer comme lu' }).click();

    await expect(page.getByText('1 couronne sur 5')).toBeVisible();
    // The button is replaced by a state, so it cannot be clicked twice for more XP.
    await expect(page.getByRole('button', { name: 'Marquer comme lu' })).toHaveCount(0);
    await expect(page.getByText('Lu', { exact: true })).toBeVisible();

    await page.goto('/');
    await expect(page.getByText('20', { exact: true })).toBeVisible();
  });

  test('re-reading a lesson pays nothing', async ({ page }) => {
    // Otherwise refreshing a page is the cheapest route to a streak.
    await page.goto('/objective/1.1');
    await page.getByRole('button', { name: 'Marquer comme lu' }).click();
    await waitForPersisted(page, '"totalXp":20');

    await page.reload();
    await page.goto('/objective/1.1');
    await page.goto('/');

    await expect(page.getByText('20', { exact: true })).toBeVisible();
  });

  test('meeting the daily goal starts the streak and pays the bonus', async ({ page }) => {
    await setLowestGoal(page);

    // Three lessons at 20 XP each cross a 50 XP goal on the third.
    for (const objective of ['1.1', '1.2', '1.3']) {
      await page.goto(`/objective/${objective}`);
      await page.getByRole('button', { name: 'Marquer comme lu' }).click();
    }

    // 60 XP of lessons plus the 25 XP goal bonus.
    await waitForPersisted(page, '"totalXp":85');
    await waitForPersisted(page, '"current":1');

    await page.goto('/');
    await expect(page.getByText('1 jour', { exact: true })).toBeVisible();
    await expect(page.getByText('Objectif atteint aujourd’hui')).toBeVisible();
  });

  test('progress survives a reload', async ({ page }) => {
    await page.goto('/objective/2.4');
    await page.getByRole('button', { name: 'Marquer comme lu' }).click();
    await waitForPersisted(page, '"2.4"');

    await page.reload();

    await expect(page.getByText('Lu', { exact: true })).toBeVisible();
    await expect(page.getByText('1 couronne sur 5')).toBeVisible();
  });

  test('the dashboard sends the learner to the heaviest domain first', async ({ page }) => {
    // Domain 4 is 28% of the exam, so an untouched 4.1 outranks an untouched 1.1.
    await page.goto('/');

    const cta = page.getByRole('link', { name: 'Continuer' });

    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/objective/4.1');
  });

  test('the next-up suggestion advances as objectives are completed', async ({ page }) => {
    await page.goto('/objective/4.1');
    await page.getByRole('button', { name: 'Marquer comme lu' }).click();
    await waitForPersisted(page, '"4.1"');

    await page.goto('/');

    // 4.1 is now started, so the suggestion moves on rather than repeating itself.
    await expect(page.getByRole('link', { name: 'Continuer' })).toHaveAttribute(
      'href',
      '/objective/4.2',
    );
  });

  test('resetting from settings clears earned progress', async ({ page }) => {
    await page.goto('/objective/1.1');
    await page.getByRole('button', { name: 'Marquer comme lu' }).click();
    await waitForPersisted(page, '"totalXp":20');

    await page.evaluate((key) => {
      localStorage.removeItem(key);
    }, STORAGE_KEY);
    await page.reload();

    await page.goto('/objective/1.1');
    await expect(page.getByRole('button', { name: 'Marquer comme lu' })).toBeVisible();
  });
});
