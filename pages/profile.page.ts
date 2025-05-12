import { Locator, Page } from '@playwright/test';
import { UserCredentials } from '../utils/types/userCredentails.interface';

export class ProfilePage {
   page: Page;
   readonly pageContent: Locator;
   readonly inputFields: Function;
   readonly picklistFields: Function;
   readonly buttons: Function;

   constructor(page: Page) {
      this.pageContent = page.locator('xpath=//div[@role="main"]');
      this.inputFields = (fieldLabel: string): Locator => this.pageContent.getByRole('textbox', { name: fieldLabel });
      this.picklistFields = (fieldLabel: string): Locator => this.pageContent.getByLabel(fieldLabel);
      this.buttons = (buttonLabel: string): Locator => this.pageContent.getByRole('button', { name: buttonLabel });
   }

   async fillInputField(fieldLabel: string, value: string) {
      const field: Locator = this.inputFields(fieldLabel);
      await field.fill(value);
   }

   async fillPicklist(fieldLabel: string, value: string) {
      const field: Locator = this.picklistFields(fieldLabel);
      await field.selectOption(value);
   }

   async clickButton(buttonLabel: string) {
      const button = this.buttons(buttonLabel);
      await button.click();
   }
}
