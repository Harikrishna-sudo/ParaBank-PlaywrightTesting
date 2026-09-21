require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env'),
  override: true
});

const { test: setup, expect } = require('@playwright/test');
const path = require('path');

/** Path where the authenticated browser state is saved */
const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/user.json');

/**
 * Authentication Setup
 *
 * Logs into ParaBank once and saves the authenticated
 * browser state for the authenticated test project.
 */
setup('authenticate as valid user', async ({ page }) => {

  // Navigate to ParaBank
  await page.goto('/parabank');

  // Verify environment variables are loaded correctly
  expect(process.env.USERNAME).toBe('john');
  expect(process.env.PASSWORD).toBe('demo');

  // Fill username
  await page.locator('input[name="username"]').fill(
      process.env.USERNAME
  );

  // Fill password
  await page.locator('input[name="password"]').fill(
      process.env.PASSWORD
  );

  // Click Log In
  await page.locator('input[value="Log In"]').click();

  // Verify login succeeded
  await expect(
      page.getByRole('heading', { name: 'Accounts Overview' })
  ).toBeVisible();

  // Save authenticated browser state
  await page.context().storageState({
    path: AUTH_FILE
  });
});