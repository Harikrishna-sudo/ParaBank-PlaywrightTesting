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
    await navigationComponent.goto();
    await navigationComponent.logout();

    await expect(page).toHaveTitle("ParaBank | Welcome | Online Banking");
    await expect(page).toHaveURL(/index.htm/);
  });

    for (const link of NavLinks) {
    test(`TS-027: After logging out, attempt to directly navigate to ${link.path} `, async ({ page }) => {
      await page.goto(process.env.BASE_URL + link.path);
      await expect(page).toHaveTitle(/Error/);
    });
  }

});
