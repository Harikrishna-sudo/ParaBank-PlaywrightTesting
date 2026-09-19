const BASE_URL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';

class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // TODO: Define locators for Registration page (inputs, buttons, error messages)
    this.firstNameInput = page.locator("[id='customer.firstName']");
    this.lastNameInput = page.locator("[id='customer.lastName']");
    this.addressInput = page.locator("[id='customer.address.street']");
    this.cityInput = page.locator("[id='customer.address.city']");
    this.stateInput = page.locator("[id='customer.address.state']");
    this.zipCodeInput = page.locator("[id='customer.address.zipCode']");
    this.phoneInput = page.locator("[id='customer.phoneNumber']");
    this.ssnInput = page.locator("[id='customer.ssn']");
    this.usernameInput = page.locator("[id='customer.username']");
    this.passwordInput = page.locator("[id='customer.password']");
    this.confirmPasswordInput = page.locator("[id='repeatedPassword']");

    this.registerButton = page.locator("input[value='Register']");

    this.firstNameError = page.locator("[id='customer.firstName.errors']");
    this.lastNameError = page.locator("[id='customer.lastName.errors']");
    this.addressError = page.locator("[id='customer.address.street.errors']");
    this.cityError = page.locator("[id='customer.address.city.errors']");
    this.stateError = page.locator("[id='customer.address.state.errors']");
    this.zipCodeError = page.locator("[id='customer.address.zipCode.errors']");
    this.ssnError = page.locator("[id='customer.ssn.errors']");
    this.usernameError = page.locator("[id='customer.username.errors']");
    this.passwordError = page.locator("[id='customer.password.errors']");
    this.confirmPasswordError = page.locator("[id='repeatedPassword.errors']");

    this.welcomeMessage = page.locator("h1.title");
    this.successConfirmation = page.locator("#rightPanel p");
  }

  async goto() {
    // TODO: Navigate to registration page
    await this.page.goto(`${BASE_URL}/register.htm`);
  }

  async fillForm(userData = {}){
    if(userData.firstName !== undefined)  await this.firstNameInput.fill(userData.firstName);
    if (userData.lastName !== undefined)  await this.lastNameInput.fill(userData.lastName);
    if (userData.address !== undefined)   await this.addressInput.fill(userData.address);
    if (userData.city !== undefined)      await this.cityInput.fill(userData.city);
    if (userData.state !== undefined)     await this.stateInput.fill(userData.state);
    if (userData.zipCode !== undefined)   await this.zipCodeInput.fill(userData.zipCode);
    if (userData.phone !== undefined)     await this.phoneInput.fill(userData.phone);
    if (userData.ssn !== undefined)       await this.ssnInput.fill(userData.ssn);
    if (userData.username !== undefined)  await this.usernameInput.fill(userData.username);
    if (userData.password !== undefined)  await this.passwordInput.fill(userData.password);
    if (userData.confirmPassword !== undefined) {
      await this.confirmPasswordInput.fill(userData.confirmPassword);
    } else if (userData.password !== undefined) {
      await this.confirmPasswordInput.fill(userData.password);
    }
  }
  
  async clickRegister(){
    await this.registerButton.click();
  }

  async register(userData = {}) {
    // TODO: Implement user registration action
    await this.fillForm(userData);
    await this.clickRegister();
  }
}

module.exports = { RegistrationPage };
