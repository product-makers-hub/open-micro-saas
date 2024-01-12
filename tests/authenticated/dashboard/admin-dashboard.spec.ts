import { test, expect } from "@playwright/test";

test.describe("Admin dashboard", () => {
  test("admin user can access admin dashboard", async ({ page }) => {
    await page.goto("/admin/dashboard");

    await expect(
      page.getByRole("heading", { name: /admin dashboard/i }),
    ).toBeVisible();
  });

  test("admin dashboard has a drawer navigation", async ({ page }) => {
    await page.goto("/admin/dashboard");

    await expect(
      page.getByRole("navigation", { name: /drawer/i }),
    ).toBeVisible();
  });

  test("admin user can navigate to user management page", async ({ page }) => {
    await page.goto("/admin/dashboard");

    await page
      .getByRole("navigation", { name: /drawer/i })
      .getByRole("link", { name: /user management/i })
      .click();

    await expect(
      page.getByRole("heading", { name: /user management/i }),
    ).toBeVisible();
  });
});
