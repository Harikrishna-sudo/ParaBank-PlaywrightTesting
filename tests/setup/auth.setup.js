const { test: setup, expect } = require('@playwright/test');
const path = require('path');
const { LoginPage } = require('../../pages/LoginPage.js');

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
  const loginPage = new LoginPage(page);

  // 1. Navigate to login page
  await loginPage.goto();

  // 2. Fill credentials from environment and submit
  await loginPage.login(process.env.PARABANK_USERNAME, process.env.PASSWORD);

  // 3. Assert login succeeded (Accounts Overview page)
  await page.waitForURL('**/overview.htm');
  await expect(page.locator('#mainPanel')).toBeVisible();

  // 4. Save authenticated browser state to disk
  await page.context().storageState({ path: AUTH_FILE });
});
