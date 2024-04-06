import { test, expect } from "@playwright/test";
import type { Page } from "playwright";

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

const getNewFeatureFlagBtn = async (page: Page) => {
  return page.getByRole("button", { name: /new feature flag/i });
};

const getNewFeatureFlagDialog = async (page: Page) => {
  return page.getByRole("dialog", { name: /create a new feature flag/i });
};

test.describe("Feature flags creation", () => {
  test("admin can see the new feature flag button", async ({ page }) => {
    await page.goto(featureFlagsRoute);
    const createFeatureFlagButton = await getNewFeatureFlagBtn(page);
    await expect(createFeatureFlagButton).toBeVisible();
  });

  test("admin can open the new feature flag dialog", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    await expect(
      page.getByRole("dialog", {
        name: /Create a new feature flag/i,
      }),
    ).not.toBeVisible();

    const createFeatureFlagButton = await getNewFeatureFlagBtn(page);

    await createFeatureFlagButton.click();

    await expect(await getNewFeatureFlagDialog(page)).toBeVisible();
  });

  test("admin can see the new feature flag form", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    const createFeatureFlagButton = await getNewFeatureFlagBtn(page);

    await createFeatureFlagButton.click();

    const dialog = await getNewFeatureFlagDialog(page);

    await expect(dialog.getByLabel(/name/i)).toBeVisible();
    await expect(dialog.getByLabel(/is enabled/i)).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: /Save feature flag/i }),
    ).toBeVisible();
  });

  test("admin can see the feature flag name input validation message", async ({
    page,
  }) => {
    await page.goto(featureFlagsRoute);

    const createFeatureFlagButton = await getNewFeatureFlagBtn(page);
    await createFeatureFlagButton.click();

    const dialog = await getNewFeatureFlagDialog(page);

    await expect(
      dialog.getByText("Invalid feature flag name."),
    ).not.toBeVisible();

    const nameInput = dialog.getByLabel(/name/i);
    const saveButton = dialog.getByRole("button", {
      name: /Save feature flag/i,
    });

    await nameInput.fill("this is an invalid name");

    await saveButton.click();

    await expect(dialog.getByText("Invalid feature flag name.")).toBeVisible();
  });

  test("admin can create a new feature flag", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    await expect(
      page.getByText("Feature flag created successfully"),
    ).not.toBeVisible();

    const createFeatureFlagButton = await getNewFeatureFlagBtn(page);
    await createFeatureFlagButton.click();

    const dialog = await getNewFeatureFlagDialog(page);
    const nameInput = dialog.getByLabel(/name/i);
    const saveButton = dialog.getByRole("button", {
      name: /Save feature flag/i,
    });

    await nameInput.fill("MY_NEW_FEATURE_FLAG");
    await saveButton.click();

    await expect(
      page.getByText("Feature flag created successfully"),
    ).toBeVisible();

    await expect(
      page.getByRole("row", { name: /MY_NEW_FEATURE_FLAG/i }),
    ).toBeVisible();
  });
});

test.describe("Feature flags update", () => {
  test("admin can update a feature flag", async ({ page }) => {
    await page.goto(featureFlagsRoute);

    const featureFlagRow = page.getByRole("row", {
      name: firstFeatureFlag.name,
      exact: true,
    });

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
