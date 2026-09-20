class TransferFundsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ── Form inputs ──────────────────────────────────────────────────────────
    this.amountInput    = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect   = page.locator('#toAccountId');

    // ── Submit button ────────────────────────────────────────────────────────
    this.transferBtn = page.locator('input[value="Transfer"]');

    // ── Success result locators ──────────────────────────────────────────────
    this.successHeading = page.locator('#showResult h1.title');
    this.successAmount  = page.locator('#showResult #amountResult');
    this.successFromAccount = page.locator('#showResult #fromAccountIdResult');
    this.successToAccount   = page.locator('#showResult #toAccountIdResult');

    // ── Error / validation locators ──────────────────────────────────────────
    this.errorAmount  = page.locator('.error').first();
    this.errorHeading = page.locator('h1.title', { hasText: 'Error!' });
  }

  async goto() {
    const baseURL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';
    await this.page.goto(`${baseURL}/transfer.htm`);
    // Wait until the form is interactive before the test begins
    await this.amountInput.waitFor({ state: 'visible' });
  }

  /**
   * Fill in and submit the transfer form.
   * @param {string|number} amount          - Transfer amount (e.g. '100' or 100)
   * @param {number}        [fromIndex=0]   - <option> index for the source account
   * @param {number}        [toIndex=1]     - <option> index for the destination account
   */
  async transferFunds(amount, fromIndex = 0, toIndex = 0) {
    await this.amountInput.fill(String(amount));

    // ParaBank auto-populates the dropdowns; select by visible option index
    await this.fromAccountSelect.selectOption({ index: fromIndex });
    await this.toAccountSelect.selectOption({ index: toIndex });

    await this.transferBtn.click();
    // Wait for the page to respond (result panel or error)
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { TransferFundsPage };
