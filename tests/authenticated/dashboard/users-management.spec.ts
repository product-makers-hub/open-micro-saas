import { test, expect } from "@playwright/test";
import { UserRole } from "@prisma/client";

import { normalUser } from "../../data/normal-user";
import { inactiveUser } from "../../data/inactive-user";

test.describe("User management", () => {
  test("admin user can see list of users", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    await expect(
      page.getByRole("table", { name: /users list/i }),
    ).toBeVisible();
  });

  test("admin user can see table headers", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    const tableHeaders = page.getByRole("row").first();

    await expect(
      tableHeaders.getByRole("cell", { name: /email/i }),
    ).toBeVisible();
    await expect(
      tableHeaders.getByRole("cell", { name: /name/i }),
    ).toBeVisible();
    await expect(
      tableHeaders.getByRole("cell", { name: /status/i }),
    ).toBeVisible();
    await expect(
      tableHeaders.getByRole("cell", { name: /created at/i }),
    ).toBeVisible();
    await expect(
      tableHeaders.getByRole("cell", { name: /role/i }),
    ).toBeVisible();
  });

  test("admin user can see users details", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    const userRow = page.getByRole("row", {
      name: normalUser.email,
      exact: true,
    });

    await expect(userRow).toBeVisible();

    await expect(
      userRow.getByRole("cell", { name: normalUser.email }),
    ).toBeVisible();
    await expect(
      userRow.getByRole("cell", { name: normalUser.name }),
    ).toBeVisible();
    await expect(
      userRow.getByRole("cell", { name: "Active", exact: true }),
    ).toBeVisible();
    await expect(
      userRow.getByRole("cell", { name: UserRole.USER, exact: true }),
    ).toBeVisible();
  });

  test("admin user can update user role", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");
    await expect(page.getByText("User role was updated")).not.toBeVisible();

    // using inactive user in order to avoid conflicts with other tests
    const userRow = page.getByRole("row", {
      name: inactiveUser.email,
      exact: true,
    });
    await expect(userRow).toBeVisible();

    const userRoleSelect = userRow
      .getByRole("cell", {
        name: UserRole.USER,
        exact: true,
      })
      .getByRole("combobox");

    await expect(userRoleSelect).toBeVisible();

    await userRoleSelect.click();

    await page.getByRole("option", { name: UserRole.ADMIN }).click();

    await expect(page.getByText("User role was updated")).toBeVisible();
  });
});
