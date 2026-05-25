import { test as base } from "playwright-bdd";
import { type Page } from "@playwright/test";

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, runTest) => {
    // Navigate to the app (using baseURL from playwright.config.ts)
    await page.goto("/");
    await runTest(page);
  },
});
