const { test, expect } = require('../../fixtures/test-fixtures');
const { testData } = require('../../test-data/sample-data');

test.describe.serial('07 - Bill Payment Scenarios', () => {
  test.beforeEach(async ({ billPayPage }) => {
    await billPayPage.goto();
  });

  test('TS-013: Verify bill payment is successful with valid payee details', async ({ billPayPage, page }) => {
    // 1. Fill all required payee details and valid amount
    // 2. Select source account (first available, index 0)
    // 3. Click Send Payment
    await billPayPage.sendPayment(testData.billPay.samplePayee);

    // 4. Verify "Bill Payment Complete" confirmation message
    await expect(billPayPage.successHeading).toHaveText('Bill Payment Complete');

    // Also verify payee name appears in the result paragraph
    await expect(billPayPage.successResult).toContainText(testData.billPay.samplePayee.name);
    
  });

  test('TS-014: Attempt to submit a bill payment with required payee fields left empty', async ({ billPayPage, page }) => {
    // 1. Leave ALL mandatory fields empty
    // 2. Click Send Payment directly without filling anything
    await billPayPage.sendPaymentBtn.click();

    // 3. Verify validation error messages are displayed for each missing field
    await expect(billPayPage.errorName).toBeVisible();
    await expect(billPayPage.errorAddress).toBeVisible();
    await expect(billPayPage.errorCity).toBeVisible();
    await expect(billPayPage.errorState).toBeVisible();
    await expect(billPayPage.errorZipCode).toBeVisible();
    await expect(billPayPage.errorPhone).toBeVisible();
    await expect(billPayPage.errorAccount).toBeVisible();
    await expect(billPayPage.errorVerifyAccount).toBeVisible();
    await expect(billPayPage.errorAmount).toBeVisible();
  });

  test('TS-015: Attempt to submit a bill payment with an amount of zero', async ({ billPayPage, page }) => {
    // 1. Fill all payee details with valid data but set amount to "0"
    // 2. Click Send Payment
    await billPayPage.sendPayment({
      ...testData.billPay.samplePayee,
      amount: '0',
    });

    // 3. ParaBank accepts $0.00 as valid — verify the payment completes successfully
    await expect(billPayPage.successHeading).toHaveText('Bill Payment Complete');
    await expect(billPayPage.successResult).toContainText('$0.00');
  });
});
