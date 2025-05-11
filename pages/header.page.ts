import { Page, Locator } from '@playwright/test';

export class PageHeader {
   readonly header: Locator;
   readonly homeButton: Locator;
   readonly usernameInput: Locator;
   readonly passwordInput: Locator;
   readonly loginButton: Locator;
   readonly registerButton: Locator;

   constructor(page: Page) {
      // The header is present throughout whole website - use header locator to ensure elements outside of it won't be fetched
      this.header = page.locator('header');
      this.homeButton = this.header.getByRole('link', { name: 'Buggy Rating' });
      this.usernameInput = this.header.getByRole('textbox', { name: 'Login' });
      this.passwordInput = this.header.locator('input[name="password"]');
      this.loginButton = this.header.getByRole('button', { name: 'Login' });
      this.registerButton = this.header.getByRole('link', { name: 'Register' });
   }

   async login(username: string, password: string) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
   }

   async clickHomeButton() {
      await this.homeButton.click();
   }

   async clickRegisterButton() {
      await this.registerButton.click();
   }
}
