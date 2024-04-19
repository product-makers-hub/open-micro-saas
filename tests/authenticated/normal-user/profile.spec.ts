import { test, expect } from "@playwright/test";

import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Profile page", () => {
  test("should display the profile page", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.getByRole("heading", { name: /profile/i })).toBeVisible();
  });
});
