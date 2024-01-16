import { test, expect } from "@playwright/test";

import { authConfig } from "@/config";

test.describe("Forgot password page authenticated user", () => {
  test("should redirect to the admin user callback url page when the admin is authenticated and navigates to the forgot password page", async ({
    page,
  }) => {
    await page.goto("/auth/forgot-password");

    await expect(page).toHaveURL(authConfig.adminUserCallbackUrl);
    await expect(page).not.toHaveURL("/auth/forgot-password");
  });
});
