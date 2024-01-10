import { test, expect } from "@playwright/test";

test("navigation to login", async ({ page }) => {
  // arrange
  await page.goto("/");

  // act
  await page.getByRole("link", { name: /login/i }).click();

  // assert
  await expect(page).toHaveURL("/auth/login");
  await expect(
    page.getByRole("heading", { name: /Sign in to your account/i }),
  ).toBeVisible();
});
