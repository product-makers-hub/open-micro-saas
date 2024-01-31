import { test, expect } from "@playwright/test";

import { authConfig } from "@/config";

test.describe("Login page", () => {
  test("should display the login form", async ({ page }) => {
    await page.goto(authConfig.loginUrl);

    await expect(
      page.getByRole("heading", { name: /Sign in to your account/i }),
    ).toBeVisible();
  });

  test("should display the email field", async ({ page }) => {
    await page.goto(authConfig.loginUrl);

    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test("should display the sign in button", async ({ page }) => {
    await page.goto(authConfig.loginUrl);

    await expect(
      page.getByRole("button", { name: /Sign in with Email/i }),
    ).toBeVisible();
  });
});
