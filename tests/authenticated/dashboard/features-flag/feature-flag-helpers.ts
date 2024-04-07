import type { Page } from "playwright";
import { expect } from "@playwright/test";

export const featureFlagsRoute = "/admin/dashboard/feature-flags";

export const navigateToFeatureFlagsDashboard = async (page: Page) => {
  await page.goto(featureFlagsRoute);
  await expect(
    page.getByRole("heading", { name: /feature flags/i }),
  ).toBeVisible();
};

export const getFeatureFlagRowByName = async (page: Page, flagName: string) => {
  return page.getByRole("row", { name: flagName, exact: true });
};

export const getNewFeatureFlagBtn = async (page: Page) => {
  return page.getByRole("button", { name: /new feature flag/i });
};

export const getNewFeatureFlagDialog = async (page: Page) => {
  return page.getByRole("dialog", { name: /create a new feature flag/i });
};
