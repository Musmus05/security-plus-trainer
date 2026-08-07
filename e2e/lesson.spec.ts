import { expect, test } from '@playwright/test';

import { ALL_OBJECTIVES } from '../src/content/exam/sy0-701/domains';
import { hasLesson } from '../src/content/lesson-bank';

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

  test('every objective in the outline now has a lesson', async ({ page }) => {
    /*
     * This test used to assert the opposite: that 5.6 said "not written yet". Honest emptiness is
     * still the right behaviour and the code path is still there, but there is no longer an
     * unwritten objective to point it at — the corpus is complete.
     *
     * Rather than delete the coverage, it is inverted. "No objective shows the empty state" is the
     * stronger claim of the two, and it is the one that would catch a lesson dropped from the
     * registry, which is exactly how 3.2 and 3.3 went missing.
     */
    for (const objective of ALL_OBJECTIVES) {
      await page.goto(`/objective/${objective.id}`);

      await expect(
        page.getByText(/n’est pas encore rédigée/),
        `objective ${objective.id} renders as unwritten`,
      ).toHaveCount(0);
      await expect(
        page.getByRole('heading', { name: 'Pourquoi cet objectif compte' }),
        `objective ${objective.id} has no lesson prose`,
      ).toBeVisible();
    }
  });

  test('the path marks which objectives have a lesson', async ({ page }) => {
    /*
     * The expected count is derived, not hard-coded. It used to be a literal `1`, which meant
     * writing the second lesson broke a test that had nothing to do with the change — the failure
     * said "content was added", not "something is wrong". Asserting against the lesson bank tests
     * the invariant that actually matters: the path badges exactly the objectives that have prose.
     */
    const expected = ALL_OBJECTIVES.filter((objective) => hasLesson(objective.id, 'fr')).length;
    expect(expected, 'no lessons registered; this test would assert nothing').toBeGreaterThan(0);

    await page.goto('/path');

    // Retrying, for the same reason as above: this one actually failed by reading too early.
    await expect(page.getByText('Leçon', { exact: true })).toHaveCount(expected);
  });
});
