import { test, expect, APIResponse } from '@playwright/test';
import { getProfile, updateProfile } from '../../../api/requests/profile';
import { getAuthPhrase } from '../../../utils/authJsonHelper';
import { Profile } from '../../../utils/types/userCredentails.interface';
import { baseUrl, userCreds } from '../../../consts';
import { generateRandomLabel } from '../../../utils/utils';
import { authenticateApi } from '../../../api/requests/authenticate';
import { PageHeader } from '../../../pages/header.page';
import { ProfilePage } from '../../../pages/profile.page';

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
   await page.goto(baseUrl);
   const pageHeader: PageHeader = new PageHeader(page);
   pageHeader.clickProfileButton('Profile');
   const profilePage: ProfilePage = new ProfilePage(page);
   await expect(profilePage.inputFields('Age')).toHaveValue(newAge);
   await expect(profilePage.inputFields('Address')).toHaveValue(newAddress);
});

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// As the password change test causes issues with the request limit, it's skipped
test.describe.skip('Important data edit tests - must revert changes after each', async () => {
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
