// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

require('dotenv').config();

/** Saved storage state produced by tests/setup/auth.setup.js */
const AUTH_FILE = path.join(__dirname, 'playwright/.auth/user.json');

/** @see https://playwright.dev/docs/test-configuration */
module.exports = defineConfig({
  testDir: './tests',

  /* Run tests sequentially across files for complete flow execution */
  fullyParallel: false,
  workers: 1,

  /* Fail the build on CI if test.only is accidentally left in source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* HTML reporter — open with: npx playwright show-report */
  reporter: 'html',

  use: {
    /* Base URL — set BASE_URL in .env or environment */
    baseURL: process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank',
    headless:false,
    /* Collect trace when retrying a failed test */
    trace: 'on-first-retry',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on failure */
    video: 'on-first-retry',
  },

  projects: [
    // ─────────────────────────────────────────────────────────────────
    // SETUP — logs in once and writes playwright/.auth/user.json
    // Runs before the authenticated project group.
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'setup',
      testMatch: '**/setup/auth.setup.js',
    },

    // ─────────────────────────────────────────────────────────────────
    // UNAUTHENTICATED — modules 01-04 and 12
    // These pages are intentionally public; no login state is needed.
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'unauthenticated',
      testMatch: [
        '**/01-registration-failure/**/*.spec.js',
        '**/02-registration-success/**/*.spec.js',
        '**/03-login-failure/**/*.spec.js',
        '**/04-login-success/**/*.spec.js',
        '**/12-forgot-login/**/*.spec.js',
      ],
      use: { ...devices['Desktop Chrome'] },
    },

    // ─────────────────────────────────────────────────────────────────
    // AUTHENTICATED — modules 05-11
    // Depends on setup completing first; each browser context is
    // pre-loaded with the saved storage state (cookies / session).
    // ─────────────────────────────────────────────────────────────────
    {
      name: 'authenticated',
      testMatch: [
        '**/05-open-account/**/*.spec.js',
        '**/06-transfer-funds/**/*.spec.js',
        '**/07-bill-pay/**/*.spec.js',
        '**/08-find-transactions/**/*.spec.js',
        '**/09-request-loan/**/*.spec.js',
        '**/10-update-contact-info/**/*.spec.js',
        '**/11-logout-navigation/**/*.spec.js',
      ],
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
  ],
});
