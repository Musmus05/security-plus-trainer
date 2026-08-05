import { expect, test } from '@playwright/test';

test.describe('the exam outline', () => {
  test('lists all five domains with their published weights', async ({ page }) => {
    await page.goto('/path');

    for (const [name, weight] of [
      ['Concepts généraux de sécurité', '12 %'],
      ['Menaces, vulnérabilités et mesures d’atténuation', '22 %'],
      ['Architecture de sécurité', '18 %'],
      ['Opérations de sécurité', '28 %'],
      ['Gestion et supervision du programme de sécurité', '20 %'],
    ] as const) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
      await expect(page.getByText(`${weight} de l’examen`)).toBeVisible();
    }
  });

  test('links to all 28 objectives', async ({ page }) => {
    await page.goto('/path');

    const links = page.locator('a[href^="/objective/"]');

    await expect(links).toHaveCount(28);
  });

  test('opens an objective and shows its official scope', async ({ page }) => {
    await page.goto('/objective/4.6');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Dans un scénario donné, mettre en œuvre et maintenir la gestion des identités et des accès.',
      }),
    ).toBeVisible();

    // The official English title stays visible beneath the French one: the exam is delivered in
    // English, so that sentence is what has to be recognised on the day.
    await expect(
      page.getByText('Given a scenario, implement and maintain identity and access management.'),
    ).toBeVisible();

    // Official sub-topics, in CompTIA's own wording, untranslated.
    await expect(page.getByText('Privileged access management tools')).toBeVisible();
    await expect(page.getByText('Single sign-on (SSO)')).toBeVisible();
  });

  test('shows only the English title when the interface is English', async ({ page }) => {
    await page.goto('/objective/1.1');
    await page.getByRole('radio', { name: /Switch interface to English|English/ }).check();

    const title = 'Compare and contrast various types of security controls.';

    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    // Exactly once — not duplicated as its own "official wording" line.
    await expect(page.getByText(title, { exact: true })).toHaveCount(1);
  });

  test('an objective number that does not exist is reported, not crashed', async ({ page }) => {
    await page.goto('/objective/4.99');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Objectif introuvable' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Retour au parcours' })).toBeVisible();
  });

  test('an objective is reachable by typing its exam number into the URL', async ({ page }) => {
    // The route keeps the exam's own numbering rather than a slug, so a guessed URL works.
    const response = await page.goto('/objective/2.4');

    expect(response?.status()).toBe(200);
    await expect(
      page.getByText('Given a scenario, analyze indicators of malicious activity.'),
    ).toBeVisible();
  });
});
