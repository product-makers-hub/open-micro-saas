import { test, expect } from "@playwright/test";

import {
  navigateToFeatureFlagsDashboard,
  getFeatureFlagRowByName,
} from "./feature-flag-helpers";
import { featureFlags } from "../../../data/feature-flags";

const [firstFeatureFlag] = featureFlags;

test.describe("Feature flags update", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFeatureFlagsDashboard(page);
  });

  test("admin can update a feature flag", async ({ page }) => {
    const featureFlagRow = await getFeatureFlagRowByName(
      page,
      firstFeatureFlag.name,
    );

    const toggleSwitch = featureFlagRow.getByRole("switch", {
      name: /enabled/i,
    });

    await expect(toggleSwitch).toBeChecked();

    await toggleSwitch.click();

    await expect(toggleSwitch).not.toBeChecked();

    await expect(
      page.getByText(/Feature flag updated successfully/i),
    ).toBeVisible();
  });
});
