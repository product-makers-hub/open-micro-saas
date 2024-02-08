import { test, expect } from "@playwright/test";

import { paymentsConfig } from "@/config/payments-config";

test.describe("Pricing page", () => {
  test("should display pricing page", async ({ page }) => {
    await page.goto("/pricing");

    await expect(
      page.getByRole("heading", { name: paymentsConfig.title }),
    ).toBeVisible();
    await expect(page.getByText(paymentsConfig.description)).toBeVisible();
  });

  test("should show the page metadata", async ({ page }) => {
    await page.goto("/pricing");

    await expect(page).toHaveTitle(paymentsConfig.title);
  });
});
