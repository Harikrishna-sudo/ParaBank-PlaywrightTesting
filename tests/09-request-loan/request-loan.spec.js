const { test, expect } = require('../../fixtures/test-fixtures');

test.describe('09 - Request Loan Scenarios', () => {

  // Navigate to Request Loan before every test
  test.beforeEach(async ({ requestLoanPage }) => {
    await requestLoanPage.goto();
  });


  
  // TS-019: Approved Loan

  test(
    'TS-019: Submit a loan request with an amount and down payment that results in approval',
    async ({ requestLoanPage }) => {

      // Enter loan details and submit
      await requestLoanPage.applyForLoan('100','10',0);

      // Verify result page heading
      await expect(requestLoanPage.resultHeading).toHaveText('Loan Request Processed');

      // Verify approved section is displayed
      await expect(requestLoanPage.loanRequestApproved).toBeVisible();

      // Verify approval message
      await expect(requestLoanPage.approvedMessage).toHaveText('Congratulations, your loan has been approved.');

      // Get loan status
      const status = await requestLoanPage.getLoanStatus();

      // Verify status is Approved
      expect(status).toContain('Approved');

      // Verify new account number is displayed
      await expect(requestLoanPage.newAccountNumber).toBeVisible();

      // Verify new account number is not empty
      await expect(requestLoanPage.newAccountNumber).not.toHaveText('');
    }
  );


 
  // TS-020: Denied Loan

  test(
    'TS-020: Submit a loan request with a down payment low enough (relative to available funds) to result in denial',
    async ({ requestLoanPage }) => {

      // Enter large loan amount and small down payment
      await requestLoanPage.applyForLoan('500000','10',0);

      // Verify result page heading
      await expect(requestLoanPage.resultHeading).toHaveText('Loan Request Processed');

      // Verify denied section is displayed
      await expect(requestLoanPage.loanRequestDenied).toBeVisible();

      // Verify denial message
      await expect(requestLoanPage.deniedMessage).toHaveText('We cannot grant a loan in that amount with your available funds.');

      // Get loan status
      const status = await requestLoanPage.getLoanStatus();

      // Verify status is Denied
      expect(status).toContain('Denied');

      // Verify approved section is not displayed
      await expect(requestLoanPage.loanRequestApproved).not.toBeVisible();
    }
  );


  // TS-021: Verify Loan Result Page

  test(
    'TS-021: Verify the loan result page displays correct status message',
    async ({ requestLoanPage }) => {

      // Submit a loan request
      await requestLoanPage.applyForLoan('500000','10',0);

      // Verify result section is displayed
      await expect(requestLoanPage.resultSection).toBeVisible();

      // Verify result page heading
      await expect(requestLoanPage.resultHeading).toHaveText('Loan Request Processed');

      // Get loan status
      const status = await requestLoanPage.getLoanStatus();

      // Verify status is Denied
      expect(status).toContain('Denied');

      // Verify denial message
      await expect(
        requestLoanPage.deniedMessage).toHaveText('We cannot grant a loan in that amount with your available funds.');
    }
  );

 // =========================================================
// TS-022: Invalid Loan Request Validation
// =========================================================

const invalidLoanRequests = [
  {
    loanAmount: null,
    downPayment: '50',
    description: 'empty loan amount with valid down payment'
  },
  {
    loanAmount: '0',
    downPayment: '50',
    description: 'zero loan amount'
  },
  {
    loanAmount: '100',
    downPayment: null,
    description: 'valid loan amount with empty down payment'
  },
  {
    loanAmount: '100',
    downPayment: '0',
    description: 'zero down payment'
  },
  {
    loanAmount: '-100',
    downPayment: '5',
    description: 'negative loan amount'
  },
  {
    loanAmount: '100',
    downPayment: '-50',
    description: 'negative down payment'
  }
];

for (const data of invalidLoanRequests) {

  test(
    `TS-022: Verify invalid loan request - ${data.description}`,
    async ({ requestLoanPage }) => {

      // Fill loan amount if provided
      if (data.loanAmount !== null) {
        await requestLoanPage.loanAmount.fill(
          data.loanAmount
        );
      }

      // Fill down payment if provided
      if (data.downPayment !== null) {
        await requestLoanPage.downPayment.fill(
          data.downPayment
        );
      }

      // Select first available account
      await requestLoanPage.fromAccount.selectOption({
        index: 0
      });

      // Submit loan request
      await requestLoanPage.applyNowButton.click();


      // =====================================================
      // Wait for Error page
      // =====================================================

      try {

        await requestLoanPage.errorHeading.waitFor({
          state: 'visible',
          timeout: 3000
        });

      } catch (error) {

        // Error page did not appear within 3 seconds.
        // Continue and check for normal loan result.
      }


      // =====================================================
      // CONDITION 1: ERROR PAGE
      // =====================================================

      if (await requestLoanPage.errorHeading.isVisible()) {

        // Verify Error heading
        await expect(
          requestLoanPage.errorHeading
        ).toHaveText('Error!');

        // Verify Error message
        await expect(
          requestLoanPage.errorMessage
        ).toHaveText(
          'An internal error has occurred and has been logged.'
        );

        // Stop this test case here
        return;
      }


      // =====================================================
      // CONDITION 2: NORMAL LOAN RESULT
      // =====================================================

      await expect(
        requestLoanPage.resultHeading
      ).toBeVisible();

      await expect(
        requestLoanPage.resultHeading
      ).toHaveText(
        'Loan Request Processed'
      );

      // Wait for actual loan status
      await expect(
        requestLoanPage.loanStatus
      ).toBeVisible();

      const status =
        await requestLoanPage.getLoanStatus();


      // Invalid request must NOT be approved
      expect(
        status.trim()
      ).not.toBe('Approved');
    }
  );
}
});