import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";

test.describe("Protected routes", () => {
  test("should redirect to login page when trying to access to /dashboard route", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(new RegExp(authConfig.loginUrl));
    await expect(page).not.toHaveURL("/dashboard");
  });

  test("should redirect to login page when trying to access to /admin/dashboard route", async ({
    page,
  }) => {
    await page.goto("/admin/dashboard");

    await expect(page).toHaveURL(new RegExp(authConfig.loginUrl));
    await expect(page).not.toHaveURL("/admin/dashboard");
  });

  test("should redirect to login page when trying to access to /admin/dashboard/user-management route", async ({
    page,
  }) => {
    await page.goto("/admin/dashboard/user-management");

    await expect(page).toHaveURL(new RegExp(authConfig.loginUrl));
    await expect(page).not.toHaveURL("/admin/dashboard");
  });
});
