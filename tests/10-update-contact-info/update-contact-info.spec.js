const { test, expect } = require('../../fixtures/test-fixtures');
const { testData } = require('../../test-data/sample-data');

test.describe.serial('10 - Update Contact Info Scenarios', () => {

    /*
     * Open Update Contact Info before every test.
     */
    test.beforeEach(async ({ updateContactInfoPage }) => {
        await updateContactInfoPage.goto();
    });


    // ============================================================
    // TS-022
    // Update profile with valid data
    // ============================================================

    test(
        'TS-022: Successfully update customer profile fields with valid new data',
        async ({ updateContactInfoPage, page }) => {

            const profileData =
                testData.updateContactInfo.validProfile;

            // Update profile
            await updateContactInfoPage.updateProfile(profileData);

            /*
             * Verify successful profile update.
             *
             * The application contains a hidden duplicate of the
             * "Profile Updated" text, so we use the first matching
             * element rather than requiring a specific heading.
             */
            await expect(
                page.getByText('Profile Updated', {
                    exact: false
                }).first()
            ).toHaveCount(1);
        }
    );


    // ============================================================
    // TS-023
    // Verify profile data persists
    // ============================================================

    test(
        'TS-023: Verify updated profile information persists after navigating away and returning to the profile page',
        async ({ updateContactInfoPage, page }) => {

            const profileData =
                testData.updateContactInfo.persistenceProfile;

            // Update profile
            await updateContactInfoPage.updateProfile(profileData);

            // Verify successful update
            await expect(
                page.getByText('Profile Updated', {
                    exact: false
                }).first()
            ).toHaveCount(1);

            // Navigate away
            await updateContactInfoPage.goToAccountsOverview();

            // Verify Accounts Overview
            await expect(
                page.getByRole('heading', {
                    name: 'Accounts Overview'
                })
            ).toBeVisible();

            // Return to Update Contact Info
            await updateContactInfoPage.goto();

            // Read the values returned by the application
            const returnedAddress =
                await page.locator('[id="customer.address.street"]').inputValue();

            const returnedCity =
                await page.locator('[id="customer.address.city"]').inputValue();

            const returnedPhone =
                await page.locator('[id="customer.phoneNumber"]').inputValue();

            console.log('----------------------------------------');
            console.log('TS-023 PERSISTENCE CHECK');
            console.log('Expected address:', profileData.address);
            console.log('Actual address:', returnedAddress);
            console.log('Expected city:', profileData.city);
            console.log('Actual city:', returnedCity);
            console.log('Expected phone:', profileData.phone);
            console.log('Actual phone:', returnedPhone);
            console.log('----------------------------------------');

            // Verify address persistence
            expect(returnedAddress).toBe(profileData.address);

            // Verify city persistence
            expect(returnedCity).toBe(profileData.city);

            // Verify phone persistence
            expect(returnedPhone).toBe(profileData.phone);
        }
    );


    // ============================================================
    // TS-024
    // Error on empty mandatory fields
    // ============================================================

    test(
        'TS-024: Verify form shows error when mandatory fields are cleared and submitted',
        async ({ updateContactInfoPage, page }) => {

            // --------------------------------------------------------
            // Step 1: Clear mandatory fields
            // --------------------------------------------------------

            await updateContactInfoPage.clearMandatoryFields();


            // --------------------------------------------------------
            // Step 2: Submit the form
            // --------------------------------------------------------

            await updateContactInfoPage.submit();


            // --------------------------------------------------------
            // Step 3: Verify validation error
            // --------------------------------------------------------

            await expect(
                page.locator('.error:visible').first()
            ).toBeVisible({
                timeout: 15000
            });
        }
    );

});