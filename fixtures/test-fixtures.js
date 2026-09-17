const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { RegistrationPage } = require('../pages/RegistrationPage');
const { ForgotLoginInfoPage } = require('../pages/ForgotLoginInfoPage');
const { AccountsOverviewPage } = require('../pages/AccountsOverviewPage');
const { OpenNewAccountPage } = require('../pages/OpenNewAccountPage');
const { TransferFundsPage } = require('../pages/TransferFundsPage');
const { BillPayPage } = require('../pages/BillPayPage');
const { FindTransactionsPage } = require('../pages/FindTransactionsPage');
const { RequestLoanPage } = require('../pages/RequestLoanPage');
const { UpdateContactInfoPage } = require('../pages/UpdateContactInfoPage');
const { NavigationComponent } = require('../pages/NavigationComponent');

/**
 * Custom Playwright test fixtures.
 *
 * Every page object is instantiated here and injected into specs via
 * destructuring — no manual `new` calls needed inside test files.
 *
 * Unauthenticated fixtures  → used by modules 01-04, 12
 * Authenticated fixtures    → used by modules 05-11
 *   (browser context is pre-loaded with storageState by playwright.config.js;
 *    these fixtures receive a page that already has an active session)
 */
const test = base.extend({

  // ── Unauthenticated page objects ──────────────────────────────────────────

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  forgotLoginInfoPage: async ({ page }, use) => {
    await use(new ForgotLoginInfoPage(page));
  },

  // ── Authenticated page objects ────────────────────────────────────────────
  // The page supplied to these fixtures already carries the saved session
  // (cookies / localStorage) injected by the 'authenticated' project in
  // playwright.config.js via storageState. No explicit login step is needed.

  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },

  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },

  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },

  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },

  findTransactionsPage: async ({ page }, use) => {
    await use(new FindTransactionsPage(page));
  },

  requestLoanPage: async ({ page }, use) => {
    await use(new RequestLoanPage(page));
  },

  updateContactInfoPage: async ({ page }, use) => {
    await use(new UpdateContactInfoPage(page));
  },

  navigationComponent: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },

  // ── Convenience passthrough ───────────────────────────────────────────────
  // Raw authenticated page — use when a spec needs the bare Playwright page
  // object rather than a specific page-object wrapper (e.g. direct URL checks).

  authenticatedPage: async ({ page }, use) => {
    // Storage state (cookies / session) is injected automatically by the
    // 'authenticated' project in playwright.config.js via storageState.
    // auth.setup.js (tests/setup/) produces the saved state before this
    // project runs — no manual login is needed inside specs or fixtures.
    await use(page);
  },
});

module.exports = { test, expect };
