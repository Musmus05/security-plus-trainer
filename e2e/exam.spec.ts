import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';

const STORAGE_KEY = 'security-plus-trainer';

const persisted = (page: Page) => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

const startExam = async (page: Page) => {
  await page.getByRole('button', { name: 'Démarrer l’examen blanc' }).click();
  await expect(page.getByRole('timer', { name: 'Temps restant' })).toBeVisible();
};

/** The answer inputs, scoped to the question's own group so the header controls are excluded. */
const options = (page: Page) =>
  page
    .locator('[aria-label="Réponses possibles"]')
    .locator('input[type="radio"], input[type="checkbox"]');

/** Rewrite the persisted attempt's start time to simulate the clock having run. */
async function shiftStart(page: Page, deltaMs: number): Promise<void> {
  await page.evaluate(
    ([key, delta]) => {
      const raw = localStorage.getItem(key);
      if (raw === null) return;
      const blob = JSON.parse(raw) as { state: { currentExam: { startedAt: number } | null } };
      if (blob.state.currentExam === null) return;
      blob.state.currentExam.startedAt -= delta;
      localStorage.setItem(key, JSON.stringify(blob));
    },
    [STORAGE_KEY, deltaMs] as const,
  );
}

test.describe('mock exam', () => {
  test('shows the official domain split before the exam starts', async ({ page }) => {
    // Knowing that domain 4 is 28% of the paper is itself exam-preparation information — it is the
    // first thing the official objectives document tells you.
    await page.goto('/exam');

    await expect(page.getByText('Répartition officielle par domaine')).toBeVisible();

    // Scoped to the split list. "25 questions" now also appears on the domain 4 exam row further
    // down the page, so an unscoped match resolves to two elements and asserts nothing about either.
    const split = page.getByRole('list').filter({ hasText: 'Opérations de sécurité' }).first();
    await expect(split).toContainText('25 questions');
    await expect(split).toContainText('11 questions');
  });

  test('labels the scaled score as an estimate before it is ever shown', async ({ page }) => {
    // A candidate who reads this only after seeing "812 · passed" has already formed the belief it
    // exists to prevent.
    await page.goto('/exam');

    await expect(page.getByText(/estimation de cette application/)).toBeVisible();
    await expect(page.getByText(/CompTIA ne publie pas son barème/)).toBeVisible();
  });

  test('draws ninety questions at the official weights', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);

    await expect(page.getByText('Question 1 sur 90')).toBeVisible();
    // The review grid has one button per question.
    await expect(page.getByRole('button', { name: /^Question \d+,/ })).toHaveCount(90);
  });

  test('never reveals whether an answer was right', async ({ page }) => {
    /*
     * The one behaviour that separates an exam from a quiz. Sharing the quiz's card and passing
     * `revealed={false}` would put the whole feedback path one prop away from this screen, which is
     * exactly the accident that only shows up in a screenshot afterwards.
     */
    await page.goto('/exam');
    await startExam(page);
    await options(page).first().check();

    await expect(page.getByLabel('Bonne réponse')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Vérifier' })).toHaveCount(0);
  });

  test('lets an answer be changed after moving away and coming back', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);

    await options(page).first().check();
    await page.getByRole('button', { name: 'Suivante' }).click();
    await page.getByRole('button', { name: 'Précédente' }).click();

    // The selection is still there — this is the whole reason the real exam allows navigation.
    await expect(options(page).first()).toBeChecked();

    await options(page).last().check();
    await expect(options(page).last()).toBeChecked();

    /*
     * Branching on the input type, not on an assumption. 47 of the 420 questions are multi-select,
     * so roughly one run in ten drew one here and failed on an assertion that was simply wrong for
     * that shape: checking a second box is a *toggle*, not a replacement. Asserting both rules is
     * better coverage than picking a question that avoids the question.
     */
    const multiSelect = (await options(page).first().getAttribute('type')) === 'checkbox';

    if (multiSelect) {
      await expect(options(page).first()).toBeChecked();
    } else {
      await expect(options(page).first()).not.toBeChecked();
    }
  });

  test('the review grid jumps to a question and marks what is answered', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);
    await options(page).first().check();

    await expect(page.getByRole('button', { name: 'Question 1, répondue' })).toBeVisible();

    await page.getByRole('button', { name: /^Question 42,/ }).click();
    await expect(page.getByText('Question 42 sur 90')).toBeVisible();
  });

  test('a flag survives navigation and is announced', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);

    await page.getByRole('button', { name: 'Marquer' }).click();
    await expect(page.getByRole('button', { name: 'Question 1, marquée' })).toBeVisible();

    await page.getByRole('button', { name: 'Suivante' }).click();
    await page.getByRole('button', { name: 'Question 1, marquée' }).click();
    await expect(page.getByRole('button', { name: 'Retirer la marque' })).toBeVisible();
  });

  test('the attempt and its clock survive a reload', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);
    await options(page).first().check();
    await page.getByRole('button', { name: /^Question 7,/ }).click();

    await expect.poll(() => persisted(page)).toContain('"currentExam"');
    await page.reload();

    // Back on question 7, not back at the start screen and not back at question 1.
    await expect(page.getByText('Question 7 sur 90')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Question 1, répondue' })).toBeVisible();
  });

  test('the clock keeps running while the app is closed', async ({ page }) => {
    /*
     * The reason the attempt stores `startedAt` rather than a countdown. Shifting the stored start
     * back by an hour is exactly what an hour away from the tab does — a stored `remainingMs`
     * decremented by an interval would hand the candidate a fresh ninety minutes here.
     */
    await page.goto('/exam');
    await startExam(page);
    await expect.poll(() => persisted(page)).toContain('"currentExam"');

    await shiftStart(page, 60 * 60 * 1000);
    await page.reload();

    await expect(page.getByRole('timer', { name: 'Temps restant' })).toContainText('0:2');
  });

  test('running out of time submits the attempt', async ({ page }) => {
    // Including time that ran out while the tab was closed: reopening must give a result, not a
    // dead timer on an exam that can no longer be finished.
    await page.goto('/exam');
    await startExam(page);
    await expect.poll(() => persisted(page)).toContain('"currentExam"');

    await shiftStart(page, 91 * 60 * 1000);
    await page.reload();

    await expect(page.getByRole('button', { name: 'Refaire un examen blanc' })).toBeVisible();
    await expect.poll(() => persisted(page)).toContain('"examHistory":[{');
  });

  test('warns about blank questions before marking', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);
    await options(page).first().check();

    await page.getByRole('button', { name: 'Terminer' }).click();

    await expect(page.getByText('Terminer l’examen ?')).toBeVisible();
    await expect(page.getByText(/89 questions sans réponse/)).toBeVisible();
  });

  test('marks the exam and breaks the result down by domain', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);
    await options(page).first().check();

    await page.getByRole('button', { name: 'Terminer' }).click();
    await page.getByRole('button', { name: 'Terminer et corriger' }).click();

    // The raw score leads; the scaled estimate is the subtitle. Leading with a three-digit scaled
    // score would borrow a precision this app has not earned.
    // `exact`, because the denominator is its own span: a substring match also finds the "1/90"
    // rows in the by-domain breakdown and resolves to several elements.
    await expect(page.getByText('/90', { exact: true })).toBeVisible();
    await expect(page.getByText(/Score estimé : \d+ · seuil 750/)).toBeVisible();
    await expect(page.getByText('Détail par domaine')).toBeVisible();
    await expect(page.getByText('89 questions laissées sans réponse')).toBeVisible();
  });

  test('the running exam and the result are accessible in both themes', async ({ page }) => {
    /*
     * The route-level axe pass in `smoke.spec.ts` only ever sees the start screen, because that is
     * what `/exam` renders on a cold load. Everything that makes this feature hard — a sticky
     * timer, ninety review-grid buttons, a confirmation panel, a result breakdown — is behind a
     * click and would never have been checked.
     */
    const violations = async () =>
      (
        await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()
      ).violations.map((violation) => ({
        id: violation.id,
        help: violation.help,
        nodes: violation.nodes.map((node) => ({
          target: node.target.join(' '),
          detail: node.any.map((check) => check.message).join(' | '),
        })),
      }));

    for (const scheme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto('/exam');
      await startExam(page);

      await options(page).first().check();
      await page.getByRole('button', { name: 'Marquer' }).click();
      expect(await violations(), `running exam, ${scheme}`).toEqual([]);

      await page.getByRole('button', { name: 'Terminer' }).click();
      expect(await violations(), `submit confirmation, ${scheme}`).toEqual([]);

      await page.getByRole('button', { name: 'Terminer et corriger' }).click();
      await expect(page.getByText('Détail par domaine')).toBeVisible();
      expect(await violations(), `result, ${scheme}`).toEqual([]);
    }
  });

  test('files the attempt in the history and clears the exam in progress', async ({ page }) => {
    await page.goto('/exam');
    await startExam(page);
    await page.getByRole('button', { name: 'Terminer' }).click();
    await page.getByRole('button', { name: 'Terminer et corriger' }).click();

    await expect.poll(() => persisted(page)).toContain('"currentExam":null');
    await page.goto('/exam');

    await expect(page.getByText('Tentatives précédentes')).toBeVisible();
    await expect(page.getByText('Échoué')).toBeVisible();
  });
});

