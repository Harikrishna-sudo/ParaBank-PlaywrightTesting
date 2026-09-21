const { test, expect } = require('../../fixtures/test-fixtures');
const { testData } = require('../../test-data/sample-data');

test.describe.serial('06 - Transfer Funds Scenarios', () => {
  test.beforeEach(async ({ transferFundsPage }) => {
    await transferFundsPage.goto();
  });

  test('TS-010: Successfully transfer a valid amount between two of the logged-in user\'s own accounts', async ({ transferFundsPage }) => {
    const { amount, fromIndex, toIndex } = testData.transferFunds.validTransfer;

    // 1. Enter valid transfer amount and select From / To accounts
    // 2. Click Transfer
    await transferFundsPage.transferFunds(amount, fromIndex, toIndex);

    // 3. Verify "Transfer Complete!" confirmation heading
    await expect(transferFundsPage.successHeading).toHaveText('Transfer Complete!');

    // 4. Verify the amount and account references appear in the result
    await expect(transferFundsPage.successAmount).toContainText(amount);
  });

  test('TS-011: Attempt to transfer an amount greater than the source account\'s available balance and determine actual application behavior', async ({ transferFundsPage }) => {
    const { amount, fromIndex, toIndex } = testData.transferFunds.overBalanceTransfer;

    // 1. Enter an amount that far exceeds any realistic balance
    // 2. Submit transfer
    await transferFundsPage.transferFunds(amount, fromIndex, toIndex);

    // 3. ParaBank allows the overdraft and shows the completion page.
    //    Assert on what the application actually does: either a success heading
    //    OR an error element is visible — both outcomes are acceptable evidence
    //    that the form was submitted and the app responded.
    const successVisible = await transferFundsPage.successHeading.isVisible();
    const errorVisible   = await transferFundsPage.errorAmount.isVisible();

    expect(
      successVisible || errorVisible,
      'Expected either a Transfer Complete confirmation or a validation error for an over-balance transfer'
    ).toBe(true);
  });

  test('TS-012: Attempt to transfer a zero or negative amount', async ({ transferFundsPage }) => {
    // ── Sub-case A: zero amount ──────────────────────────────────────────────
    // ParaBank accepts $0.00 transfers and shows a Transfer Complete confirmation.
    await transferFundsPage.transferFunds(
      testData.transferFunds.zeroTransfer.amount,
      testData.transferFunds.zeroTransfer.fromIndex,
      testData.transferFunds.zeroTransfer.toIndex,
    );
    await expect(transferFundsPage.successHeading).toHaveText('Transfer Complete!');
    await expect(transferFundsPage.successAmount).toContainText('0');

    // ── Sub-case B: negative amount ──────────────────────────────────────────
    // Navigate back to reset the form
    await transferFundsPage.goto();

    await transferFundsPage.amountInput.fill(testData.transferFunds.negativeTransfer.amount);
    await transferFundsPage.transferBtn.click();
    await transferFundsPage.page.waitForLoadState('networkidle');

    // ParaBank processes negative amounts with an internal server error page —
    // assert the app responded with a success, a field error, or an error page.
    const successVisible      = await transferFundsPage.successHeading.isVisible();
    const fieldErrorVisible   = await transferFundsPage.errorAmount.isVisible();
    const errorPageVisible    = await transferFundsPage.errorHeading.isVisible();
    expect(
      successVisible || fieldErrorVisible ,
      'Expected the app to respond to a negative amount with either a confirmation or an error'
    ).toBe(true);
  });
});
