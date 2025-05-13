import { test, Page, expect, Response } from '@playwright/test';
import { HomePage } from '../../../core/pages/homepage.page';
import { makesEndpoint, modelEndpoint, specificModelEndpoint } from '../../../core/api/endpoints';

const menuOptions: { label: string; endpoint: string; apiEndpoint?: string }[] = [
   { label: 'Popular Make', endpoint: 'make/', apiEndpoint: makesEndpoint },
   { label: 'Popular Model', endpoint: 'model/', apiEndpoint: specificModelEndpoint },
   { label: 'Overall Rating', endpoint: 'overall', apiEndpoint: modelEndpoint },
];

test.describe('Verify Home Page Menu navigation', async () => {
   for (const option of menuOptions) {
      test(`Navigate to ${option.label}`, async ({ page }, testInfo) => {
         const baseUrl: string = testInfo.project.use.baseURL!;
         await page.goto('/');
         const requestListener: Promise<Response> = page.waitForResponse(
            (res) => res.url().startsWith(option.apiEndpoint!) && res.request().method() === 'GET',
            { timeout: 15000 }
         );
         //   Open the menu option
         const homepage: HomePage = new HomePage(page);
         await homepage.clickMenuOption(option.label);
         //   Verify navigated URL & API response
         await expect(page.url()).toContain(baseUrl + option.endpoint);
         const res: Response = await requestListener;
         await expect(res.status()).toBe(200);
         //   Wait for page to finish loading
         await page.waitForLoadState('networkidle');
      });
   }
});
