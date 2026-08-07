import { expect, type Page, test } from '@playwright/test';

const STORAGE_KEY = 'security-plus-trainer';

const persisted = (page: Page) => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

const reveal = (page: Page) => page.getByRole('button', { name: 'Voir la réponse' });
const gradeButton = (page: Page, name: string) =>
  page
    .getByRole('group', { name: 'À quel point t’en souvenais-tu ?' })
    .getByRole('button', { name });

/** The acronym on the front of the current card. */
async function currentPrompt(page: Page): Promise<string> {
  return (await page.locator('main p.text-4xl').innerText()).trim();
}

test.describe('flashcards', () => {
  test('offers the whole acronym deck as due on a first visit', async ({ page }) => {
    // Every card starts due: an unseen card is one the learner has not scheduled, not one they
    // have already earned a delay on.
    await page.goto('/flashcards');

    await expect(page.getByText('320 cartes à revoir aujourd’hui')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Commencer la révision' })).toBeVisible();
  });

  test('hides the answer until it is asked for', async ({ page }) => {
    // A card that shows its answer is not a test of recall.
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();

    await expect(page.getByText('Signification officielle')).toHaveCount(0);
    await expect(gradeButton(page, 'Correct')).toHaveCount(0);

    await reveal(page).click();

    await expect(page.getByText('Signification officielle')).toBeVisible();
    await expect(gradeButton(page, 'Correct')).toBeVisible();
  });

  test('writes the schedule as each card is graded, not at the end', async ({ page }) => {
    // Closing the tab mid-session must keep the reviews already done.
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();
    await reveal(page).click();
    await gradeButton(page, 'Correct').click();

    await expect.poll(() => persisted(page)).toContain('"srs"');
    await expect.poll(() => persisted(page)).toContain('"reps":1');
  });

  test('grades once per press, not twice', async ({ page }) => {
    /*
     * StrictMode double-invokes state updaters exactly as it double-invokes effects, so a store
     * write placed inside one advances the schedule twice for a single press. A card graded "good"
     * once must be at one review with a one-day interval — never two.
     */
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();
    await reveal(page).click();
    await gradeButton(page, 'Correct').click();

    await expect.poll(() => persisted(page)).toContain('"reps":1');
    expect(await persisted(page)).not.toContain('"reps":2');
    expect(await persisted(page)).toContain('"intervalDays":1');
  });

  test('sends a forgotten card to the back of the queue instead of dropping it', async ({
    page,
  }) => {
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();

    const first = await currentPrompt(page);
    await reveal(page).click();
    await gradeButton(page, 'Oublié').click();

    // A different card comes next…
    await expect.poll(async () => currentPrompt(page)).not.toBe(first);
    // …and the count of finished cards has not moved, because nothing was finished.
    await expect(page.getByText('0/20', { exact: true })).toBeVisible();
  });

  test('pays XP for a review whatever the grade', async ({ page }) => {
    // Paying only for remembered cards teaches the learner to review what they already know.
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();
    await reveal(page).click();
    await gradeButton(page, 'Oublié').click();

    await expect.poll(() => persisted(page)).toContain('"totalXp":2');
  });

  test('caps a sitting rather than handing over the whole backlog', async ({ page }) => {
    // 320 cards in one queue is how a review habit dies. A session that ends is one that gets
    // started again tomorrow.
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();

    await expect(page.getByText('0/20', { exact: true })).toBeVisible();
  });

  test('keeps the schedule across a reload', async ({ page }) => {
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();
    await reveal(page).click();
    await gradeButton(page, 'Facile').click();

    await expect.poll(() => persisted(page)).toContain('"reps":1');
    await page.reload();

    // One card is scheduled forward, so the deck is one short of the full 320.
    await expect(page.getByText('319 cartes à revoir aujourd’hui')).toBeVisible();
  });

  test('the answer stays in English while the interface is French', async ({ page }) => {
    // ADR-0004: the exam asks for the English expansion, so that is what has to be recalled.
    await page.goto('/flashcards');
    await page.getByRole('button', { name: 'Commencer la révision' }).click();
    await reveal(page).click();

    await expect(page.locator('main p[lang="en"]').nth(1)).toBeVisible();
  });
});
