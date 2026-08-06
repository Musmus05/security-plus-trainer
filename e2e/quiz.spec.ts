import { expect, type Locator, type Page, test } from '@playwright/test';

const STORAGE_KEY = 'security-plus-trainer';

const persisted = (page: Page) => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

/**
 * The answer options, scoped to the question's own group.
 *
 * A bare `getByRole('radio')` also matches the language and theme controls in the header — and an
 * earlier version of this file did exactly that, silently switching the interface to English
 * mid-test. Scoping is not tidiness here; it is the difference between testing the quiz and
 * operating the settings.
 */
const answerGroup = (page: Page): Locator => page.locator('[aria-label="Réponses possibles"]');

/**
 * The inputs are radios on a single-answer question and checkboxes on a multi-select one, and the
 * bank contains both — so matching only radios breaks the moment the multi-select question is drawn.
 */
const answerOptions = (page: Page): Locator =>
  answerGroup(page).locator('input[type="radio"], input[type="checkbox"]');

/** Answer the current question, then submit. */
async function answerCurrent(page: Page, strategy: 'first' | 'last'): Promise<void> {
  const options = answerOptions(page);

  /*
   * Wait for the question before counting. `count()` is the one locator method that does not retry,
   * so calling it while the lazily-imported question bank is still loading returns 0 — which turns
   * `nth(count - 1)` into `nth(-1)`. That happens to mean "last" in Playwright, so the helper works
   * by accident rather than by design, and it front-loads the entire render wait onto whichever
   * assertion comes next.
   */
  await expect(options.first()).toBeVisible();
  const count = await options.count();

  await options.nth(strategy === 'first' ? 0 : count - 1).check();

  /*
   * Asserting the button is enabled is not redundant with clicking it. If a selection somehow fails
   * to reach React state, the failure reads "submit never became enabled" here, instead of surfacing
   * later as a missing explanation and sending the reader after the wrong bug.
   */
  const submit = page.getByRole('button', { name: 'Vérifier' });
  await expect(submit).toBeEnabled();
  await submit.click();
}

/** Walk a whole quiz, answering every question the same way. */
async function playWholeQuiz(page: Page, strategy: 'first' | 'last'): Promise<void> {
  for (let question = 1; question <= 10; question += 1) {
    await expect(page.getByText(`Question ${String(question)} sur 10`)).toBeVisible();
    await answerCurrent(page, strategy);
    await page
      .getByRole('button', { name: question === 10 ? 'Voir le résultat' : 'Question suivante' })
      .click();
  }
}

