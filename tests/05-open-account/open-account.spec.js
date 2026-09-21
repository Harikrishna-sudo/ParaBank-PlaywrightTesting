const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('05 - Open New Account Scenarios', () => {
  test.beforeEach(async ({ openNewAccountPage }) => {
    await openNewAccountPage.goto();
  });

  test('TS-007: Successfully open a new CHECKING account funded from an existing account', async ({ openNewAccountPage, page }) => {
    // 1. Select CHECKING account type
    // 2. Select source account
    // 3. Click Open New Account
    // 4. Verify new account number is generated and confirmation shown

    // Open a new CHECKING account using the first available funding account
    const newAccountNumber = await openNewAccountPage.openAccount('CHECKING', 0);

    // Verify new account number is generated (not empty)
    expect(newAccountNumber).not.toBe('');

    // Verify the confirmation message contains "Account Opened"
    await expect(openNewAccountPage.openAccountResult).toContainText('Account Opened');

    console.log(`[TS-007] New CHECKING account created: ${newAccountNumber}`);
  });

  test('TS-008: Successfully open a new SAVINGS account funded from an existing account', async ({ openNewAccountPage, page }) => {
    // 1. Select SAVINGS account type
    // 2. Select source account
    // 3. Click Open New Account
    // 4. Verify new account number is generated and confirmation shown

    // Open a new SAVINGS account using the first available funding account
    const newAccountNumber = await openNewAccountPage.openAccount('SAVINGS', 0);

    // Verify new account number is generated (not empty)
    expect(newAccountNumber).not.toBe('');

    // Verify the confirmation message contains "Account Opened"
    await expect(openNewAccountPage.openAccountResult).toContainText('Account Opened');

    console.log(`[TS-008] New SAVINGS account created: ${newAccountNumber}`);
  });

  test('TS-009: Verify the new account appears in the account list after creation', async ({ openNewAccountPage, accountsOverviewPage, page }) => {
    // 1. Open a new account and capture the account number
    // 2. Navigate to Accounts Overview
    // 3. Verify the new account number is listed in the accounts table

    // Open a new CHECKING account and capture the generated account number
    const newAccountNumber = await openNewAccountPage.openAccount('CHECKING', 0);

    // Verify the creation succeeded before navigating away
    expect(newAccountNumber).not.toBe('');
    await expect(openNewAccountPage.openAccountResult).toContainText('Account Opened');

    // Navigate to Accounts Overview
    await accountsOverviewPage.goto();

    // Verify the new account number is listed in the accounts table
    const accountVisible = await accountsOverviewPage.hasAccount(newAccountNumber);
    expect(accountVisible).toBe(true);

    console.log(`[TS-009] New account ${newAccountNumber} confirmed in Accounts Overview`);
  });
});
