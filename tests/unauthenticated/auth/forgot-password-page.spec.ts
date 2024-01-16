import { expect, test } from "@playwright/test";

test.describe("Forgot Password Page", () => {
  test("the forgot password page should be accessible", async ({ page }) => {
    await page.goto("/auth/forgot-password");
    await expect(page).toHaveTitle(/Forgot Password/i);
    await expect(page.getByRole("heading")).toHaveText(/Forgot Password/i);
  });

  test("the forgot password page should have a form and an email input", async ({
    page,
  }) => {
    await page.goto("/auth/forgot-password");
    await expect(
      page.getByRole("form", { name: /forgot password form/i }),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Email/i })).toBeVisible();
  });

  test("the forgot password page should have a link to the login page", async ({
    page,
  }) => {
    await page.goto("/auth/forgot-password");
    await expect(
      page.getByRole("link", { name: /Return to Login/i }),
    ).toBeVisible();
  });
});
