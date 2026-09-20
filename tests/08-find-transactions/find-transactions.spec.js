const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('08 - Find Transactions Scenarios', () => {
  test.beforeEach(async ({ findTransactionsPage }) => {
    await findTransactionsPage.goto();
  });

  test('TS-016: Verify searching transactions by transaction ID returns results', async ({ findTransactionsPage, page }) => {
    // 1. Read the first account ID already loaded in the dropdown
    const accountId = await findTransactionsPage.accountSelect.inputValue();

    // 2. Fetch a real transaction ID via the ParaBank REST API (no extra navigation)
    const baseURL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';
    const response = await page.request.get(
      `${baseURL}/services/bank/accounts/${accountId}/transactions`,
      { headers: { Accept: 'application/json' } },
    );
    expect(response.ok()).toBeTruthy();
    const transactions = await response.json();
    expect(transactions.length).toBeGreaterThan(0);
    const transactionId = String(transactions[0].id);

    // 3. Search by that transaction ID
    await findTransactionsPage.findByTransactionId(transactionId);

    // 4. Verify the results table is visible and contains exactly one row
    await expect(findTransactionsPage.resultsTable).toBeVisible();
    const rowCount = await findTransactionsPage.resultRows.count();
    expect(rowCount).toBeGreaterThanOrEqual(1);

    // Verify the returned row's link points back to the correct transaction
    const resultLink = findTransactionsPage.resultRows.first().locator('a');
    await expect(resultLink).toHaveAttribute('href', new RegExp(`id=${transactionId}`));
  });

  test('TS-017: Search for transactions by a specific date and verify only matching transactions are returned', async ({ findTransactionsPage, page }) => {
    // 1. Fetch a real transaction date from the API so the search always has results
    const accountId = await findTransactionsPage.accountSelect.inputValue();
    const baseURL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';
    const response = await page.request.get(
      `${baseURL}/services/bank/accounts/${accountId}/transactions`,
      { headers: { Accept: 'application/json' } },
    );
    expect(response.ok()).toBeTruthy();
    const transactions = await response.json();
    expect(transactions.length).toBeGreaterThan(0);

    // Convert epoch-ms to MM-DD-YYYY (the format the page input and results use)
    const epochMs = transactions[0].date;
    const d = new Date(epochMs);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day   = String(d.getDate()).padStart(2, '0');
    const year  = d.getFullYear();
    const searchDate = `${month}-${day}-${year}`;

    // 2. Search by that date
    await findTransactionsPage.findByDate(searchDate);

    // 3. Verify results table is visible and all returned rows match the entered date
    await expect(findTransactionsPage.resultsTable).toBeVisible();
    const rowCount = await findTransactionsPage.resultRows.count();
    expect(rowCount).toBeGreaterThanOrEqual(1);

    // Column 0 in the results table is the transaction date
    const dates = await findTransactionsPage.getColumnValues(0);
    for (const date of dates) {
      expect(date).toContain(searchDate);
    }
  });

  test('TS-018: Search for transactions by a specific amount and verify the correct matching transaction(s) are returned', async ({ findTransactionsPage, page }) => {
    // 1. Fetch a real transaction amount from the API so the search always has results
    const accountId = await findTransactionsPage.accountSelect.inputValue();
    const baseURL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';
    const response = await page.request.get(
      `${baseURL}/services/bank/accounts/${accountId}/transactions`,
      { headers: { Accept: 'application/json' } },
    );
    expect(response.ok()).toBeTruthy();
    const transactions = await response.json();
    expect(transactions.length).toBeGreaterThan(0);

    // Use the absolute amount of the first transaction, formatted to 2 decimal places
    const rawAmount = Math.abs(transactions[0].amount);
    const searchAmount = rawAmount.toFixed(2);

    // 2. Click Find By Amount button
    await findTransactionsPage.findByAmount(searchAmount);

    // 3. Verify results table is visible and returned transactions contain that amount
    await expect(findTransactionsPage.resultsTable).toBeVisible();
    const rowCount = await findTransactionsPage.resultRows.count();
    expect(rowCount).toBeGreaterThanOrEqual(1);

    // Results table: Date(0), Transaction(1), Debit(2), Credit(3)
    // A row has the amount in either the Debit or Credit column; the other is empty.
    // Read whichever non-empty cell carries the value and compare against searchAmount.
    const debitValues  = await findTransactionsPage.getColumnValues(2);
    const creditValues = await findTransactionsPage.getColumnValues(3);
    for (let i = 0; i < debitValues.length; i++) {
      const raw = debitValues[i] || creditValues[i];
      expect(raw.replace(/[$-]/g, '')).toBe(searchAmount);
    }
  });
});
