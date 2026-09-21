const { test, expect } = require('../../fixtures/test-fixtures');
const { forgotLoginData } = require('../../test-data/forgot-login-data');

const BASE_URL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';

/**
 * Registers a brand-new unique customer and immediately logs out.
 * Returns the full identity + credential data so tests can use it.
 * Self-contained within module 12 — touches no shared files.
 *
 * @param {import('@playwright/test').Page} page
 */
async function registerFreshUser(page) {
  const ts     = Date.now();
  const digits = String(ts).slice(-9).padStart(9, '1');
  const ssn    = `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;

  const user = {
    firstName: 'ForgotTest',
    lastName:  `User${ts}`,
    address:   '42 Lookup Ave',
    city:      'Austin',
    state:     'TX',
    zipCode:   '78701',
    ssn,
    phone:     '5125550101',
    username:  `fl${ts}`,
    password:  `Pw${ts}`,
  };

  await page.goto(`${BASE_URL}/register.htm`);
  await page.fill("[id='customer.firstName']",       user.firstName);
  await page.fill("[id='customer.lastName']",        user.lastName);
  await page.fill("[id='customer.address.street']",  user.address);
  await page.fill("[id='customer.address.city']",    user.city);
  await page.fill("[id='customer.address.state']",   user.state);
  await page.fill("[id='customer.address.zipCode']", user.zipCode);
  await page.fill("[id='customer.phoneNumber']",     user.phone);
  await page.fill("[id='customer.ssn']",             user.ssn);
  await page.fill("[id='customer.username']",        user.username);
  await page.fill("[id='customer.password']",        user.password);
  await page.fill('[id="repeatedPassword"]',         user.password);

  await page.click("input[value='Register']");
  await page.waitForLoadState('networkidle', { timeout: 15000 });

  // Log out so subsequent tests run on a clean unauthenticated session
  const logoutLink = page.locator('a[href*="logout"]');
  if (await logoutLink.isVisible({ timeout: 5000 }).catch(() => false)) {
    await logoutLink.click();
    await page.waitForLoadState('domcontentloaded');
  }

  return user;
}

test.describe.serial('12 - Forgot Login Info Scenarios', () => {
  // Shared user registered once for TS-007 and TS-008
  let sharedUser;

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    sharedUser = await registerFreshUser(page);
    await page.close();
  });

  test.beforeEach(async ({ forgotLoginInfoPage }) => {
    await forgotLoginInfoPage.goto();
  });

  /**
   * TS-007 — Successfully retrieve a forgotten username by supplying valid
   * identity information.
   *
   * 1. Navigate to the Customer Lookup page (beforeEach).
   * 2. Fill all identity fields with the pre-registered user's data.
   * 3. Click "Find My Login Info".
   * 4. Verify the result panel shows "Your login information was located"
   *    and contains the expected username.
   */
  test('TS-007: Successfully retrieve a forgotten username by supplying valid identity information', async ({ forgotLoginInfoPage }) => {
    // Step 2 — fill and submit the lookup form with valid identity details
    await forgotLoginInfoPage.findLoginInfo({
      firstName: sharedUser.firstName,
      lastName:  sharedUser.lastName,
      address:   sharedUser.address,
      city:      sharedUser.city,
      state:     sharedUser.state,
      zipCode:   sharedUser.zipCode,
      ssn:       sharedUser.ssn,
    });

    // Step 3 — read the result
    const resultText = await forgotLoginInfoPage.getResultText();
    console.log('[TS-007]', resultText.replace(/\s+/g, ' ').trim());

    // Step 4 — assert success message and username are present
    await expect(forgotLoginInfoPage.resultPanel).toBeVisible();
    expect(resultText).toMatch(/Your login information was located/i);
    expect(resultText).toContain(sharedUser.username);
  });

  /**
   * TS-008 — Successfully reset/retrieve password by supplying valid identity
   * and username information.
   *
   * 1. Navigate to the Customer Lookup page (beforeEach).
   * 2. Fill all identity fields with the pre-registered user's data.
   * 3. Click "Find My Login Info".
   * 4. Verify the result panel shows both the username and the password.
   */
  test('TS-008: Successfully reset/retrieve password by supplying valid identity and username information', async ({ forgotLoginInfoPage }) => {
    // Step 2 — fill and submit the lookup form with valid identity details
    await forgotLoginInfoPage.findLoginInfo({
      firstName: sharedUser.firstName,
      lastName:  sharedUser.lastName,
      address:   sharedUser.address,
      city:      sharedUser.city,
      state:     sharedUser.state,
      zipCode:   sharedUser.zipCode,
      ssn:       sharedUser.ssn,
    });

    // Step 3 — read the result
    const resultText = await forgotLoginInfoPage.getResultText();
    console.log('[TS-008]', resultText.replace(/\s+/g, ' ').trim());

    // Step 4 — assert success message, username and password are present
    await expect(forgotLoginInfoPage.resultPanel).toBeVisible();
    expect(resultText).toMatch(/Your login information was located/i);
    expect(resultText).toContain(sharedUser.username);
    expect(resultText).toContain(sharedUser.password);
  });

  /**
   * TS-009 — Submit the lookup form with identity information that does not
   * match any customer record.
   *
   * 1. Navigate to the Customer Lookup page (beforeEach).
   * 2. Fill all identity fields with non-matching data.
   * 3. Click "Find My Login Info".
   * 4. Verify the "customer could not be found" error message is shown.
   */
  test('TS-009: Submit the lookup form with identity information that does not match any customer record', async ({ forgotLoginInfoPage }) => {
    // Step 2 — fill and submit the lookup form with invalid / non-existent data
    await forgotLoginInfoPage.findLoginInfo(forgotLoginData.invalidCustomer);

    // Step 3 — read the result
    const resultText = await forgotLoginInfoPage.getResultText();
    console.log('[TS-009]', resultText.replace(/\s+/g, ' ').trim());

    // Step 4 — assert the "customer not found" error is displayed
    await expect(forgotLoginInfoPage.resultPanel).toBeVisible();
    expect(resultText).toMatch(/The customer information provided could not be found|could not be found/i);
  });
});
