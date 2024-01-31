import { test, expect } from "@playwright/test";

import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Normal user - navigation dropdown", () => {
  test("should display the user dropdown element", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("img", { name: /user profile avatar/i }),
    ).toBeVisible();
  });

  test("should display the user dropdown menu", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(page.getByRole("link", { name: /profile/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
  });

  test("should display the billing button", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /billing/i }),
    ).not.toBeVisible();

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(page.getByRole("button", { name: /billing/i })).toBeVisible();
  });

  test("should not display the admin dashboard link", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(
      page.getByRole("link", { name: /admin dashboard/i }),
    ).not.toBeVisible();
  });
});
