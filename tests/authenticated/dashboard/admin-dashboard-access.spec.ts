import { test, expect } from "@playwright/test";

import { authConfig } from "@/config";

test.describe("Admin dashboard access", () => {
  test("should redirect to /dashboard when a normal user tries to access to /admin/dashboard", async ({
    page,
  }) => {
    await page.goto(authConfig.adminUserCallbackUrl);

    await expect(page).toHaveURL(authConfig.normalUserCallbackUrl);
  });
});
