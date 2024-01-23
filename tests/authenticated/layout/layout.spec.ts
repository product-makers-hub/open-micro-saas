import { test, expect } from "@playwright/test";

test.describe("General authenticated layout", () => {
  test("should display the header", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("navigation")).toBeVisible();
  });

  test("should display the site title link", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("navigation").getByRole("link", { name: /open saas/i }),
    ).toBeVisible();
  });

  test("should display the theme toggle element", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("checkbox", { name: /toggle theme/i }),
    ).toBeVisible();
  });

  test("should display the user dropdown element", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("img", { name: /user profile avatar/i }),
    ).toBeVisible();
  });

  test("should display the user dropdown menu", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /user profile avatar/i }).click();

    await expect(
      page.getByRole("link", { name: /admin dashboard/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /profile/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /logout/i })).toBeVisible();
  });
});
