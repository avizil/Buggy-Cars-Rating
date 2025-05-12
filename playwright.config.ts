import { defineConfig, devices } from '@playwright/test';
import { baseUrl, STORAGE_STATE_PATH, env } from './consts';
import { loadEnv } from './utils/envLoader';

// Load env file according to the env const set in the consts file
loadEnv(env);
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
   testDir: './tests/',
   /* Run tests in files in parallel */
   fullyParallel: true,
   /* Fail the build on CI if you accidentally left test.only in the source code. */
   forbidOnly: !!process.env.CI,
   /* Retry on CI only */
   retries: process.env.CI ? 2 : 0,
   /* Opt out of parallel tests on CI. */
   workers: process.env.CI ? 1 : undefined,
   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
   reporter: 'html',
   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {
      /* Base URL to use in actions like `await page.goto('/')`. */
      baseURL: baseUrl,
      actionTimeout: 5000,
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
   },

   /* Configure projects for major browsers */
   projects: [
      {
         name: 'setup',
         testMatch: /.*\.setup\.ts/,
         use: { ...devices['Desktop Chrome'] },
      },
      {
         name: 'registration',
         use: { ...devices['Desktop Chrome'] },
         testDir: './tests/registration',
      },
      {
         name: 'logged',
         use: { ...devices['Desktop Chrome'], storageState: STORAGE_STATE_PATH },
         dependencies: ['setup'],
         testDir: './tests/logged/',
      },
   ],

   /* Run your local dev server before starting the tests */
   // webServer: {
   //   command: 'npm run start',
   //   url: 'http://127.0.0.1:3000',
   //   reuseExistingServer: !process.env.CI,
   // },
});
