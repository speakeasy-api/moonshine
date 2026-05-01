import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.001,
      stylePath: './tests/visual/screenshot.css',
    },
  },
  use: {
    baseURL: 'http://127.0.0.1:57606',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 1000 },
      },
    },
  ],
})
