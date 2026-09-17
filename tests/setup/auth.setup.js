const { test: setup } = require('@playwright/test');
const path = require('path');

/** Path where the authenticated browser state is saved */
const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/user.json');

/**
 * Authentication Setup — runs ONCE before all authenticated test modules (05–11).
 *
 * Steps:
 *   1. Navigate to the ParaBank login page
 *   2. Fill in credentials from environment variables (USERNAME / PASSWORD)
 *   3. Assert the login succeeded (Accounts Overview visible)
 *   4. Save the full browser storage state (cookies + localStorage) to
 *      playwright/.auth/user.json so all authenticated projects can reuse it
 *
 * This file is intentionally NOT a regular spec — it uses setup() not test().
 * It is wired as a Playwright "setup" project in playwright.config.js and
 * runs automatically before the authenticated project group.
 */
setup('authenticate as valid user', async ({ page }) => {
  // TODO: Implement login using LoginPage or direct page interactions
  // 1. Navigate to login page
  // await page.goto('index.htm');

  // 2. Fill credentials from environment
  // await page.locator('...usernameInput...').fill(process.env.USERNAME);
  // await page.locator('...passwordInput...').fill(process.env.PASSWORD);
  // await page.locator('...loginButton...').click();

  // 3. Assert login succeeded
  // await page.waitForURL('**/overview.htm');
  // await expect(page.locator('...')).toBeVisible();

  // 4. Save authenticated browser state to disk
  await page.context().storageState({ path: AUTH_FILE });
});
