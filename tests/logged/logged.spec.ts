import test from '@playwright/test';

test.only('Test', async ({ page }) => {
   await page.goto('/');
   await page.pause();
});
