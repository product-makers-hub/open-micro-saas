import { test, expect } from "@playwright/test";

test.describe("Reset Password", () => {
  test("the reset password page should be accessible", async ({ page }) => {
    await page.goto("/auth/reset-password/token");
    await expect(page).toHaveTitle(/Reset Password/i);
    await expect(
      page.getByRole("heading", { name: /Reset Password/i }),
    ).toBeVisible();
  });

  test("the reset password form should be accessible", async ({ page }) => {
    await page.goto("/auth/reset-password/token");

    await expect(
      page.getByRole("form", { name: /reset password form/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", { name: /password/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /reset password/i }),
    ).toBeVisible();
  });

  test("should have a link to the login page", async ({ page }) => {
    await page.goto("/auth/reset-password/token");

    await expect(
      page.getByRole("link", { name: /return to login/i }),
    ).toBeVisible();
  });
});
