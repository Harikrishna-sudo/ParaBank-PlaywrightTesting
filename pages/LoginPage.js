
  class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator("[name='username']");
      this.passwordInput = page.locator("[name='password']");
      this.loginButton   = page.locator("input[value='Log In']");
      this.errorMessage  = page.locator("p.error");
    }

    async goto() {
      await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.page.waitForNavigation
        ? await Promise.all([
            this.page.waitForNavigation(),
            this.loginButton.click()
          ])
        : await this.loginButton.click();
    }

    async isErrorDisplayed() {
      try {
        await this.errorMessage.waitFor({ timeout: 5000 });
        return await this.errorMessage.isVisible();
      } catch {
        return false;
      }
    }

    async getErrorMessage() {
      await this.errorMessage.waitFor({ timeout: 5000 });
      return (await this.errorMessage.textContent()).trim();
    }
  }

  module.exports = { LoginPage };

