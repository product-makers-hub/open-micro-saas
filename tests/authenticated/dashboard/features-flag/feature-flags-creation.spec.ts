import { test, expect } from "@playwright/test";

import {
  navigateToFeatureFlagsDashboard,
  getNewFeatureFlagBtn,
  getNewFeatureFlagDialog,
} from "./feature-flag-helpers";

test.describe("Feature flags creation", () => {
  test.beforeEach(async ({ page }) => {
    await navigateToFeatureFlagsDashboard(page);
  });

  test("admin can see the new feature flag button", async ({ page }) => {
    const createFeatureFlagButton = await getNewFeatureFlagBtn(page);
    await expect(createFeatureFlagButton).toBeVisible();
  });

  test("admin can open the new feature flag dialog", async ({ page }) => {
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
