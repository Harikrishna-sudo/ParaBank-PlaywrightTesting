class RequestLoanPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Define locators for Request Loan page
  }

  async goto() {
    // TODO: Navigate to request loan page
  }

  async applyForLoan(amount, downPayment, fromAccountId) {
    // TODO: Implement apply for loan action
  }
}

module.exports = { RequestLoanPage };
