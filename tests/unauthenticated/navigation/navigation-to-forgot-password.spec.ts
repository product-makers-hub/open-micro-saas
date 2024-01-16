import { test, expect } from "@playwright/test";

import { authConfig } from "@/config";

test("navigation to forgot password", async ({ page }) => {
  // arrange
  await page.goto(authConfig.loginUrl);

  // act
  await page.getByRole("link", { name: /forgot your password/i }).click();

  // assert
  await expect(page).toHaveURL("/auth/forgot-password");
  await expect(
    page.getByRole("heading", { name: /forgot password/i }),
  ).toBeVisible();
});