test.describe('objective quiz', () => {
  test('an objective with questions offers the quiz; one without does not', async ({ page }) => {
    // A "take the quiz" button that leads to "no questions yet" reads as a broken feature rather
    // than as content that has not been written.
    await page.goto('/objective/1.1');
    await expect(page.getByRole('link', { name: 'Passer le quiz' })).toBeVisible();

    await page.goto('/objective/5.6');
    await expect(page.getByRole('link', { name: 'Passer le quiz' })).toHaveCount(0);
  });

  test('runs a full quiz and records the attempt', async ({ page }) => {
    await page.goto('/objective/1.1/quiz');

    await playWholeQuiz(page, 'first');

    await expect(page.getByText('Résultat')).toBeVisible();
    await expect.poll(() => persisted(page)).toContain('"quizAttempts":1');
  });

  test('records exactly one attempt per quiz, not one per question', async ({ page }) => {
    // StrictMode double-invokes effects, which is why the result is recorded in a handler behind a
    // ref rather than in an effect.
    await page.goto('/objective/1.1/quiz');
    await playWholeQuiz(page, 'first');

    await expect.poll(() => persisted(page)).toContain('"quizAttempts":1');
    expect(await persisted(page)).not.toContain('"quizAttempts":2');
  });

  test('shows an explanation for every option, not only the chosen one', async ({ page }) => {
    await page.goto('/objective/1.1/quiz');

    const group = answerGroup(page);
    const before = (await group.innerText()).length;

    await answerCurrent(page, 'first');

    const after = (await group.innerText()).length;

    // Every option gains a substantive explanation, so the group's text more than doubles. A learner
    // who guessed right still needs to know why the other three were wrong.
    expect(after).toBeGreaterThan(before * 2);
  });

  test('marks the correct answer after revealing', async ({ page }) => {
    await page.goto('/objective/1.1/quiz');
    await answerCurrent(page, 'first');

    /*
     * `.first()`, because the number of markers depends on which question was drawn. The session
     * shuffles, and the bank contains a multi-select question with two correct options — so a bare
     * `getByLabel` fails strict mode roughly one run in ten with "resolved to 2 elements".
     *
     * This is what was previously mistaken for a load-related flake. It is not timing at all: the
     * assertion was wrong for a question shape that already existed in the bank.
     */
    await expect(page.getByLabel('Bonne réponse').first()).toBeVisible();
  });

  test('refuses to change the answer after revealing', async ({ page }) => {
    // Otherwise a learner can read why they were wrong, switch, and score themselves correct.
    await page.goto('/objective/1.1/quiz');

    const options = answerOptions(page);
    await options.first().check();
    await page.getByRole('button', { name: 'Vérifier' }).click();

    await expect(options.first()).toBeDisabled();
    await expect(options.first()).toBeChecked();
  });

  test('cannot submit without choosing an answer', async ({ page }) => {
    await page.goto('/objective/1.1/quiz');

    await expect(page.getByRole('button', { name: 'Vérifier' })).toBeDisabled();
  });

  test('keeps the last question’s explanations on screen until the learner moves on', async ({
    page,
  }) => {
    /*
     * Revealing the last answer completes the session. Deriving the results screen straight from
     * that snatched the final explanations away before they could be read — the reason there is a
     * separate "see result" step.
     */
    await page.goto('/objective/1.1/quiz');

    for (let question = 1; question <= 9; question += 1) {
      await answerCurrent(page, 'first');
      await page.getByRole('button', { name: 'Question suivante' }).click();
    }

    await answerCurrent(page, 'first');

    // `exact` matters: getByText is a case-insensitive substring match by default, so a bare
    // 'Résultat' also matches the "Voir le résultat" button and this assertion could never pass.
    await expect(page.getByText('Résultat', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Voir le résultat' })).toBeVisible();
    await expect(answerGroup(page)).toBeVisible();
  });

  test('offers a retry of only the missed questions', async ({ page }) => {
    await page.goto('/objective/1.1/quiz');
    await playWholeQuiz(page, 'last');

    const retry = page.getByRole('button', { name: /Refaire l(a|es) \d+ questions? manquées?/ });
    await expect(retry).toBeVisible();

    /*
     * How many were missed is not fixed: options are shuffled, so answering "last" every time is
     * wrong a variable number of times. Asserting "fewer than 10" would pass by luck and fail by
     * luck, so the count is read from the button and the retry checked against it.
     */
    const missed = Number(/(\d+)/.exec(await retry.innerText())?.[1] ?? '0');
    expect(missed).toBeGreaterThan(0);

    await retry.click();

    // Re-drilling the whole quiz to fix a few mistakes is how a learner re-reads what they know.
    await expect(page.getByText(`Question 1 sur ${String(missed)}`)).toBeVisible();
  });

  test('the question language can be forced to English independently of the interface', async ({
    page,
  }) => {
    /*
     * The exam is delivered only in English, so a learner reading a French interface still needs to
     * drill English question wording. These are two separate settings for exactly that reason.
     */
    await page.goto('/settings');
    await page.getByRole('radio', { name: 'Toujours en anglais' }).check();

    await page.goto('/objective/1.1/quiz');

    // Interface still French…
    await expect(page.getByRole('button', { name: 'Vérifier' })).toBeVisible();
    // …while the question text is English.
    await expect(page.locator('p[lang="en"]')).toBeVisible();
  });

  test('an unknown objective does not crash the quiz route', async ({ page }) => {
    await page.goto('/objective/9.9/quiz');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Objectif introuvable' }),
    ).toBeVisible();
  });
});
