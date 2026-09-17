const { test, expect } = require('../../fixtures/test-fixtures');
const NavLinks = require("../../test-data/authenticated-routes");

test.describe.serial('11 - Logout & Navigation Scenarios', () => {
  for (const link of NavLinks) {
    test(`TS-025: Verify navigation menu link ${link.path} is accessible`, async ({ page }) => {
      await page.goto(process.env.BASE_URL + link.path);
      expect(await page.title()).toContain(link.expectedTitle);
    });
  }

  test('TS-026: Log out of an active session and verify the user is returned to the login page', async ({ navigationComponent, page }) => {
    // TODO: Assignee implement TS-026
    // 1. Click Log Out link
    // 2. Verify user is on login page and Customer Login heading is visible
  });

  test('TS-027: After logging out, attempt to directly navigate (via URL) to a protected page such as Accounts Overview', async ({ navigationComponent, page }) => {
    // TODO: Assignee implement TS-027
    // 1. Ensure logged out state
    // 2. Attempt to goto overview.htm
    // 3. Verify user is redirected or presented with error/login prompt
  });
});
