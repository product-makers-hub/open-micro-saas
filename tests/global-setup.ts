import { test as setup, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import smtpTester from "smtp-tester";
import type { MailServer } from "smtp-tester";
import { load as cheerioLoad } from "cheerio";

import { adminUser } from "./data/admin-user";
import { normalUser } from "./data/normal-user";
import { inactiveUser } from "./data/inactive-user";
import { truncateDb } from "../prisma/truncate-db";
import {
  createRoles,
  createInactiveUser,
  createAdminUser,
  createActiveUser,
} from "../prisma/seeds/seed";

/**
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
  await createRoles();
  mailServer = smtpTester.init(4025);
});

setup.afterAll(() => {
  mailServer.stop(() => console.log("Mail server stopped"));
});

interface LoginUser {
  user: {
    email: string;
    loginUrl: string;
    appUrl: string;
    storageSessionPath: string;
  };
  page: Page;
}

const loginUser = async ({ user, page }: LoginUser) => {
  // arrange
  await page.goto(user.loginUrl);
  await expect(page.getByRole("link", { name: /Login/i })).toBeVisible();

  // act
  await page.getByLabel(/Email/i).fill(user.email);
  await page.getByRole("button", { name: /Sign in with Email/i }).click();

  // assert
  await expect(
    page.getByText(/Please check your email for the magic link/i),
  ).toBeVisible();

  // get the email from the mail server
  const { email } = await mailServer.captureOne(user.email, {
    wait: 1000,
  });
  const $ = cheerioLoad(email.html as string);
  const emailLink = $("a").attr("href");
  await page.goto(emailLink as string);

  // assert after login
  await expect(page).toHaveURL(user.appUrl);
  await expect(
    page.getByRole("img", { name: "user profile avatar" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Login/i })).not.toBeVisible();

  await page.context().storageState({ path: user.storageSessionPath });
  console.log(`${user.email} logged in`);
};

setup("let the admin user login with magic email", async ({ page }) => {
  await createAdminUser();
  await loginUser({ user: adminUser, page });
});

setup("let an active user login with magic email", async ({ page }) => {
  await createActiveUser();
  await loginUser({ user: normalUser, page });
});

setup("let an innactive user login with magic email", async ({ page }) => {
  await createInactiveUser();
  await loginUser({ user: inactiveUser, page });
});
