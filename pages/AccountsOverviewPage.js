const BASE_URL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';

class AccountsOverviewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Main accounts table body rows
    this.accountRows = page.locator('#accountTable tbody tr');
  }

  async goto() {
    // Navigate to Accounts Overview page
    await this.page.goto(`${BASE_URL}/overview.htm`);
  }

  /**
   * Returns true when the given account number appears in the accounts table.
   *
   * @param {string} accountNumber - Account number to search for
   * @returns {Promise<boolean>}
   */
  async hasAccount(accountNumber) {
    // Wait for the accounts table to be visible
    await this.accountRows.first().waitFor({ state: 'visible' });

    // Look for a link whose text matches the account number
    const accountLink = this.page.locator('#accountTable').getByRole('link', { name: accountNumber });
    return accountLink.isVisible();
  }
}

module.exports = { AccountsOverviewPage };
