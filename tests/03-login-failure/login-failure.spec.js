const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('03 - Login Failure Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TS-004: Verify login fails with invalid password', async ({ loginPage, page }) => {
    // 1. Enter valid username and invalid password
      await loginPage.enterUsername('john');
      await loginPage.enterPassword('wrongpassword');

      // 2. Click Log In button
      await loginPage.clickLoginButton();

      // 3. Verify error message is displayed
      expect(await loginPage.isErrorDisplayed()).toBe(true);
      await expect(page).toHaveURL(/login\.htm/);
      const error = await loginPage.getErrorMessage();
      expect(error.length).toBeGreaterThan(0);
      console.log('[TS-004] Error:', error);
    });

  test('TS-005: Verify login fails with empty username and password', async ({ loginPage, page }) => {
   // 1. Leave username and password empty
      await loginPage.enterUsername('');
      await loginPage.enterPassword('');

      // 2. Click Log In button
      await loginPage.clickLoginButton();

      // 3. Verify error message is displayed
      expect(await loginPage.isErrorDisplayed()).toBe(true);
