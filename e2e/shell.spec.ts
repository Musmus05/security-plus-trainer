import { expect, type Page, test } from '@playwright/test';

const STORAGE_KEY = 'security-plus-trainer';

const pageBackground = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.body).backgroundColor);

const htmlLang = (page: Page) => page.evaluate(() => document.documentElement.lang);

const persisted = (page: Page) => page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);

/**
 * Wait until a setting has reached storage before reloading.
 *
 * Without this the test races the persist write, and the race is won or lost depending on how fast
 * the device emulation runs — which is exactly how a test ends up passing on desktop and failing on
 * mobile for no product reason. Polling for the write also asserts the thing that matters.
 */
async function waitForPersisted(page: Page, fragment: string): Promise<void> {
  await expect.poll(() => persisted(page), { timeout: 5_000 }).toContain(fragment);
}

/** The shell renders after JavaScript, so keyboard tests must wait for it to exist. */
async function waitForShell(page: Page): Promise<void> {
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
}

test.describe('navigation', () => {
  test('reaches every top-level destination', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: /navigation principale|main navigation/i });

    for (const [name, heading] of [
      ['Apprendre', 'Parcours'],
      ['Examen blanc', 'Examen blanc'],
      ['Flashcards', 'Flashcards'],
      ['Glossaire', 'Acronymes'],
      ['Réglages', 'Réglages'],
      ['Accueil', 'Ta progression'],
    ] as const) {
      await nav.getByRole('link', { name }).click();
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    }
  });

  test('marks the current destination for assistive technology', async ({ page }) => {
    await page.goto('/glossary');

    // NavLink sets aria-current="page" on the active link; Playwright's getByRole has no
    // `current` option, so the attribute is matched directly.
    const current = page.locator('a[aria-current="page"]');

    await expect(current).toHaveCount(1);
    await expect(current).toHaveAttribute('href', '/glossary');
  });

  test('a deep link into a real route renders that route', async ({ page }) => {
    const response = await page.goto('/settings');

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'Réglages' })).toBeVisible();
  });

  test('an unknown path renders the not-found page, still over a 200', async ({ page }) => {
    // The SPA rewrite means the server always answers 200; the router decides what is missing.
    const response = await page.goto('/objective/does-not-exist/quiz/nope');

    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: 'Page introuvable' })).toBeVisible();
  });
});

test.describe('settings persistence', () => {
  test('the interface language survives a reload', async ({ page }) => {
    await page.goto('/');

    // French is the default, so this first assertion also documents that.
    await expect(page.getByRole('heading', { level: 1, name: 'Ta progression' })).toBeVisible();
    expect(await htmlLang(page)).toBe('fr');

    await page.getByRole('radio', { name: /Switch interface to English|English/ }).check();

    await expect(page.getByRole('heading', { level: 1, name: 'Your progress' })).toBeVisible();
    expect(await htmlLang(page)).toBe('en');

    await waitForPersisted(page, '"locale":"en"');
    await page.reload();

    // The reason this matters: i18next is initialised from the rehydrated store *before* the first
    // render, so a French reader never sees a frame of English on a cold load, and vice versa.
    await expect(page.getByRole('heading', { level: 1, name: 'Your progress' })).toBeVisible();
    expect(await htmlLang(page)).toBe('en');
  });

  test('the theme choice survives a reload and overrides the OS preference', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await waitForShell(page);

    const osDark = await pageBackground(page);

    await page.getByRole('radio', { name: /^Clair$|^Light$/ }).check();
    const forcedLight = await pageBackground(page);

    expect(forcedLight).not.toBe(osDark);

    await waitForPersisted(page, '"theme":"light"');
    await page.reload();
    await waitForShell(page);

    // Polled, not read once: `reload()` resolves on the load event, but `data-theme` is applied by
    // an effect after the first render. Reading the background immediately samples the OS theme.
    await expect.poll(() => pageBackground(page)).toBe(forcedLight);
  });

  test('"match my system" releases the override rather than pinning a value', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await waitForShell(page);

    const systemDark = await pageBackground(page);

    await page.getByRole('radio', { name: /^Clair$|^Light$/ }).check();
    expect(await pageBackground(page)).not.toBe(systemDark);

    await page.getByRole('radio', { name: /Comme mon système|Match my system/ }).check();

    // Back to following the OS. Writing data-theme="system" instead of removing the attribute
    // would leave the page pinned to whatever it happened to be showing.
    expect(await pageBackground(page)).toBe(systemDark);
    expect(await page.evaluate(() => document.documentElement.dataset['theme'])).toBeUndefined();
  });

  test('a chosen daily goal survives a reload', async ({ page }) => {
    await page.goto('/settings');

    await page.getByRole('radio', { name: '250 XP' }).check();

    await waitForPersisted(page, '"dailyGoalXp":250');
    await page.reload();

    await expect(page.getByRole('radio', { name: '250 XP' })).toBeChecked();
  });
});

test.describe('keyboard access', () => {
  test('the skip link is the first focusable element and jumps to main', async ({ page }) => {
    await page.goto('/');
    await waitForShell(page);

    await page.locator('body').press('Tab');

    const skipLink = page.getByRole('link', {
      name: /Aller au contenu principal|Skip to main content/,
    });

    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute('href', '#main');
  });

  test('the theme group is operable with arrow keys alone', async ({ page }) => {
    await page.goto('/');
    await waitForShell(page);

    const group = page.getByRole('radiogroup', { name: /Thème|Theme/ });
    const system = group.getByRole('radio', { name: /Comme mon système|Match my system/ });

    // Arrow keys rather than Space: stepping through options with the arrows is how a radio group
    // is actually driven from a keyboard, and it is behaviour a native input gives us for free.
    await system.focus();
    await expect(system).toBeChecked();

    await page.keyboard.press('ArrowRight');

    await expect(group.getByRole('radio', { name: /^Clair$|^Light$/ })).toBeChecked();

    await page.keyboard.press('ArrowRight');

    await expect(group.getByRole('radio', { name: /Sombre|^Dark$/ })).toBeChecked();
  });
});
