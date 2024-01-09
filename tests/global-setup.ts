import { test as setup, expect } from "@playwright/test";

import { adminUser } from "./data/admin-user";
import { normalUser } from "./data/normal-user";
import { truncateDb } from "../prisma/truncate-db";
import {
  createAdminRoleAndUser,
  createNormalRoleAndUser,
} from "../prisma/seeds/seed";

// clean up database before everything.
// This is related to the global teardown not being called if runing tests in UI mode.
// Github issue: https://github.com/microsoft/playwright/issues/22008
// Is closed but still not working.
setup.beforeAll(async () => {
  await truncateDb();
});

setup("let the admin user login with email and password", async ({ page }) => {
  // arrange
  await createAdminRoleAndUser();
  await page.goto(adminUser.loginUrl);

  // act
  await page.getByLabel(/Email/i).fill(adminUser.email);
  await page.getByLabel(/Password/i).fill(adminUser.plainPassword);
  await page.getByRole("button", { name: /Sign in with credentials/i }).click();

  // assert
  await expect(page).toHaveURL(adminUser.appUrl);
  await expect(
    page.getByRole("img", { name: "user profile avatar" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Login/i })).not.toBeVisible();

  await page.context().storageState({ path: adminUser.storageSessionPath });
});

setup("let a normal user login with email and password", async ({ page }) => {
  // arrange
  await createNormalRoleAndUser();
  await page.goto(normalUser.loginUrl);

  // act
  await page.getByLabel(/Email/i).fill(normalUser.email);
  await page.getByLabel(/Password/i).fill(normalUser.plainPassword);
  await page.getByRole("button", { name: /Sign in with credentials/i }).click();

  // assert
  await expect(page).toHaveURL(normalUser.appUrl);
  await expect(
    page.getByRole("img", { name: "user profile avatar" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Login/i })).not.toBeVisible();

  await page.context().storageState({ path: normalUser.storageSessionPath });
});
