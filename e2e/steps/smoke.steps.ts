import { createBdd } from "playwright-bdd";
import { test } from "../fixtures";
import { expect } from "@playwright/test";

const { Given, Then } = createBdd(test);

Given("the app is open", async () => {
  // The app is automatically opened by the fixture
});

Then("I should see the {string} heading", async ({ page }, title: string) => {
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
});
