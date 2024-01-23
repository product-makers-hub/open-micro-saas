import { test, expect } from "@playwright/test";

import { siteMetadata } from "@/config";

test.describe("Layout logged out user", () => {
  test("should display the navbar", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("navigation", { name: "main navbar" }),
    ).toBeVisible();
  });

  test("should display the site title link", async ({ page }) => {
    await page.goto("/");

    await expect(
      page
        .getByRole("navigation", { name: "main navbar" })
        .getByRole("link", { name: siteMetadata.title }),
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
