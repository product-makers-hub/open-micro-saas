import { test, expect } from "@playwright/test";

import {
  navigateToFeatureFlagsDashboard,
  getFeatureFlagRowByName,
} from "./feature-flag-helpers";
import { featureFlags } from "../../../data/feature-flags";

const [firstFeatureFlag] = featureFlags;

test.describe("Feature flags dashboard (Admin)", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFeatureFlagsDashboard(page);
  });

  test("admin user can see list of feature flags", async ({ page }) => {
    await expect(
      page.getByRole("table", { name: /feature flags list/i }),
    ).toBeVisible();
  });

  test("admin user can see table headers", async ({ page }) => {
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
    await expect(
      tableHeaders.getByRole("cell", { name: /actions/i }),
    ).toBeVisible();
  });

  test("admin user can see feature flags details", async ({ page }) => {
    const featureFlagRow = await getFeatureFlagRowByName(
      page,
      firstFeatureFlag.name,
    );
    await expect(featureFlagRow).toBeVisible();

    await expect(
      featureFlagRow.getByRole("cell", { name: firstFeatureFlag.name }),
    ).toBeVisible();
    await expect(
      featureFlagRow.getByRole("button", { name: /delete/i }),
    ).toBeVisible();
  });

  test("admin user can see a toggle switch to enable/disable a feature flag", async ({
    page,
  }) => {
    const featureFlagRow = await getFeatureFlagRowByName(
      page,
      firstFeatureFlag.name,
    );

    const toggleSwitch = featureFlagRow.getByRole("switch", {
      name: /enabled/i,
    });

    await expect(toggleSwitch).toBeVisible();
  });
});
