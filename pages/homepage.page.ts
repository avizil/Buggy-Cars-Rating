import { Locator, Page } from '@playwright/test';
import { link } from 'fs';

export class HomePage {
   page: Page;
   readonly pageContent: Locator;
   readonly menuOptions: Function;

   constructor(page: Page) {
      this.pageContent = page.locator('xpath=//div[@role="main"]');
      this.menuOptions = (label: string): Locator => this.pageContent.locator('div.col-md-4').filter({ hasText: label });
   }

   async clickMenuOption(label: string) {
      const optionLink: Locator = this.menuOptions(label);
      await optionLink.click();
   }
}
