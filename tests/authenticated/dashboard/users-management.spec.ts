import { test, expect } from "@playwright/test";

import { normalUser } from "../../data/normal-user";
import { USER_ROLE_NAME } from "@/consts/roles-consts";

test.describe("User management", () => {
  test("admin user can navigate to user management page", async ({ page }) => {
    await page.goto("/admin/dashboard");

    await page
      .getByRole("navigation", { name: /drawer/i })
      .getByRole("link", { name: /user management/i })
      .click();

    await expect(page).toHaveURL("/admin/dashboard/user-management");

    await expect(
      page.getByRole("heading", { name: /user management/i }),
    ).toBeVisible();
  });

  test("admin user can see list of users", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    await expect(
      page.getByRole("table", { name: /users list/i }),
    ).toBeVisible();
  });

  test("admin user can see table headers", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    await expect(page.getByRole("cell", { name: /email/i })).toBeVisible();
    await expect(page.getByRole("cell", { name: /name/i })).toBeVisible();
    await expect(page.getByRole("cell", { name: /created at/i })).toBeVisible();
    await expect(page.getByRole("cell", { name: /role/i })).toBeVisible();
  });

  test("admin user can see users details", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    const userRow = page.getByRole("row", { name: normalUser.email });

    await expect(userRow).toBeVisible();

    await expect(
      userRow.getByRole("cell", { name: normalUser.email }),
    ).toBeVisible();
    await expect(
      userRow.getByRole("cell", { name: normalUser.name }),
    ).toBeVisible();
    await expect(userRow.getByRole("cell", { name: "Active" })).toBeVisible();
    await expect(
      userRow.getByRole("cell", { name: USER_ROLE_NAME, exact: true }),
    ).toBeVisible();
  });
});
