import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";
import {
  OAUTH_SIGNIN_ERROR,
  EMAIL_SIGNIN_ERROR,
  OAUTH_ACCOUNT_NOT_LINKED_ERROR,
} from "@/libs/auth/auth-errors-utils";

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

  test("should display the OAuth error message when the provider is not configured", async ({
    page,
  }) => {
    await page.goto(`${authConfig.loginUrl}?error=${OAUTH_SIGNIN_ERROR}`);

    await expect(
      page.getByText(
        /There was an error signing in with the selected provider. Please try again./i,
      ),
    ).toBeVisible();
  });

  test("should display the OAuth error message when the user has the account linked with another provider", async ({
    page,
  }) => {
    await page.goto(
      `${authConfig.loginUrl}?error=${OAUTH_ACCOUNT_NOT_LINKED_ERROR}`,
    );

    await expect(
      page.getByText(
        /The account you are trying to sign in with is not linked to any user. Please sign in with a different provider./i,
      ),
    ).toBeVisible();
  });

  test("should display an error when the magic link could not be sent", async ({
    page,
  }) => {
    await page.goto(`${authConfig.loginUrl}?error=${EMAIL_SIGNIN_ERROR}`);

    await expect(
      page.getByText(/The e-mail could not be sent. Please try again./i),
    ).toBeVisible();
  });
});
