/**
 * Centralized test data templates and sample fixtures.
 *
 * Rule:
 * Never store real secrets/passwords here.
 * Use .env instead.
 */

const testData = {

  login: {
    validUser: {
      username: process.env.USERNAME || 'john',
      password: process.env.PASSWORD || 'demo',
    },

    invalidUser: {
      username: 'nonexistent_user',
      password: 'wrongpassword',
    },

    emptyUser: {
      username: '',
      password: '',
    },
  },

  registration: {
    sampleUser: {
      firstName: 'Jane',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Beverly Hills',
      state: 'CA',
      zipCode: '90210',
      phone: '555-0199',
      ssn: '000-00-0000',
      username: 'janedoe',
      password: 'password123',
    },
  },

  billPay: {
    samplePayee: {
      name: 'Electric Company',
      address: '456 Power Ave',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      phone: '555-0188',
      accountNumber: '12345',
      verifyAccount: '12345',
      amount: '50.00',
    },
  },

  loan: {
    validLoan: {
      amount: '1000',
      downPayment: '100',
    },

    deniedLoan: {
      amount: '500000',
      downPayment: '10',
    },
  },

  // Module 10 - Update Contact Info
  updateContactInfo: {
    validProfile: {
      address: '123 New Street',
      city: 'Bangalore',
      phone: '9876543210',
    },

    persistenceProfile: {
      address: 'PLAYWRIGHT_PERSISTENCE_456',
      city: 'PLAYWRIGHT_CITY_CHENNAI',
      phone: '9123456780',
    },
  },
};

module.exports = { testData };