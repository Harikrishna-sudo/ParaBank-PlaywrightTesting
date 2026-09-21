const { test: base, expect } = require('@playwright/test');

const { LoginPage } =
    require('../pages/LoginPage');

const { RegistrationPage } =
    require('../pages/RegistrationPage');

const { ForgotLoginInfoPage } =
    require('../pages/ForgotLoginInfoPage');

const { AccountsOverviewPage } =
    require('../pages/AccountsOverviewPage');

const { OpenNewAccountPage } =
    require('../pages/OpenNewAccountPage');

const { TransferFundsPage } =
    require('../pages/TransferFundsPage');

const { BillPayPage } =
    require('../pages/BillPayPage');

const { FindTransactionsPage } =
    require('../pages/FindTransactionsPage');

const { RequestLoanPage } =
    require('../pages/RequestLoanPage');

const { UpdateContactInfoPage } =
    require('../pages/UpdateContactInfoPage');

const { NavigationComponent } =
    require('../pages/NavigationComponent');


const test = base.extend({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  forgotLoginInfoPage: async ({ page }, use) => {
    await use(new ForgotLoginInfoPage(page));
  },

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

  authenticatedPage: async ({ page }, use) => {
    await use(page);
  },
});


module.exports = {
  test,
  expect
};