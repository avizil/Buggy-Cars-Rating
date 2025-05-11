// import { test, expect, Page, Locator } from '@playwright/test';
// import { baseUrl } from '../../consts';
// import { PageHeader } from '../../pages/header.page';
// import { RegisterPage } from '../../pages/register.page';
// import { username, firstName, lastName, password } from '../../consts';

// const registerUrl: string = baseUrl + 'register'; // https://buggy.justtestit.org/register

// // test('Open Register Page', async ({ page }) => {
// //    await page.goto(baseUrl);
// //    const pageHeader: PageHeader = new PageHeader(page);
// //    await pageHeader.clickRegisterButton();
// //    await expect(page.url()).toBe(registerUrl);
// //    //    await page.pause();
// // });

// test.describe('Register page tests', async () => {
//    test.beforeEach(async ({ page }) => {
//       await page.goto(registerUrl);
//    });

//    // test('Cancel Register', async ({ page }) => {
//    //    const registerPage: RegisterPage = new RegisterPage(page);
//    //    await registerPage.clickButton('Cancel');
//    //    await expect(page.url()).toBe(baseUrl);
//    // });

//    // // Verify that the register button is enabled only when all fields are populated
//    // test('Register Button Clickability', async ({ page }) => {
//    //    //    Can also check each field's effect on the button clickability
//    //    const buttonLabels: string[] = ['Login', 'First Name', 'Last Name', 'Password', 'Confirm Password'];
//    //    const registerPage: RegisterPage = new RegisterPage(page);
//    //    const registerButton: Locator = registerPage.buttons('Register');
//    //    for (let i = 0; i < buttonLabels.length; ++i) {
//    //       await expect(await registerButton.isDisabled()).toBeTruthy();
//    //       await registerPage.fillInputField(buttonLabels[i], 'Random Value');
//    //       if (i + 1 < buttonLabels.length) await expect(await registerButton.isDisabled()).toBeTruthy();
//    //    }
//    //    await expect(await registerButton.isDisabled()).toBeFalsy();
//    // });

//    // test.skip('Register through UI', async ({ page }) => {
//    //    const registerPage: RegisterPage = new RegisterPage(page);
//    //    await registerPage.fillCredentails(username, firstName, lastName, password);
//    //    await page.pause();
//    //    const requestPromise = page.waitForRequest(request => request.url() === )
//    //    await registerPage.clickButton('Register');
//    //    await page.pause();
//    //    await expect(registerPage.sucessMessage).toBeVisible();
//    // });
// });
