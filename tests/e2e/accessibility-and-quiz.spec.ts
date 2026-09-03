import { expect, test } from '@playwright/test';

const publicPages = [
  '/', '/about/', '/advanced/', '/changelog/', '/learn/', '/learn/automation-to-agents/',
  '/onboarding/', '/production/', '/workbench/', '/tools/', '/paths/', '/paths/curious-beginner/',
  '/paths/experienced-dev/', '/paths/new-dev/', '/paths/sre-devops/', '/paths/tech-leader/',
  '/learn/automation-to-agents/events-queues-and-workflows/',
];

test.beforeEach(async ({ page }, testInfo) => {
  const theme = testInfo.project.name === 'mobile-light' ? 'light' : 'dark';
  await page.addInitScript((selectedTheme) => localStorage.setItem('theme', selectedTheme), theme);
});

for (const path of publicPages) {
  test(`skip link reaches the only main landmark: ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('main#main-content')).toHaveCount(1);
    await page.getByRole('link', { name: 'Skip to main content' }).focus();
    await page.keyboard.press('Enter');
    await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe('main-content');
  });
}

test('assessment keeps compact cards and supports keyboard, feedback and retry', async ({ page }) => {
  await page.goto('/learn/automation-to-agents/events-queues-and-workflows/');
  const firstQuestion = page.getByTestId('quiz-question-1');
  const firstCard = firstQuestion.getByTestId('quiz-question-card');

  await expect(firstQuestion).toHaveAccessibleName(/Question 1: What is an event/);
  await expect(firstCard).toHaveScreenshot('assessment-question-card.png');

  const firstOption = firstQuestion.getByRole('radio', { name: 'A record that something happened' });
  await firstOption.focus();
  await page.keyboard.press('ArrowDown');
  await expect(firstQuestion.getByRole('radio').nth(1)).toBeChecked();
  await page.keyboard.press('ArrowUp');
  await expect(firstOption).toBeChecked();
  await firstQuestion.getByRole('button', { name: 'Check answer' }).click();
  await expect(firstQuestion.getByText('Correct')).toBeVisible();

  const secondQuestion = page.getByTestId('quiz-question-2');
  await secondQuestion.getByRole('radio', { name: /safe to repeat/ }).focus();
  await page.keyboard.press('Space');
  await secondQuestion.getByRole('button', { name: 'Check answer' }).click();
  await page.getByRole('button', { name: 'See my score' }).click();
  await expect(page.getByText('2 / 2 correct')).toBeVisible();
  await page.getByRole('button', { name: 'Retry' }).click();
  await expect(firstOption).not.toBeChecked();
});
