class RequestLoanPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Loan form fields
    this.loanAmount = page.locator("td #amount");
    this.downPayment = page.locator("td #downPayment");
    this.fromAccount = page.locator("td #fromAccountId");

    // Submit button
    this.applyNowButton = page.locator('input[value="Apply Now"]');

    // Result page
    this.resultSection = page.locator('div#requestLoanResult');
    this.resultHeading = page.locator('#requestLoanResult h1.title');

    // Error page
    this.errorHeading = page.locator("#requestLoanError h1");

    this.errorMessage = page.getByText('An internal error has occurred and has been logged.');

    // Approved result
    this.loanRequestApproved = page.locator('div#loanRequestApproved');
    this.approvedMessage = page.locator('#loanRequestApproved > p:first-child');

    // Denied result
    this.loanRequestDenied = page.locator('div#loanRequestDenied');
    this.deniedMessage = page.locator('#loanRequestDenied p.error');


    this.loanStatus = page.locator('td#loanStatus');
    this.newAccountNumber = page.locator('#newAccountId');

  }

  async goto() {
    await this.page.goto('/parabank/requestloan.htm');

    // Wait until the loan form is ready
    await this.loanAmount.waitFor({ state: 'visible' });
  }
 
  //Submit Loan Application
  async applyForLoan(amount, downPayment, fromAccountId = 0) {
    await this.loanAmount.fill(amount);
    await this.downPayment.fill(downPayment);

    // Select the source account.
    // By default we use the first available account.
    await this.fromAccount.selectOption({ index: fromAccountId });

    await this.applyNowButton.click();
    await this.resultHeading.waitFor({state: 'visible'});
  }

   // Get Denied Message
   async getDeniedMessage() {
    return await this.deniedMessage.textContent();
   }

   // Get Approved Message

  async getApprovedMessage() {
    return await this.approvedMessage.textContent();
  }


  // Get loan status
  async getLoanStatus() {
    return await this.loanStatus.textContent();
  }


  // Get new account number if loan is approved
  async getNewAccountNumber() {
    return await this.newAccountNumber.textContent();
  }
}

module.exports = { RequestLoanPage };