import { test, expect } from "@playwright/test";

import { inactiveUser } from "../../data/inactive-user";

test.use({
  storageState: inactiveUser.storageSessionPath,
});

test.describe("Innactive user - navigation dropdown", () => {
  test("should display the profile link", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(page.getByRole("link", { name: /profile/i })).toBeVisible();
  });

  test("should display the logout button", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
  });

  test("should not display the billing button", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(
      page.getByRole("button", { name: /billing/i }),
    ).not.toBeVisible();
  });
});
