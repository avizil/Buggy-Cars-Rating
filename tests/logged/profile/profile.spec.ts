import { test, expect, APIResponse, Page } from '@playwright/test';
import { getProfile, updateProfile } from '../../../core/api/requests/profile';
import { getAuthPhrase } from '../../../core/utils/authJsonHelper';
import { Profile } from '../../../core/utils/types/userCredentails.interface';
import { userCreds } from '../../../config/consts';
import { generateRandomLabel } from '../../../core/utils/utils';
import { authenticateApi } from '../../../core/api/requests/authenticate';
import { PageHeader } from '../../../core/pages/header.page';
import { ProfilePage } from '../../../core/pages/profile.page';

// As password changes change the access token, additional planning is needed.
test.describe.configure({ mode: 'parallel' });

test('Update profile and verify new data in the UI', async ({ request, page }) => {
   const token: string = getAuthPhrase();
   const newAge: string = String(Math.floor(Math.random() * 10));
   const newAddress: string = generateRandomLabel(8);
   // Send PUT request
   const requestBody: Profile = {
      firstName: userCreds.firstName,
      lastName: userCreds.lastName,
      age: newAge,
      address: newAddress,
   };
   const response: APIResponse = await updateProfile(request, token, requestBody);
   await expect(response, { message: 'Failed to update profile!' }).toBeOK();
   // Verify changes in the UI
   await page.goto('/');
   const pageHeader: PageHeader = new PageHeader(page);
   pageHeader.clickProfileButton('Profile');
   await page.waitForLoadState('networkidle');
   const profilePage: ProfilePage = new ProfilePage(page);
   await expect(profilePage.inputFields('Age')).toHaveValue(newAge);
   await expect(profilePage.inputFields('Address')).toHaveValue(newAddress);
});

test('Logout', async ({ page }) => {
   await page.goto('/');
   const pageHeader: PageHeader = new PageHeader(page);
   await pageHeader.clickProfileButton('Logout');
   const storageState = await page.context().storageState();
   await expect(storageState.origins, {
      message: 'Storage state was not deleted, therefore user was not logged out!',
   }).toStrictEqual([]);
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// As the password change test causes issues with the request limit, it's skipped
test.describe('Important data edit tests - must revert changes after each', async () => {
   // The password to change to in the tests. Needed to revert the changes
   const newPassword: string = userCreds.password + '!';
   test.describe.configure({ mode: 'serial' });

   // After hook
   test.afterEach('Revert Changes', async ({ request }) => {
      const token: string = getAuthPhrase();
      const requestBody: Profile = {
         firstName: userCreds.firstName,
         lastName: userCreds.lastName,
         currentPassword: newPassword,
         newPassword: userCreds.password,
         newPasswordConfirmation: userCreds.password,
      };
      // The response is not validated, as if the test failed, the password was not changed, therefore the hook will fail as well
      const response: APIResponse = await updateProfile(request, token, requestBody);
   });

   // Verify password change
   test('Verify password change', async ({ request }) => {
      // Prepare request data
      const token: string = getAuthPhrase();
      const requestBody: Profile = {
         firstName: userCreds.firstName,
         lastName: userCreds.lastName,
         currentPassword: userCreds.password,
         newPassword: newPassword,
         newPasswordConfirmation: newPassword,
      };
      // Update profile
      const putResponse: APIResponse = await updateProfile(request, token, requestBody);
      await expect(putResponse, { message: 'PUT request failed to update password!' }).toBeOK();
      // Re-authenticate
      const authResponse: APIResponse = await authenticateApi(request, { username: userCreds.username, password: newPassword });
      await expect(authResponse, { message: 'Failed to authenticate after password change!' }).toBeOK();
   });
});
