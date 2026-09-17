const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('04 - Login Success Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TS-006: Verify successful login with valid credentials', async ({ loginPage, page }) => {
    // TODO: Assignee implement TS-006
    // 1. Enter valid username and password
    // 2. Click Log In button
    // 3. Verify user lands on Accounts Overview page
  });
});
