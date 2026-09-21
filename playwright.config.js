// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
  override: true
});

/** Saved storage state produced by tests/setup/auth.setup.js */
const AUTH_FILE = path.join(
    __dirname,
    'playwright/.auth/user.json'
);

/** @see https://playwright.dev/docs/test-configuration */
module.exports = defineConfig({
  testDir: './tests',

  /* Run tests sequentially across files */
  fullyParallel: false,
  workers: 1,

  /* Give slower ParaBank pages enough time */
  timeout: 60000,

  /* Expect assertions */
  expect: {
    timeout: 15000,
  },

  /* Fail the build on CI if test.only is accidentally left in source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* HTML reporter */
  reporter: 'html',

  use: {
    /* Base URL */
    baseURL:
        process.env.BASE_URL ||
        'https://parabank-17m8.onrender.com/parabank',

    /* Collect trace when retrying a failed test */
    trace: 'on-first-retry',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Record video on retry */
    video: 'on-first-retry',
  },

  projects: [
    // ─────────────────────────────────────────────────────────────
    // SETUP
    // Logs in once and writes playwright/.auth/user.json
    // ─────────────────────────────────────────────────────────────
    {
      name: 'setup',
      testMatch: '**/setup/auth.setup.js',
    },

    // ─────────────────────────────────────────────────────────────
    // UNAUTHENTICATED
    // Modules 01-04 and 12
    // ─────────────────────────────────────────────────────────────
    {
      name: 'unauthenticated',
      testMatch: [
        '**/01-registration-failure/**/*.spec.js',
        '**/02-registration-success/**/*.spec.js',
        '**/03-login-failure/**/*.spec.js',
        '**/04-login-success/**/*.spec.js',
        '**/12-forgot-login/**/*.spec.js',
      ],
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // ─────────────────────────────────────────────────────────────
    // AUTHENTICATED
    // Modules 05-11
    // ─────────────────────────────────────────────────────────────
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

      /* Authentication setup must pass first */
      dependencies: ['setup'],

      use: {
        ...devices['Desktop Chrome'],

        /* Reuse saved authenticated session */
        storageState: AUTH_FILE,
      },
    },
  ],
});