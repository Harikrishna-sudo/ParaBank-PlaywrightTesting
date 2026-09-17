const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('05 - Open New Account Scenarios', () => {
  test.beforeEach(async ({ openNewAccountPage }) => {
    await openNewAccountPage.goto();
  });

  test('TS-007: Successfully open a new CHECKING account funded from an existing account', async ({ openNewAccountPage, page }) => {
    // TODO: Assignee implement TS-007
    // 1. Select CHECKING account type
    // 2. Select source account
    // 3. Click Open New Account
    // 4. Verify new account number is generated and confirmation shown
  });

  test('TS-008: Successfully open a new SAVINGS account funded from an existing account', async ({ openNewAccountPage, page }) => {
    // TODO: Assignee implement TS-008
    // 1. Select SAVINGS account type
    // 2. Select source account
    // 3. Click Open New Account
    // 4. Verify new account number is generated and confirmation shown
  });

  test('TS-009: Verify the new account appears in the account list after creation', async ({ openNewAccountPage, accountsOverviewPage, page }) => {
    // TODO: Assignee implement TS-009
    // 1. Open a new account and capture the account number
    // 2. Navigate to Accounts Overview
    // 3. Verify the new account number is listed in the accounts table
  });
});
