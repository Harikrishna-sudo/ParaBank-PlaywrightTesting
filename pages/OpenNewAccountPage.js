const BASE_URL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';

class OpenNewAccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Account type dropdown  (0 = CHECKING, 1 = SAVINGS)
    this.accountTypeSelect  = page.locator('#type');

    // Funding account dropdown (populated after page load)
    this.fromAccountSelect  = page.locator('#fromAccountId');

    // Submit button
    this.openAccountButton  = page.locator("input[value='Open New Account']");

    // Result container shown after successful submission
    this.openAccountResult  = page.locator('#openAccountResult');

    // Newly generated account number link inside the result area
    this.newAccountId       = page.locator('#newAccountId');
  }

  async goto() {
    // Navigate to Open New Account page
    await this.page.goto(`${BASE_URL}/openaccount.htm`);
  }

  /**
   * Open a new bank account.
   *
   * @param {'CHECKING'|'SAVINGS'} accountType  - Account type to create
   * @param {number} fromIndex                  - 0-based index of the funding account
   * @returns {Promise<string>} The newly generated account number
   */
  async openAccount(accountType, fromIndex = 0) {
    // Map friendly name to the value attribute used by ParaBank
    // 0 = CHECKING, 1 = SAVINGS
    const typeValue = accountType === 'SAVINGS' ? '1' : '0';

    // Select account type
    await this.accountTypeSelect.selectOption({ value: typeValue });

    // Wait for funding account dropdown to be visible and populated
    await this.fromAccountSelect.waitFor({ state: 'visible' });

    await this.page.waitForFunction(() => {
      const select = document.querySelector('#fromAccountId');
      return select && select.options.length > 0;
    });

    // Select the funding account by index
    const options = await this.fromAccountSelect.locator('option').all();
    const optionValue = await options[fromIndex].getAttribute('value');
    await this.fromAccountSelect.selectOption({ value: optionValue });

    // Click Open New Account button
    await this.openAccountButton.click();

    // Wait for the result section to appear
    await this.openAccountResult.waitFor({ state: 'visible' });

    // Wait until the new account number is populated (not empty)
    await this.page.waitForFunction(() => {
      const el = document.querySelector('#newAccountId');
      return el && el.textContent.trim() !== '';
    });

    // Return the newly created account number
    return (await this.newAccountId.textContent()).trim();
  }
}

module.exports = { OpenNewAccountPage };
