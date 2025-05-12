import { test, Page, expect } from '@playwright/test';
import { HomePage } from '../../../core/pages/homepage.page';

const menuOptions: { label: string; endpoint: string }[] = [
   { label: 'Popular Make', endpoint: 'make/' },
   { label: 'Popular Model', endpoint: 'model/' },
   { label: 'Overall Rating', endpoint: 'overall' },
];

test.describe('Verify Home Page Menu navigation', async () => {
   for (const option of menuOptions) {
      test(`Navigate to ${option.label}`, async ({ page }, testInfo) => {
         const baseUrl: string = testInfo.project.use.baseURL!;
         await page.goto('/');
         const homepage: HomePage = new HomePage(page);
         await homepage.clickMenuOption(option.label);
         await expect(page.url()).toContain(baseUrl + option.endpoint);
      });
   }
});
