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

  test("should show a login error message when the credentials are invalid", async ({
    page,
  }) => {
    // arrange
    await page.goto("/auth/login");

    // act
    await page.getByLabel(/email/i).fill("foo@mail.com");
    await page.getByLabel(/password/i).fill("123456");
    await page.getByRole("button", { name: /sign in$/i }).click();

    // assert
    await expect(
      page.getByText(/Email or password are invalid/i),
    ).toBeVisible();
  });
});
