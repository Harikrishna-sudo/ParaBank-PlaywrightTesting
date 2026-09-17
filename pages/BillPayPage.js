class BillPayPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Define locators for Bill Payment page
  }

  async goto() {
    // TODO: Navigate to bill payment page
  }

  async sendPayment(payeeData) {
    // TODO: Implement send payment action
  }
}

module.exports = { BillPayPage };
