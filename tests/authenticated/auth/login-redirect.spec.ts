import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";

test.describe("Login page authenticated user", () => {
  test("should redirect to the admin user callback url page when the admin is authenticated and navigates to the login page", async ({
    page,
  }) => {
    await page.goto(authConfig.loginUrl);

    await expect(page).toHaveURL(authConfig.adminUserCallbackUrl);
    await expect(page).not.toHaveURL(authConfig.loginUrl);
  });
});
