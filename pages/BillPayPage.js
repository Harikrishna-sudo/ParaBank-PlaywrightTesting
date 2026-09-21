'use strict';

/**
 * Page Object Model for the ParaBank Bill Pay page.
 * BASE_URL is set in playwright.config.js via process.env.BASE_URL.
 */
class BillPayPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.payeeName     = page.locator('[name="payee.name"]');
    this.payeeStreet   = page.locator('[name="payee.address.street"]');
    this.payeeCity     = page.locator('[name="payee.address.city"]');
    this.payeeState    = page.locator('[name="payee.address.state"]');
    this.payeeZip      = page.locator('[name="payee.address.zipCode"]');
    this.payeePhone    = page.locator('[name="payee.phoneNumber"]');
    this.payeeAccount  = page.locator('[name="payee.accountNumber"]');
    this.verifyAccount = page.locator('[name="verifyAccount"]');
    this.amount        = page.locator('[name="amount"]');
    this.fromAccount   = page.locator('[name="fromAccountId"]');

    // ── Submit button ────────────────────────────────────────────────────────
    this.sendPaymentBtn = page.locator('input[value="Send Payment"]');

    // ── Success result locators ──────────────────────────────────────────────
    this.successHeading = page.locator('#billpayResult h1.title');
    this.successResult  = page.locator('#billpayResult p').first();

    // ── Validation error locators ────────────────────────────────────────────
    this.errorName          = page.locator('#validationModel-name');
    this.errorAddress       = page.locator('#validationModel-address');
    this.errorCity          = page.locator('#validationModel-city');
    this.errorAmountEmpty   = page.locator('#validationModel-amount-empty');
    this.errorAmountInvalid = page.locator('#validationModel-amount-invalid');
  }

  /**
   * Navigate to the Bill Pay page.
   * The session is already active (injected via storageState by the
   * 'authenticated' project in playwright.config.js).
   */
  async goto() {
    const baseURL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';
    await this.page.goto(`${baseURL}/billpay.htm`);
    // Wait for the form to be ready before the test starts interacting
    await this.payeeName.waitFor({ state: 'visible' });
  }

  /**
   * Fill the Bill Pay form and click Send Payment.
   *
   * @param {{
   *   name:          string,
   *   address:       string,
   *   city:          string,
   *   state:         string,
   *   zipCode:       string,
   *   phone:         string,
   *   accountNumber: string,
   *   verifyAccount: string,
   *   amount:        string,
   *   fromIndex?:    number   // 0-based index of the From Account dropdown (default: 0)
   * }} payeeData
   */
  async sendPayment(payeeData) {
    const {
      name,
      address,
      city,
      state,
      zipCode,
      phone,
      accountNumber,
      verifyAccount,
      amount,
      fromIndex = 0,
    } = payeeData;

    await this.payeeName.fill(name);
    await this.payeeStreet.fill(address);
    await this.payeeCity.fill(city);
    await this.payeeState.fill(state);
    await this.payeeZip.fill(zipCode);
    await this.payeePhone.fill(phone);
    await this.payeeAccount.fill(accountNumber);
    await this.verifyAccount.fill(verifyAccount);
    await this.amount.fill(amount);

    // Select source account by dropdown index
    await this.fromAccount.selectOption({ index: fromIndex });

    await this.sendPaymentBtn.click();
  }
}

module.exports = { BillPayPage };
