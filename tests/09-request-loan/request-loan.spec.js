const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('09 - Request Loan Scenarios', () => {
  test.beforeEach(async ({ requestLoanPage }) => {
    await requestLoanPage.goto();
  });

  test('TS-019: Submit a loan request with an amount and down payment that results in approval', async ({ requestLoanPage, page }) => {
    // TODO: Assignee implement TS-019
    // 1. Enter valid loan amount and suitable down payment
    // 2. Select From Account
    // 3. Click Apply Now
    // 4. Verify loan status is "Approved"
  });

  test('TS-020: Submit a loan request with a down payment low enough (relative to available funds) to result in denial', async ({ requestLoanPage, page }) => {
    // TODO: Assignee implement TS-020
    // 1. Enter large loan amount with insufficient down payment
    // 2. Submit application
    // 3. Verify loan status is "Denied"
  });

  test('TS-021: Verify the loan result page displays correct status message', async ({ requestLoanPage, page }) => {
    // TODO: Assignee implement TS-021
    // 1. Submit loan request
    // 2. Verify status text and new account number if approved, or error details if denied
  });
});
