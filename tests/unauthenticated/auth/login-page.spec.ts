import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test("should display the login form", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(
      page.getByRole("heading", { name: /Sign in to your account/i }),
    ).toBeVisible();
  });

  test("should display the email field", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("should display the password field", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("should display the sign in button", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page.getByRole("button", { name: /sign in$/i })).toBeVisible();
  });

  test("should display the link to the forgot password page", async ({
    page,
  }) => {
    await page.goto("/auth/login");

    await expect(
      page.getByRole("link", { name: /forgot your password/i }),
    ).toBeVisible();
  });
});
