 const BASE_URL = process.env.BASE_URL || 'https://parabank.parasoft.com/parabank';

  class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page          = page;
      this.usernameInput = page.locator("[name='username']");
      this.passwordInput = page.locator("[name='password']");
      this.loginButton   = page.locator("input[value='Log In']");
      this.errorMessage  = page.locator("p.error");
    }

    async goto() {
      await this.page.goto(`${BASE_URL}/index.htm`);
    }

    async enterUsername(username) {
      await this.usernameInput.fill(username);
    }

    async enterPassword(password) {
      await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: 'networkidle' }),
        this.loginButton.click()
      ]);
    }

    async login(username, password) {
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
    }

    async isErrorDisplayed() {
      try {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return true;
      } catch {
        return false;
      }
    }

    async getErrorMessage() {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return (await this.errorMessage.textContent()).trim();
    }
  }

  module.exports = { LoginPage };
