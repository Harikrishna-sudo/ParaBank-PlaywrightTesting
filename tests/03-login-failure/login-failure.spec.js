const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('03 - Login Failure Scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TS-004: Verify login fails with invalid password', async ({ loginPage, page }) => {
    // TODO: Assignee implement TS-004
    // 1. Enter valid username and invalid password
    // 2. Click Log In button
    // 3. Verify error message is displayed
  });

  test('TS-005: Verify login fails with empty username and password', async ({ loginPage, page }) => {
    // TODO: Assignee implement TS-005
    // 1. Leave username and password empty
    // 2. Click Log In button
    // 3. Verify error message is displayed
  });
});
