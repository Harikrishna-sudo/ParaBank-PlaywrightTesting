const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('01 - Registration Failure Scenarios', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.goto();
  });

  test('TS-001: Verify registration fails when required fields are left empty', async ({ registrationPage, page }) => {
    // TODO: Assignee implement TS-001
    // 1. Submit empty registration form
    await registrationPage.clickRegister();
    // 2. Verify validation error messages for required fields
    await expect(registrationPage.firstNameError).toBeVisible();
    await expect(registrationPage.firstNameError).toContainText('First name is required.');

    await expect(registrationPage.lastNameError).toBeVisible();
    await expect(registrationPage.lastNameError).toContainText('Last name is required.');

    await expect(registrationPage.addressError).toBeVisible();
    await expect(registrationPage.addressError).toContainText('Address is required.');

    await expect(registrationPage.cityError).toBeVisible();
    await expect(registrationPage.cityError).toContainText('City is required.');

    await expect(registrationPage.stateError).toBeVisible();
    await expect(registrationPage.stateError).toContainText('State is required.');

    await expect(registrationPage.zipCodeError).toBeVisible();
    await expect(registrationPage.zipCodeError).toContainText('Zip Code is required.');

    await expect(registrationPage.ssnError).toBeVisible();
    await expect(registrationPage.ssnError).toContainText('Social Security Number is required.');

    await expect(registrationPage.usernameError).toBeVisible();
    await expect(registrationPage.usernameError).toContainText('Username is required.');

    await expect(registrationPage.passwordError).toBeVisible();
    await expect(registrationPage.passwordError).toContainText('Password is required.');

    await expect(registrationPage.confirmPasswordError).toBeVisible();
    await expect(registrationPage.confirmPasswordError).toContainText('Password confirmation is required.');
  });

  test('TS-002: Verify registration fails when username already exists', async ({ registrationPage, page }) => {
    // TODO: Assignee implement TS-002
    // 1. Fill form with an already existing username
    await registrationPage.fillForm({
      firstName: 'Duplicate',
      lastName: 'User',
      address: '123 Main St',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      phone: '555-0199',
      ssn: '000-00-0000',
      username: 'john',
      password: 'demoPassword123',
      confirmPassword: 'demoPassword123',
    })
    // 2. Click Register
    await registrationPage.clickRegister();

    // 3. Verify error indicating username already exists
    await expect(registrationPage.usernameError).toBeVisible();
    await expect(registrationPage.usernameError).toContainText('This username already exists.');
  });
});
