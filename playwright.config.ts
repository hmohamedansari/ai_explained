import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4324',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-dark', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    {
      name: 'mobile-light',
      use: {
        ...devices['Desktop Chrome'],
        colorScheme: 'light',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'python3 -m http.server 4324 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4324',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
