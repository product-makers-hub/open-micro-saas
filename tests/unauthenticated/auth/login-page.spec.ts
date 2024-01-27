import { test, expect } from "@playwright/test";

import { authConfig } from "@/config";
import { inactiveUser } from "../../data/inactive-user";

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

  test.skip("should not let an inactive user login", async ({ page }) => {
    // arrange
    await page.goto(inactiveUser.loginUrl);
    await expect(
      page.getByText(/This user has been deactivated./i),
    ).not.toBeVisible();

    // act
    await page.getByLabel(/email/i).fill(inactiveUser.email);
    await page.getByRole("button", { name: /sign in$/i }).click();

    // assert
    await expect(
      page.getByText(/This user has been deactivated./i),
    ).toBeVisible();
    await expect(page).toHaveURL(inactiveUser.loginUrl);
  });
});
