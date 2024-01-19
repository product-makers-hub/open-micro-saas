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
    await expect(
      tableHeaders.getByRole("cell", { name: /access/i }),
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
      userRow.getByRole("cell", { name: USER_ROLE_NAME, exact: true }),
    ).toBeVisible();
  });

  test("admin user can see the access toggle element", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");

    const userRow = page.getByRole("row", {
      name: normalUser.email,
      exact: true,
    });

    await expect(
      userRow
        .getByRole("cell", { name: /disactive user access/i })
        .getByRole("checkbox"),
    ).toBeVisible();
  });

  test("admin user can toggle user access", async ({ page }) => {
    await page.goto("/admin/dashboard/user-management");
    await expect(page.getByText("User access was updated")).not.toBeVisible();

    const userRow = page.getByRole("row", {
      name: normalUser.email,
      exact: true,
    });

    await userRow
      .getByRole("cell", { name: /disactive user access/i })
      .getByRole("checkbox")
      .click();

    await expect(page.getByText("User access was updated")).toBeVisible();
  });
});
