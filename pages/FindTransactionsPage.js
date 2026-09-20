class FindTransactionsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ── Account selector ──────────────────────────────────────────────────────
    // The combobox is the only <select> on the page
    this.accountSelect = page.locator('select').first();

    // The page renders four identically-labelled "Find Transactions" buttons
    // ordered: ID (0), Date (1), Date Range (2), Amount (3).
    const allBtns = page.locator('button', { hasText: 'Find Transactions' });

    // ── Find by Transaction ID ────────────────────────────────────────────────
    // Inputs have no <label> — plain text nodes are used. Match by ARIA role+nth
    // order: Transaction ID (0), Date (1), From date (2), To date (3), Amount (4)
    this.transactionIdInput = page.getByRole('textbox').nth(0);
    this.findByIdBtn        = allBtns.nth(0);

    // ── Find by Date ──────────────────────────────────────────────────────────
    this.transactionDateInput = page.getByRole('textbox').nth(1);
    this.findByDateBtn        = allBtns.nth(1);

    // ── Find by Date Range ────────────────────────────────────────────────────
    this.fromDateInput      = page.getByRole('textbox').nth(2);
    this.toDateInput        = page.getByRole('textbox').nth(3);
    this.findByDateRangeBtn = allBtns.nth(2);

    // ── Find by Amount ────────────────────────────────────────────────────────
    this.amountInput    = page.getByRole('textbox').nth(4);
    this.findByAmountBtn = allBtns.nth(3);

    // ── Results ───────────────────────────────────────────────────────────────
    this.resultsTable  = page.locator('#transactionTable');
    this.resultRows    = page.locator('#transactionTable tbody tr');
    this.noResultsMsg  = page.locator('.error');
  }

  async goto() {
    const baseURL = process.env.BASE_URL || 'https://parabank-17m8.onrender.com/parabank';
    await this.page.goto(`${baseURL}/findtrans.htm`);
    // Wait for the account selector to be populated before interacting
    await this.accountSelect.waitFor({ state: 'visible' });
  }

  /**
   * Select the account to search within by dropdown index.
   * @param {number} [index=0]
   */
  async selectAccount(index = 0) {
    await this.accountSelect.selectOption({ index });
  }

  /**
   * Find transactions by transaction ID.
   * @param {string} transactionId
   */
  async findByTransactionId(transactionId) {
    await this.transactionIdInput.fill(transactionId);
    await this.findByIdBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Find transactions by exact date (MM-DD-YYYY).
   * @param {string} date  e.g. "12-25-2024"
   */
  async findByDate(date) {
    await this.transactionDateInput.fill(date);
    await this.findByDateBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Find transactions by date range (MM-DD-YYYY).
   * @param {string} fromDate
   * @param {string} toDate
   */
  async findByDateRange(fromDate, toDate) {
    await this.fromDateInput.fill(fromDate);
    await this.toDateInput.fill(toDate);
    await this.findByDateRangeBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Find transactions by exact amount.
   * @param {string} amount  e.g. "50.00"
   */
  async findByAmount(amount) {
    await this.amountInput.fill(amount);
    await this.findByAmountBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Returns the text content of every cell in a given column (0-indexed)
   * across all result rows.
   * @param {number} colIndex
   * @returns {Promise<string[]>}
   */
  async getColumnValues(colIndex) {
    const rows = await this.resultRows.all();
    const values = [];
    for (const row of rows) {
      const cell = row.locator('td').nth(colIndex);
      values.push((await cell.textContent()).trim());
    }
    return values;
  }
}

module.exports = { FindTransactionsPage };
