const BASE_URL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';

class ForgotLoginInfoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ── Form inputs (IDs from the actual Customer Lookup page) ────────────────
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput  = page.locator('#lastName');
    this.addressInput   = page.locator('#address\\.street');
    this.cityInput      = page.locator('#address\\.city');
    this.stateInput     = page.locator('#address\\.state');
    this.zipCodeInput   = page.locator('#address\\.zipCode');
    this.ssnInput       = page.locator('#ssn');

    // ── Submit button ────────────────────────────────────────────────────────
    this.findButton = page.locator("input[value='Find My Login Info']");

    // ── Result panel ─────────────────────────────────────────────────────────
    this.resultPanel  = page.locator('#rightPanel');
    this.errorMessage = page.locator('#rightPanel .error, #rightPanel p.error, #rightPanel b');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/lookup.htm`);
  }

  /**
   * Fill and submit the Customer Lookup form.
   * @param {{ firstName: string, lastName: string, address: string,
   *           city: string, state: string, zipCode: string, ssn: string }} customerInfo
   */
  async findLoginInfo(customerInfo) {
    await this.firstNameInput.fill(customerInfo.firstName);
    await this.lastNameInput.fill(customerInfo.lastName);
    await this.addressInput.fill(customerInfo.address);
    await this.cityInput.fill(customerInfo.city);
    await this.stateInput.fill(customerInfo.state);
    await this.zipCodeInput.fill(customerInfo.zipCode);
    await this.ssnInput.fill(customerInfo.ssn);
    await this.findButton.click();
  }

  /** Returns the full text of the result/error panel. */
  async getResultText() {
    await this.resultPanel.waitFor({ state: 'visible', timeout: 10000 });
    return (await this.resultPanel.textContent()).trim();
  }
}

module.exports = { ForgotLoginInfoPage };
