import { test, expect, APIResponse, APIRequestContext, Response } from '@playwright/test';
import { UserCredentials } from '../../core/utils/types/userCredentails.interface';
import { baseUrl } from '../../config/consts';
import { generateRandomLabel, generateRandomUserCreds } from '../../core/utils/utils';
import { RegisterPage } from '../../core/pages/register.page';
import { userCreds } from '../../config/consts';
import { createUser } from '../../core/api/requests/register';
import { authEndpoint, usersEndpoint } from '../../core/api/endpoints';
import { PageHeader } from '../../core/pages/header.page';
import { authenticateApi } from '../../core/api/requests/authenticate';
import { AuthResponse } from '../../core/utils/types/authApiResponse';

// This module contains all tests that need to be performed while the user is not logged in - registration and authentication

const registerUrl: string = baseUrl + 'register'; // https://buggy.justtestit.org/register

test.describe('Registration Tests', async () => {
   // To not clog the server, mark as skip when testing
   test('Verify Post User request is successful', async ({ request }) => {
      const requestBody: UserCredentials = generateRandomUserCreds();
      const response: APIResponse = await createUser(request, requestBody);
      await expect(response).toBeOK();
   });

   test('Verfiy UI registration sends a correct API request', async ({ page }) => {
      await page.goto(registerUrl);
      // Fill fields
      const registerPage: RegisterPage = new RegisterPage(page);
      await registerPage.fillCredentails(userCreds);
      // Prepare expected request data
      const expectedReqBody = userCreds;
      expectedReqBody.confirmPassword = userCreds.password;
      const requestPromise = page.waitForRequest(usersEndpoint);
      await registerPage.clickButton('Register');
      //  Verify request method and body are correct
      const request = await requestPromise;
      await expect(request.method(), { message: 'Wrong API method on request sent by Register button!' }).toBe('POST');
      await expect(JSON.parse(request.postData() || '{}'), {
         message: "Registration post request's body does not match the expectation!",
      }).toEqual(expectedReqBody);
   });
});

// Login & authentication test
test.describe('Login & Authentication', async () => {
   test('Verify authentication success', async ({ request }) => {
      const response: APIResponse = await authenticateApi(request, {
         username: userCreds.username,
         password: userCreds.password,
      });
      await expect(response, { message: 'Authentication failed with correct credentials!' }).toBeOK();
      const responseBody: AuthResponse = (await response.json()) as AuthResponse;
      await expect(responseBody.access_token).toBeTruthy();
   });

   // Send an authentication request with a valid username and wrong password, verify server rejects the login authorization attempt
   test('Verify authentication is rejected when password is wrong', async ({ request }) => {
      const response: APIResponse = await authenticateApi(request, {
         username: userCreds.username,
         password: userCreds.password + ' - WRONG PASSWORD',
      });
      await expect(response, { message: 'Authentication succeeded with the wrong password!' }).not.toBeOK();
   });

   test('Verify UI Login flow', async ({ page }) => {
      await page.goto('/');
      const pageHeader: PageHeader = new PageHeader(page);
      // Listen for the POST authorization request
      const authListener: Promise<Response> = page.waitForResponse(
         (res) => res.url() === authEndpoint && res.request().method() === 'POST'
      );
      await pageHeader.login(userCreds.username, userCreds.password);
      const response: Response = await authListener;
      await expect(response.status(), { message: 'UI login flow failed!' }).toBe(200);
      await page.pause();
   });
});
