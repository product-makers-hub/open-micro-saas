import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";

import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Admin dashboard access", () => {
  test("should redirect to /dashboard when a normal user tries to access to /admin/dashboard", async ({
    page,
  }) => {
    await page.goto(authConfig.adminUserCallbackUrl);

    await expect(page).toHaveURL(authConfig.normalUserCallbackUrl);
  });
});
