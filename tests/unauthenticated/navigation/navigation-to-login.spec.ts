import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";

test("navigation to login", async ({ page }) => {
  // arrange
  await page.goto("/");

  // act
  await page.getByRole("link", { name: /login/i }).click();

  // assert
  await expect(page).toHaveURL(authConfig.loginUrl);
  await expect(
    page.getByRole("heading", { name: /Sign in to your account/i }),
  ).toBeVisible();
});
