import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function publishedRoutes() {
  const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
  return [...sitemap.matchAll(/<loc>https:\/\/ai\.hmohamedansari\.com(.*?)<\/loc>/g)]
    .map((match) => match[1]);
}

test('every published page fits 320px and 390px without runtime errors', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-light', 'The responsive audit runs once in the mobile project.');
  test.setTimeout(120_000);

  const routes = await publishedRoutes();
  const runtimeErrors: string[] = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });

  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });

    for (const route of routes) {
      runtimeErrors.length = 0;
      const response = await page.goto(route, { waitUntil: 'load' });
      expect(response?.status(), `${route} should respond successfully`).toBe(200);
      await expect(page.locator('main#main-content'), `${route} should retain one main landmark`).toHaveCount(1);
      await expect(page.locator('h1'), `${route} should retain one page title`).toHaveCount(1);

      const facts = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        canonicalPath: new URL(document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? location.href).pathname,
        brokenImages: [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
      }));

      expect(facts.scrollWidth, `${route} should not create page-level horizontal scrolling at ${width}px`).toBeLessThanOrEqual(facts.width + 1);
      expect(facts.canonicalPath.replace(/\/$/, ''), `${route} should keep its canonical path`).toBe(route.replace(/\/$/, ''));
      expect(facts.brokenImages, `${route} should not contain broken images`).toEqual([]);
      expect(runtimeErrors, `${route} should not emit runtime errors`).toEqual([]);
    }
  }
});
