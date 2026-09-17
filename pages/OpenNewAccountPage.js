class OpenNewAccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Define locators for Open New Account page
  }

  async goto() {
    // TODO: Navigate to open new account page
  }

  async openAccount(accountType, fromAccountId) {
    // TODO: Implement open new account action
  }
}

module.exports = { OpenNewAccountPage };
