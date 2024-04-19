import { test, expect } from "@playwright/test";

import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Profile page", () => {
  test("should display the profile page", async ({ page }) => {
    await page.goto("/profile");
    await expect(
      page.getByRole("heading", { name: /user profile/i }),
    ).toBeVisible();
  });

  test("should display the current user information", async ({ page }) => {
    await page.goto("/profile");

    await expect(
      page.getByRole("heading", { name: normalUser.name }),
    ).toBeVisible();
    await expect(page.getByText(normalUser.email)).toBeVisible();
  });
});
