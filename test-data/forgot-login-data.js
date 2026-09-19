/**
 * Test data for module 12 — Forgot Login Info.
 *
 * TS-007 / TS-008 use a dynamically-registered user (see spec helper), so
 * only the negative / non-matching fixture is stored here as a static value.
 */

const forgotLoginData = {
  /**
   * Identity details that will NOT match any customer in the database.
   * Used by TS-009 to verify the "customer not found" error path.
   */
  invalidCustomer: {
    firstName: 'NoSuch',
    lastName:  'Person',
    address:   '999 Nowhere Ln',
    city:      'Ghost Town',
    state:     'ZZ',
    zipCode:   '00000',
    ssn:       '999-99-9999',
  },
};

module.exports = { forgotLoginData };
