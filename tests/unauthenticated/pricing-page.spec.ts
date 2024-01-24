import { test, expect } from "@playwright/test";

import { pricePageContent } from "@/config";

test.describe("Pricing page", () => {
  test("should display pricing page", async ({ page }) => {
    await page.goto("/pricing");

    await expect(
      page.getByRole("heading", { name: pricePageContent.title }),
    ).toBeVisible();
    await expect(page.getByText(pricePageContent.description)).toBeVisible();
  });

  test("should show the page metadata", async ({ page }) => {
    await page.goto("/pricing");

    await expect(page).toHaveTitle(pricePageContent.title);
  });
});
