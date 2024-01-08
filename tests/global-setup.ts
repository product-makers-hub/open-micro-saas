import { test as setup, expect } from "@playwright/test";

import { adminUser } from "./data/admin-user";
import { truncateDb } from "../prisma/truncate-db";
import { createAdminRoleAndUser } from "../prisma/seeds/seed";

setup("let the admin user login with email and password", async ({ page }) => {
  // clean up database before everything.
  // This is related to the global teardown not being called if runing tests in UI mode.
  // Github issue: https://github.com/microsoft/playwright/issues/22008
  // Is closed but still not working.
  await truncateDb();

  // arrange
  await createAdminRoleAndUser();
  await page.goto(adminUser.loginUrl);

  // act
  await page.getByLabel(/Email/i).fill(adminUser.email);
  await page.getByLabel(/Password/i).fill(adminUser.plainPassword);
  await page.getByRole("button", { name: /Sign in with credentials/i }).click();

  // assert
  await expect(page).toHaveURL("/");
  await expect(
    page.getByRole("img", { name: "user profile avatar" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Login/i })).not.toBeVisible();

  await page.context().storageState({ path: adminUser.storageSessionPath });
});
