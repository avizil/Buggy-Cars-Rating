import { Locator, Page } from '@playwright/test';

export class RegisterPage {
   page: Page;
   readonly pageContent: Locator;
   readonly inputFields: Function;
   readonly buttons: Function;

   constructor(page: Page) {
      this.pageContent = page.locator('xpath=//div[@role="main"]');
      this.inputFields = (fieldLabel: string): Locator =>
         this.pageContent.getByRole('textbox', { name: fieldLabel, exact: true });
      this.buttons = (buttonLabel: string): Locator => this.pageContent.getByRole('button', { name: buttonLabel });
   }

   async fillInputField(fieldLabel: string, value: string) {
      const field: Locator = this.inputFields(fieldLabel);
      await field.fill(value);
   }

   async fillCredentails(username: string, firstName: string, lastName: string, password: string) {
      await this.fillInputField('Login', username);
      await this.fillInputField('First Name', firstName);
      await this.fillInputField('Last Name', lastName);
      await this.fillInputField('Password', password);
      await this.fillInputField('Confirm Password', password);
   }

   async clickButton(buttonLabel: string) {
      const button = this.buttons(buttonLabel);
      await button.click();
   }
}
