class ForgotLoginInfoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Define locators for Customer Lookup / Forgot Login Info page
  }

  async goto() {
    // TODO: Navigate to lookup page
  }

  async findLoginInfo(customerInfo) {
    // TODO: Implement find login info action
  }
}

module.exports = { ForgotLoginInfoPage };
