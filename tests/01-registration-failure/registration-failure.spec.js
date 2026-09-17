const { test, expect } = require('../../fixtures/test-fixtures');

test.describe.serial('01 - Registration Failure Scenarios', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.goto();
  });

  test('TS-001: Verify registration fails when required fields are left empty', async ({ registrationPage, page }) => {
    // TODO: Assignee implement TS-001
    // 1. Submit empty registration form
    // 2. Verify validation error messages for required fields
  });

  test('TS-002: Verify registration fails when username already exists', async ({ registrationPage, page }) => {
    // TODO: Assignee implement TS-002
    // 1. Fill form with an already existing username
    // 2. Click Register
    // 3. Verify error indicating username already exists
  });
});
