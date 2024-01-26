import { test as setup, expect } from "@playwright/test";
import smtpTester from "smtp-tester";
import type { MailServer } from "smtp-tester";
import { load as cheerioLoad } from "cheerio";

import { adminUser } from "./data/admin-user";
import { normalUser } from "./data/normal-user";
import { truncateDb } from "../prisma/truncate-db";
import {
  createAdminRoleAndUser,
  createNormalRoleAndUsers,
} from "../prisma/seeds/seed";

/**
 * This file is used to setup the global environment for the tests.
 * It's required to run un serial mode because the mail server will try
 * to start multiple times with the same port and it will fail (port already in use).
 * Remember that the tests are run in parallel by default and Playwright will use
 * different workers to run the tests.
 */
setup.describe.configure({ mode: "serial" });

let mailServer: MailServer;

// clean up database before everything.
// This is related to the global teardown not being called if runing tests in UI mode.
// Github issue: https://github.com/microsoft/playwright/issues/22008
// Is closed but still not working.
setup.beforeAll(async () => {
  await truncateDb();
  mailServer = smtpTester.init(4025);
});

setup.afterAll(() => {
  mailServer.stop(() => console.log("Mail server stopped"));
});

setup("let the admin user login with magic email", async ({ page }) => {
  // arrange
  await createAdminRoleAndUser();
  await page.goto(adminUser.loginUrl);
  await expect(page.getByRole("link", { name: /Login/i })).toBeVisible();

  // act
  await page.getByLabel(/Email/i).fill(adminUser.email);
  await page.getByRole("button", { name: /Sign in with Email/i }).click();

  // assert
  await expect(
    page.getByText(/Please check your email for the magic link/i),
  ).toBeVisible();

  // get the email from the mail server
  const { email } = await mailServer.captureOne(adminUser.email, {
    wait: 1000,
  });
  const $ = cheerioLoad(email.html as string);
  const emailLink = $("a").attr("href");
  await page.goto(emailLink as string);

  // assert after login
  await expect(page).toHaveURL(adminUser.appUrl);
  await expect(
    page.getByRole("img", { name: "user profile avatar" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Login/i })).not.toBeVisible();
  await expect(
    page.getByRole("heading", { name: /admin dashboard/i }),
  ).toBeVisible();

  await page.context().storageState({ path: adminUser.storageSessionPath });
});

setup("let a normal user login with magic email", async ({ page }) => {
  // arrange
  await createNormalRoleAndUsers();
  await page.goto(normalUser.loginUrl);
  await expect(page.getByRole("link", { name: /Login/i })).toBeVisible();

  // act
  await page.getByLabel(/Email/i).fill(normalUser.email);
  await page.getByRole("button", { name: /Sign in with Email/i }).click();

  // assert
  await expect(
    page.getByText(/Please check your email for the magic link/i),
  ).toBeVisible();

  // get the email from the mail server
  const { email } = await mailServer.captureOne(normalUser.email, {
    wait: 1000,
  });
  const $ = cheerioLoad(email.html as string);
  const emailLink = $("a").attr("href");
  await page.goto(emailLink as string);

  await expect(page).toHaveURL(normalUser.appUrl);
  await expect(
    page.getByRole("img", { name: "user profile avatar" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Login/i })).not.toBeVisible();
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();

  await page.context().storageState({ path: normalUser.storageSessionPath });
});
