import { test, expect } from "@playwright/test";

import { authConfig } from "@/config/auth-config";
import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Active user dashboard", () => {
  test("should display the page header title", async ({ page }) => {
    await page.goto(authConfig.normalUserCallbackUrl);
    await expect(
      page.getByRole("heading", { name: /dashboard/i }),
    ).toBeVisible();
  });

  test("should display the user's name", async ({ page }) => {
    await page.goto(authConfig.normalUserCallbackUrl);
    await expect(page.getByText(normalUser.name)).toBeVisible();
  });

  test("should display the subscription status", async ({ page }) => {
    await page.goto(authConfig.normalUserCallbackUrl);
    await expect(
      page.getByRole("heading", { name: /Thank you for subscribing/i }),
    ).toBeVisible();
  });

  test("user dashboard has a sidenav navigation", async ({ page }) => {
    await page.goto(authConfig.normalUserCallbackUrl);

    await expect(
      page.getByRole("complementary", { name: /user sidenav/i }),
    ).toBeVisible();
  });

  test("user dashboard sidebav has the navigation links", async ({ page }) => {
    await page.goto(authConfig.normalUserCallbackUrl);

    await expect(
      page
        .getByRole("complementary", { name: /user sidenav/i })
        .getByRole("link", { name: /dashboard/i }),
    ).toBeVisible();
  });
});