test.describe('domain exams', () => {
  test('the hub lists one paper per domain with its size and clock', async ({ page }) => {
    await page.goto('/exam');

    await expect(page.getByRole('heading', { name: 'Examens par domaine' })).toBeVisible();

    /*
     * The sizes are the domains' own shares of the real paper — 11 / 20 / 16 / 25 / 18 — and the
     * clock is the real exam's minute per question. Asserting the pair together is what would catch
     * a duration invented independently of the question count.
     */
    for (const [domain, count] of [
      [1, 11],
      [2, 20],
      [3, 16],
      [4, 25],
      [5, 18],
    ] as const) {
      await expect(
        page.getByRole('link', {
          name: `${String(count)} questions en ${String(count)} minutes`,
        }),
        `domain ${String(domain)}`,
      ).toBeVisible();
    }
  });

  test('the domain number is announced, not only shown', async ({ page }) => {
    // The number badge is decorative and hidden, so without an explicit name the link reads as the
    // domain title twice — and the number is how the exam itself identifies its domains.
    await page.goto('/exam');

    await expect(page.getByRole('link', { name: /^Domaine 1\.0 Concepts généraux/ })).toBeVisible();
  });

  test('a domain paper draws only that domain, on its own clock', async ({ page }) => {
    // "General Security Concepts" is domain 1: 11 questions, 11 minutes.
    await page.goto('/exam/1');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Concepts généraux');
    await page.getByRole('button', { name: 'Démarrer l’examen blanc' }).click();

    await expect(page.getByText('Question 1 sur 11')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Question \d+,/ })).toHaveCount(11);
    await expect(page.getByRole('timer', { name: 'Temps restant' })).toContainText('0:10');
  });

  test('the result of a domain paper reports only that domain', async ({ page }) => {
    await page.goto('/exam/3');
    await page.getByRole('button', { name: 'Démarrer l’examen blanc' }).click();
    await options(page).first().check();

    await page.getByRole('button', { name: 'Terminer' }).click();
    await page.getByRole('button', { name: 'Terminer et corriger' }).click();

    await expect(page.getByText('/16', { exact: true })).toBeVisible();
    // One row in the breakdown, not five: the other four domains were never examined.
    await expect(page.getByRole('progressbar', { name: /^Domaine \d/ })).toHaveCount(1);
    await expect(page.getByRole('progressbar', { name: /^Domaine 3\.0/ })).toBeVisible();
  });

  test('refuses to start a second exam while one is running', async ({ page }) => {
    /*
     * There is one attempt at a time. Silently replacing an exam somebody is halfway through, with
     * a clock still running on it, is not a trade a button should make on their behalf.
     */
    await page.goto('/exam/2');
    await page.getByRole('button', { name: 'Démarrer l’examen blanc' }).click();
    await expect(page.getByText('Question 1 sur 20')).toBeVisible();

    await page.goto('/exam/4');

    await expect(page.getByText(/Tu as déjà un examen en cours : Domaine 2/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Démarrer l’examen blanc' })).toHaveCount(0);

    await page.getByRole('link', { name: 'Reprendre cet examen' }).click();
    await expect(page.getByText('Question 1 sur 20')).toBeVisible();
  });

  test('the full paper and a domain paper keep separate histories', async ({ page }) => {
    await page.goto('/exam/5');
    await page.getByRole('button', { name: 'Démarrer l’examen blanc' }).click();
    await page.getByRole('button', { name: 'Terminer' }).click();
    await page.getByRole('button', { name: 'Terminer et corriger' }).click();
    await expect(page.getByText('Détail par domaine')).toBeVisible();

    // The domain 5 paper remembers its own attempt…
    await page.goto('/exam/5');
    await expect(page.getByText('Tentatives précédentes')).toBeVisible();
    await expect(page.getByText('0/18')).toBeVisible();

    // …and the full mock does not claim it as one of its own.
    await page.goto('/exam');
    await expect(page.getByText('Tentatives précédentes')).toHaveCount(0);
  });

  test('a URL naming no real domain is a dead end, not an empty exam', async ({ page }) => {
    await page.goto('/exam/9');

    await expect(page.getByRole('heading', { level: 1, name: 'Examen introuvable' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Démarrer l’examen blanc' })).toHaveCount(0);
  });
});
