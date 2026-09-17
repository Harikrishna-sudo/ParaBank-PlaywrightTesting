const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('12 - Forgot Login Info Scenarios', () => {
  test.beforeEach(async ({ forgotLoginInfoPage }) => {
    await forgotLoginInfoPage.goto();
  });

  test('TS-028: Successfully retrieve a forgotten username by supplying valid identity information', async ({ forgotLoginInfoPage, page }) => {
    // TODO: Assignee implement TS-028
    // 1. Supply matching First Name, Last Name, Address, City, State, Zip, SSN
    // 2. Click Find My Login Info
    // 3. Verify username is presented to user
  });

  test('TS-029: Successfully reset/retrieve password by supplying valid identity and username information', async ({ forgotLoginInfoPage, page }) => {
    // TODO: Assignee implement TS-029
    // 1. Supply matching identity details
    // 2. Submit form
    // 3. Verify password information is displayed
  });

  test('TS-030: Submit the lookup form with identity information that does not match any customer record', async ({ forgotLoginInfoPage, page }) => {
    // TODO: Assignee implement TS-030
    // 1. Supply non-matching identity details
    // 2. Submit form
    // 3. Verify error message indicating no customer found
  });
});
