import { test, expect } from "@playwright/test";

import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Active user dashboard", () => {
  test("should display the page header title", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: /dashboard/i }),
    ).toBeVisible();
  });

  test("should display the user's name", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.getByText(normalUser.name)).toBeVisible();
  });

  test("should display the subscription status", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: /Thank you for subscribing/i }),
    ).toBeVisible();
  });
});
