import { APIResponse, expect, request, Response, test as setup } from '@playwright/test';
import { authenticateApi } from '../api/requests/authenticate';
import { userCreds, baseUrl } from '../consts';
import { AuthResponse } from '../utils/types/authApiResponse';
import { STORAGE_STATE_PATH } from '../consts';

setup('Save login state', async ({ request, page }) => {
   const response: APIResponse = await authenticateApi(request, { username: userCreds.username, password: userCreds.password });
   await expect(response, { message: 'Authenticaiton failed in setup stage!' }).toBeOK();
   const responseBody = (await response.json()) as AuthResponse;
   const accessToken: string = responseBody.access_token;
   // Save access token
   await page.goto(baseUrl);
   await page.evaluate((accessToken) => {
      localStorage.setItem('token', accessToken);
   }, accessToken);
   // Save the storage state
   await page.context().storageState({ path: STORAGE_STATE_PATH });
});
