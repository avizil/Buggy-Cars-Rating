import { test, expect, APIResponse, APIRequestContext } from '@playwright/test';
import { CreateUserRequest } from '../../types/registeration.interface';
import { baseUrl } from '../../consts';
import { generateRandomLabel } from '../../utils/utils';
import { RegisterPage } from '../../pages/register.page';
import { username, firstName, lastName, password } from '../../consts';
import { createUser } from '../../api/requests/register';
import { postUserEndpoint } from '../../api/endpoints';

const registerUrl: string = baseUrl + 'register'; // https://buggy.justtestit.org/register

// To not clog the server, marked as skip by default
test('Verify Post User request is successful', async ({ request }) => {
   const requestBody: CreateUserRequest = {
      username: 'random' + generateRandomLabel(8),
      firstName: 'random',
      lastName: 'random',
      password: 'random12_' + generateRandomLabel(8),
   };
   const response: APIResponse = await createUser(request, requestBody);
   await expect(response).toBeOK();
});

// Verify that a bad response is received if an already existing user is posted
test('Verify duplicate users are not created', async ({ request }) => {
   const requestBody: CreateUserRequest = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: password,
   };
   const response: APIResponse = await createUser(request, requestBody);
   await expect(response).not.toBeOK();
});

test('Verfiy UI registration sends a correct API request', async ({ page }) => {
   await page.goto(registerUrl);
   const registerPage: RegisterPage = new RegisterPage(page);
   await registerPage.fillCredentails(username, firstName, lastName, password);
   const expectedReqBody: CreateUserRequest = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      confirmPassword: password,
   };
   const requestPromise = page.waitForRequest(postUserEndpoint);
   await registerPage.clickButton('Register');
   //  Verify request method and body are correct
   const request = await requestPromise;
   await expect(request.method(), { message: 'Wrong API method on request sent by Register button!' }).toBe('POST');
   await expect(JSON.parse(request.postData() || '{}'), {
      message: "Registration post request's body does not match the expectation!",
   }).toEqual(expectedReqBody);
});
