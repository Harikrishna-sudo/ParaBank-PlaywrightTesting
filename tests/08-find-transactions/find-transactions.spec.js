const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('08 - Find Transactions Scenarios', () => {
  test.beforeEach(async ({ findTransactionsPage }) => {
    await findTransactionsPage.goto();
  });

  test('TS-016: Verify searching transactions by transaction ID returns results', async ({ findTransactionsPage, page }) => {
    // TODO: Assignee implement TS-016
    // 1. Enter an existing transaction ID
    // 2. Click Find Transactions button
    // 3. Verify matching transaction record is returned in results
  });

  test('TS-017: Search for transactions by a specific date and verify only matching transactions are returned', async ({ findTransactionsPage, page }) => {
    // TODO: Assignee implement TS-017
    // 1. Enter date (MM-DD-YYYY)
    // 2. Click Find By Date button
    // 3. Verify all returned rows match the entered date
  });

  test('TS-018: Search for transactions by a specific amount and verify the correct matching transaction(s) are returned', async ({ findTransactionsPage, page }) => {
    // TODO: Assignee implement TS-018
    // 1. Enter amount
    // 2. Click Find By Amount button
    // 3. Verify returned transactions match the amount
  });
});
