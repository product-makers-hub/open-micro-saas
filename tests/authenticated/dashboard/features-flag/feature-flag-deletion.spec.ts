import { test, expect } from "@playwright/test";

import {
  navigateToFeatureFlagsDashboard,
  getFeatureFlagRowByName,
} from "./feature-flag-helpers";
import { featureFlags } from "../../../data/feature-flags";

const [firstFeatureFlag] = featureFlags;

test.describe("Feature flags deletion", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFeatureFlagsDashboard(page);
  });

  test("admin can see a confirmation message before delete a feature flag", async ({
    page,
  }) => {
    const featureFlagRow = await getFeatureFlagRowByName(
      page,
      firstFeatureFlag.name,
    );

    const deleteButton = featureFlagRow.getByRole("button", {
      name: /delete/i,
    });

    await expect(
      page.getByRole("dialog", { name: /delete feature flag/i }),
    ).not.toBeVisible();

    await deleteButton.click();

    await expect(
      page.getByRole("dialog", { name: /delete feature flag/i }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("dialog", { name: /delete feature flag/i })
        .getByText(`Are you sure you want to delete ${firstFeatureFlag.name}?`),
    ).toBeVisible();
  });

  test("admin can delete a feature flag", async ({ page }) => {
    // arrange

    const featureFlagRow = await getFeatureFlagRowByName(
      page,
      firstFeatureFlag.name,
    );

    const deleteButton = featureFlagRow.getByRole("button", {
      name: /delete/i,
    });

    await deleteButton.click();

    const dialog = page.getByRole("dialog", { name: /delete feature flag/i });

    const deleteFeatureFlagButton = dialog.getByRole("button", {
      name: /delete/i,
    });

    // act
    await deleteFeatureFlagButton.click();

    // assert
    await expect(
      page.getByText("Feature flag deleted successfully"),
    ).toBeVisible();

    await expect(
      page.getByRole("dialog", { name: /delete feature flag/i }),
    ).not.toBeVisible();

    await expect(
      page.getByRole("row", { name: firstFeatureFlag.name }),
    ).not.toBeVisible();
  });
});
