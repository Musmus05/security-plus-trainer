import { expect, test } from '@playwright/test';

test.describe('lesson content', () => {
  test('renders the lesson prose for an objective that has one', async ({ page }) => {
    await page.goto('/objective/1.1');

    // Section headings from the MDX, not from the app shell.
    await expect(page.getByRole('heading', { name: 'Pourquoi cet objectif compte' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Les quatre catégories' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Les six types' })).toBeVisible();
  });

  test('renders the callouts a lesson relies on', async ({ page }) => {
    await page.goto('/objective/1.1');

    await expect(page.getByText('À retenir').first()).toBeVisible();
    await expect(page.getByText('Piège d’examen').first()).toBeVisible();
    await expect(page.getByText('Moyen mnémotechnique')).toBeVisible();
    await expect(page.getByText('En pratique')).toBeVisible();
  });

  test('keeps the official English term beside every French technical term', async ({ page }) => {
    /*
     * The rule from ADR-0004 made visible. The exam is delivered only in English, so a learner
     * revising in French has to recognise the English wording on the day — a French-only lesson
     * would leave them fluent in vocabulary the exam never uses.
     */
    await page.goto('/objective/1.1');

    const lesson = page.getByRole('article');

    await expect(lesson.getByText('(Compensating)')).toBeVisible();
    await expect(lesson.getByText('(Deterrent)')).toBeVisible();
    await expect(lesson.getByText('(Managerial)')).toBeVisible();
  });

  test('renders comparison tables, which is where the distinctions live', async ({ page }) => {
    await page.goto('/objective/1.1');

    const tables = page.getByRole('article').locator('table');

    // A retrying assertion, not `expect(await count())`. The latter reads once and fails against a
    // page that has not finished rendering — which is how a test passes locally and flakes in CI.
    await expect(tables).toHaveCount(4);
  });

  test('switches the lesson language with the interface', async ({ page }) => {
    await page.goto('/objective/1.1');
    await expect(page.getByRole('heading', { name: 'Pourquoi cet objectif compte' })).toBeVisible();

    await page.getByRole('radio', { name: /Switch interface to English|English/ }).check();

    await expect(page.getByRole('heading', { name: 'Why this objective matters' })).toBeVisible();
  });

  test('says so plainly when an objective has no lesson yet', async ({ page }) => {
    // Honest emptiness beats a blank card: a learner should be able to tell unwritten content from
    // a broken page.
    await page.goto('/objective/5.6');

    await expect(page.getByText(/n’est pas encore rédigée/)).toBeVisible();
    // The official scope is still shown, so the page is useful even without the prose.
    await expect(page.getByText('Phishing')).toBeVisible();
  });

  test('the path marks which objectives have a lesson', async ({ page }) => {
    await page.goto('/path');

    // Retrying, for the same reason as above: this one actually failed by reading too early.
    await expect(page.getByText('Leçon', { exact: true })).toHaveCount(1);
  });
});
