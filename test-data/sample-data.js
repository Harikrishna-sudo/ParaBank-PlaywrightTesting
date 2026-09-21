/**
 * Centralized test data templates and sample fixtures.
 * Assignees can add module-specific datasets here or create dedicated data files.
 *
 * Rule: Never store real secrets/passwords here. Use .env instead.
 */

const testData = {
  // Login Module
  login: {
    validUser: {
      username: process.env.PARABANK_USERNAME || 'john',
      password: process.env.PARABANK_PASSWORD || 'demo',
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

  // Registration Module
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

  // Bill Payment Module
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
      fromIndex: 0,
    },
  },

  // Request Loan Module
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
   // Transfer Funds Module
  transferFunds: {
    validTransfer: {
      amount: '100',
      fromIndex: 0,
      toIndex: 1,
    },
    overBalanceTransfer: {
      amount: '9999999',
      fromIndex: 0,
      toIndex: 0,
    },
    zeroTransfer: {
      amount: '0',
      fromIndex: 0,
      toIndex: 1,
    },
    negativeTransfer: {
      amount: '-50',
      fromIndex: 0,
      toIndex: 1,
    },
  },

};

module.exports = { testData };
