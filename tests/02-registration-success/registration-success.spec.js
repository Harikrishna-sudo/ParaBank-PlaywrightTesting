const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('02 - Registration Success Scenarios', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.goto();
  });

  test('TS-003: Verify successful new user registration with valid data', async ({ registrationPage, page }) => {
    // TODO: Assignee implement TS-003
    const uniqueUsername = `user_${Date.now()}`;

    // 1. Fill all mandatory fields with unique data
    await registrationPage.fillForm({
      firstName: 'Jane',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      phone: '555-0199',
      ssn: '000-00-0000',
      username: uniqueUsername,
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });

    // 2. Click Register
    await registrationPage.clickRegister();

    // 3. Verify success message and welcome screen
    await expect(registrationPage.welcomeMessage).toBeVisible();
    await expect(registrationPage.welcomeMessage).toContainText(`Welcome ${uniqueUsername}`);
    await expect(registrationPage.successConfirmation).toContainText('Your account was created successfully. You are now logged in.');
  });
});
