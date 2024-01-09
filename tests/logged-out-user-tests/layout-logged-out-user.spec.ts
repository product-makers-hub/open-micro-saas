import { test, expect } from "@playwright/test";

test.describe("Layout logged out user", () => {
  test("should display the navbar", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("should display the site title link", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("navigation").getByRole("link", { name: /open saas/i }),
    ).toBeVisible();
  });

  test("should display the navigation links for unauthenticated user", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("navigation").getByRole("link", { name: /login/i }),
    ).toBeVisible();
  });
});
