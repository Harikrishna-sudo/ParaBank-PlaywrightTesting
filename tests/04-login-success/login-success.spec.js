const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('04 - Login Success Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TS-006: Verify successful login with valid credentials', async ({ loginPage, page }) => {
   
      // 1. Enter valid username and password
      await loginPage.enterUsername('john');
      await loginPage.enterPassword('demo');

      // 2. Click Log In button
      await loginPage.clickLoginButton();

      // 3. Verify user lands on Accounts Overview page
      await expect(page).not.toHaveURL(/login\.htm/);
      await expect(page).toHaveURL(/overview\.htm/);
      await expect(page.locator('h1.title')).toHaveText('Accounts Overview');
      console.log('[TS-006] Login successful - URL:', page.url());
  });
});
