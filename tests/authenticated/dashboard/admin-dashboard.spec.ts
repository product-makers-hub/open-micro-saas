import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";

test.describe("Admin dashboard", () => {
  test("admin user can access admin dashboard", async ({ page }) => {
    await page.goto(authConfig.adminUserCallbackUrl);

    await expect(
      page.getByRole("heading", { name: /admin dashboard/i }),
    ).toBeVisible();
  });

  test("admin dashboard has a admin sidenav navigation", async ({ page }) => {
    await page.goto(authConfig.adminUserCallbackUrl);

    await expect(
      page.getByRole("complementary", { name: /Admin sidenav/i }),
    ).toBeVisible();
  });

  test("admin user can navigate to user management page", async ({ page }) => {
    await page.goto(authConfig.adminUserCallbackUrl);

    await page
      .getByRole("complementary", { name: /Admin sidenav/i })
      .getByRole("link", { name: /user management/i })
      .click();

    await expect(
      page.getByRole("heading", { name: /user management/i }),
    ).toBeVisible();
  });

  test("admin user can navigate to features flags page", async ({ page }) => {
    await page.goto(authConfig.adminUserCallbackUrl);

    await page
      .getByRole("complementary", { name: /Admin sidenav/i })
      .getByRole("link", { name: /feature flags/i })
      .click();

    await expect(
      page.getByRole("heading", { name: /feature flags/i }),
    ).toBeVisible();
  });
});
