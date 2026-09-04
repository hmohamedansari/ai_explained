import { expect, test } from '@playwright/test';

const pages = [
  { path: '/learn/', selector: 'a.card', resting: '--aex-paper', active: '--aex-raised' },
  ...['automation-to-agents', 'advanced', 'agents-in-production'].map(track => ({
    path: `/learn/${track}/`, selector: 'a.lesson-card', resting: '--aex-raised', active: '--aex-raised-strong',
  })),
];

for (const { path, selector, resting, active } of pages) {
  test(`learning cards respond to hover and keyboard focus: ${path}`, async ({ page }, testInfo) => {
    await page.addInitScript(theme => localStorage.setItem('theme', theme),
      testInfo.project.name === 'mobile-light' ? 'light' : 'dark');
    await page.goto(path);
    const card = page.locator(selector).first();
    await expect(card).toBeVisible();

    // Resolve semantic colours through the browser so both themes are tested.
    const colours = await page.evaluate(({ resting, active }) => {
      const probe = document.createElement('span');
      document.body.append(probe);
      const resolve = (token: string) => {
        probe.style.color = `var(${token})`;
        return getComputedStyle(probe).color;
      };
      const result = { resting: resolve(resting), active: resolve(active),
        pine: resolve('--aex-pine'), line: resolve('--aex-line'),
        ink: resolve('--aex-ink'), focus: resolve('--aex-mulberry') };
      probe.remove();
      return result;
    }, { resting, active });

    await expect(card).toHaveCSS('background-color', colours.resting);
    await expect(card).toHaveCSS('border-top-color', colours.line);
    await expect(card.locator('.card-title')).toHaveCSS('color', colours.ink);

    const expectActive = async () => {
      await expect(card).toHaveCSS('background-color', colours.active);
      await expect(card).toHaveCSS('border-top-color', colours.pine);
      await expect(card.locator('.card-title')).toHaveCSS('color', colours.pine);
      if (selector === 'a.lesson-card') {
        await expect(card.locator('.lesson-card-marker')).toHaveCSS('color', colours.pine);
        await expect(card.locator('.lesson-card-marker')).toHaveCSS('border-top-color', colours.pine);
        await expect(card.locator('.lesson-card-arrow')).toHaveCSS('color', colours.pine);
      }
    };

    await card.hover();
    await expectActive();
    await page.mouse.move(0, 0);
    await expect(card).toHaveCSS('background-color', colours.resting);
    await expect(card.locator('.card-title')).toHaveCSS('color', colours.ink);

    await page.keyboard.press('Tab');
    await card.focus();
    await expect(card).toBeFocused();
    await expectActive();
    await expect(card).toHaveCSS('outline-color', colours.focus);
    await expect(card).toHaveCSS('outline-style', 'solid');
    await expect(card).toHaveCSS('outline-width', '2px');
  });
}
