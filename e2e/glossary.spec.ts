import { expect, type Page, test } from '@playwright/test';

const search = (page: Page) =>
  page.getByRole('searchbox', { name: /Rechercher un acronyme|Search the acronym list/ });

/**
 * Glossary rows, scoped to the main landmark.
 *
 * A bare `getByRole('listitem')` also counts the six navigation links, which are a list too — so
 * the full appendix reported 326 entries rather than 320 and the count assertion was measuring the
 * navigation as much as the content.
 */
const entries = (page: Page) => page.getByRole('main').getByRole('listitem');

test.describe('acronym glossary', () => {
  test('lists the whole official appendix, grouped alphabetically', async ({ page }) => {
    await page.goto('/glossary');

    // 320 is the count the extraction produced from the objectives PDF. Asserting the number, not
    // just "more than a few", is what would catch a truncated re-extraction — the failure mode that
    // cut an earlier run at 69 entries and looked entirely plausible.
    await expect(page.getByText('320 acronymes de l’annexe officielle SY0-701')).toBeVisible();
    await expect(entries(page)).toHaveCount(320);

    /*
     * The real appendix runs A to X with no digit-initial entry and no J, Q, Y or Z. Asserting the
     * absence of the `#` bucket is not pedantry: the grouping code creates it on demand, so a `#`
     * heading appearing here would mean the extraction had picked up a page number or a footnote
     * marker as an acronym. `search.test.ts` covers the `#` bucket itself on synthetic data.
     */
    await expect(page.getByRole('heading', { name: 'A', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'X', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '#', exact: true })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Z', exact: true })).toHaveCount(0);
  });

  test('ranks an exact acronym above the entries that merely contain it', async ({ page }) => {
    await page.goto('/glossary');
    await search(page).fill('AES');

    // AES-256 also matches, and a plain filter would order it by position in the list rather than
    // by relevance.
    await expect(entries(page).first()).toContainText('AES');
    await expect(entries(page).first()).toContainText('Advanced Encryption Standard');
  });

  test('finds an entry from its French gloss, unaccented', async ({ page }) => {
    // The point of the gloss is that a French speaker can find the English term they need. Typing
    // the accent on a phone keyboard is exactly the friction the diacritic fold removes.
    await page.goto('/glossary');
    await search(page).fill('chiffrement');

    await expect(entries(page).first()).toBeVisible();
    await expect(page.getByText(/^\d+ résultats?$/)).toBeVisible();
  });

  test('keeps the official English expansion visible in the French interface', async ({ page }) => {
    // ADR-0004: the exam is English-only, so the English never disappears behind the translation.
    await page.goto('/glossary');
    await search(page).fill('SIEM');

    const first = entries(page).first();
    await expect(first).toContainText('Security Information and Event Management');
    await expect(first).toContainText('Gestion des informations et événements de sécurité');
  });

  test('says so when nothing matches, and names what was typed', async ({ page }) => {
    await page.goto('/glossary');
    await search(page).fill('zzzzqqq');

    await expect(page.getByText('Aucun acronyme ne correspond à « zzzzqqq ».')).toBeVisible();
    await expect(entries(page)).toHaveCount(0);
  });

  test('the clear button restores the full list', async ({ page }) => {
    await page.goto('/glossary');
    await search(page).fill('AES');
    await expect(entries(page)).not.toHaveCount(320);

    await page.getByRole('button', { name: 'Effacer la recherche' }).click();

    await expect(entries(page)).toHaveCount(320);
    await expect(search(page)).toHaveValue('');
  });

  test('an objective chip leads to that objective', async ({ page }) => {
    /*
     * The link is derived from the official outline rather than stored, so this also checks the
     * derivation still produces something. CIA is named verbatim in objective 1.2's topic list
     * ("Confidentiality, Integrity, and Availability (CIA)"), which is why it is the one asserted.
     */
    await page.goto('/glossary');
    await search(page).fill('CIA');

    await entries(page).first().getByRole('link', { name: '1.2' }).click();

    await expect(page).toHaveURL(/\/objective\/1\.2$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('drops the French gloss when the interface is English', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('radio', { name: /Switch interface to English|English/ }).check();
    await expect(page.getByRole('heading', { level: 1, name: 'Your progress' })).toBeVisible();

    await page.goto('/glossary');
    await search(page).fill('SIEM');

    const first = entries(page).first();
    await expect(first).toContainText('Security Information and Event Management');
    await expect(first).not.toContainText('Gestion des informations');
  });
});
