import { expect, test } from '@playwright/test';

test('theme selection persists across a reload', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-dark', 'The persistence check runs once in the desktop project.');

  await page.goto('/');
  const themeToggle = page.getByRole('button', { name: 'Toggle light/dark mode' });
  await expect(themeToggle).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(true);

  await themeToggle.click();
  await expect.poll(() => page.evaluate(() => ({
    isDark: document.documentElement.classList.contains('dark'),
    storedTheme: localStorage.getItem('theme'),
  }))).toEqual({ isDark: false, storedTheme: 'light' });

  await page.reload();
  await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(false);
});

test('mobile navigation reports its open state', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-light', 'The navigation check runs once in the mobile project.');

  await page.goto('/learn/');
  const menuButton = page.getByRole('button', { name: 'Toggle navigation' });
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();
});
