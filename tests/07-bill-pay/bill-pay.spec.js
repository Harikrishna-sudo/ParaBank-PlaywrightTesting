const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('07 - Bill Payment Scenarios', () => {
  test.beforeEach(async ({ billPayPage }) => {
    await billPayPage.goto();
  });

  test('TS-013: Verify bill payment is successful with valid payee details', async ({ billPayPage, page }) => {
    // TODO: Assignee implement TS-013
    // 1. Fill all required payee details and valid amount
    // 2. Select source account
    // 3. Click Send Payment
    // 4. Verify "Bill Payment Complete" confirmation message
  });

  test('TS-014: Attempt to submit a bill payment with required payee fields left empty', async ({ billPayPage, page }) => {
    // TODO: Assignee implement TS-014
    // 1. Leave mandatory payee fields empty (e.g., Name, Address, City)
    // 2. Click Send Payment
    // 3. Verify validation error messages are displayed for missing fields
  });

  test('TS-015: Attempt to submit a bill payment with an amount of zero', async ({ billPayPage, page }) => {
    // TODO: Assignee implement TS-015
    // 1. Fill payee details but enter 0 for amount
    // 2. Click Send Payment
    // 3. Verify validation error message for amount
  });
});
