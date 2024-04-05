import { test, expect } from "@playwright/test";

const featureFlagsRoute = "/admin/dashboard/feature-flags";

import { featureFlags } from "../../data/feature-flags";

const [firstFeatureFlag] = featureFlags;

test.describe("Feature flags dashboard (Admin)", () => {
  test("admin user can access to the feature flags dashboard", async ({
    page,
  }) => {
    await page.goto(featureFlagsRoute);

    await expect(
      page.getByRole("heading", { name: /feature flags/i }),
    ).toBeVisible();
  });

  test("admin user can see list of feature flags", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    await expect(
      page.getByRole("table", { name: /feature flags list/i }),
    ).toBeVisible();
  });

  test("admin user can see table headers", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    const tableHeaders = page.getByRole("row").first();

    await expect(
      tableHeaders.getByRole("cell", { name: /is enabled/i }),
    ).toBeVisible();
    await expect(
      tableHeaders.getByRole("cell", { name: /name/i }),
    ).toBeVisible();
    await expect(
      tableHeaders.getByRole("cell", { name: /created at/i }),
    ).toBeVisible();
  });

  test("admin user can see users details", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    const featureFlagRow = page.getByRole("row", {
      name: firstFeatureFlag.name,
      exact: true,
    });

    await expect(featureFlagRow).toBeVisible();

    await expect(
      featureFlagRow.getByRole("cell", { name: firstFeatureFlag.name }),
    ).toBeVisible();
  });

  test("admin user can see a toggle switch to enable/disable a feature flag", async ({
    page,
  }) => {
    await page.goto(featureFlagsRoute);

    const featureFlagRow = page.getByRole("row", {
      name: firstFeatureFlag.name,
      exact: true,
    });

    const toggleSwitch = featureFlagRow.getByRole("switch", {
      name: /enabled/i,
    });

    await expect(toggleSwitch).toBeVisible();
  });
});
