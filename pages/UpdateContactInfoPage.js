class UpdateContactInfoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Navigation
    this.updateContactInfoLink = page.getByRole('link', {
      name: 'Update Contact Info'
    });

    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview'
    });

    // Profile fields
    this.firstNameField = page.locator('[id="customer.firstName"]');
    this.lastNameField = page.locator('[id="customer.lastName"]');
    this.addressField = page.locator('[id="customer.address.street"]');
    this.cityField = page.locator('[id="customer.address.city"]');
    this.stateField = page.locator('[id="customer.address.state"]');
    this.zipCodeField = page.locator('[id="customer.address.zipCode"]');
    this.phoneField = page.locator('[id="customer.phoneNumber"]');

    // Update Profile button
    this.updateProfileButton = page.locator(
        'input[value="Update Profile"]'
    );

    // Profile Updated message
    this.profileUpdatedMessage = page.getByText(
        'Profile Updated',
        { exact: false }
    );

    // Validation error
    this.validationError = page.locator('.error:visible').first();
  }

  /**
   * Navigate to Update Contact Info.
   */
  async goto() {
    await this.page.goto('/parabank', {
      waitUntil: 'domcontentloaded'
    });

    // Verify authenticated session
    await this.page.getByText('Welcome John Smith', {
      exact: false
    }).waitFor({
      state: 'visible',
      timeout: 15000
    });

    // Open Update Contact Info
    await this.updateContactInfoLink.click();

    // Wait for profile form
    await this.firstNameField.waitFor({
      state: 'visible',
      timeout: 15000
    });

    await this.updateProfileButton.waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  /**
   * Update customer profile.
   *
   * @param {Object} profileData
   */
  async updateProfile(profileData) {

    if (profileData.firstName !== undefined) {
      await this.firstNameField.fill(profileData.firstName);
    }

    if (profileData.lastName !== undefined) {
      await this.lastNameField.fill(profileData.lastName);
    }

    if (profileData.address !== undefined) {
      await this.addressField.fill(profileData.address);
    }

    if (profileData.city !== undefined) {
      await this.cityField.fill(profileData.city);
    }

    if (profileData.state !== undefined) {
      await this.stateField.fill(profileData.state);
    }

    if (profileData.zipCode !== undefined) {
      await this.zipCodeField.fill(profileData.zipCode);
    }

    if (profileData.phone !== undefined) {
      await this.phoneField.fill(profileData.phone);
    }

    // Submit
    await this.updateProfileButton.click();

    // Wait for the response page
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Navigate away to Accounts Overview.
   */
  async goToAccountsOverview() {
    await this.accountsOverviewLink.click();

    await this.page.getByRole('heading', {
      name: 'Accounts Overview'
    }).waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  /**
   * Clear mandatory fields.
   */
  async clearMandatoryFields() {
    await this.firstNameField.fill('');
    await this.lastNameField.fill('');
    await this.addressField.fill('');
    await this.cityField.fill('');
    await this.stateField.fill('');
    await this.zipCodeField.fill('');
  }

  /**
   * Submit the profile form.
   */
  async submit() {
    await this.updateProfileButton.click();

    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { UpdateContactInfoPage };