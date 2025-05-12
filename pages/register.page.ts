import { Locator, Page } from '@playwright/test';
import { UserCredentials } from '../utils/types/userCredentails.interface';

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

   async fillCredentails(credentials: UserCredentials) {
      await this.fillInputField('Login', credentials.username);
      await this.fillInputField('First Name', credentials.firstName);
      await this.fillInputField('Last Name', credentials.lastName);
      await this.fillInputField('Password', credentials.password);
      await this.fillInputField('Confirm Password', credentials.password);
   }

   async clickButton(buttonLabel: string) {
      const button = this.buttons(buttonLabel);
      await button.click();
   }
}
