import { defineConfig, devices } from "@playwright/test";

import { adminUser } from "./tests/data/admin-user";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// load .env.test only if running in local environment,
// so prisma can use .env.test to connect to the test database
if (!process.env.CI) {
  require("dotenv").config({
    path: "./.env.test",
  });
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "login users - setup",
      testMatch: /global\-setup.ts/,
      teardown: "cleanup db",
    },

    {
      name: "cleanup db",
      testMatch: "**/*/global-teardown.ts",
    },

    {
      name: "chromium - unauthenticated",
      testMatch: "**/unauthenticated/**",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox - unauthenticated",
      testMatch: "**/unauthenticated/**",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "chromium - authenticated admin user",
      dependencies: ["login users - setup"],
      testIgnore: [
        "**/unauthenticated/**",
        "**/authenticated/dashboard/admin-dashboard-access.spec.ts",
      ],
      use: {
        ...devices["Desktop Chrome"],
        storageState: adminUser.storageSessionPath,
      },
    },

    {
      name: "log out user - chromium",
      testMatch: "**/logout-user.spec.ts",
      dependencies: ["login users - setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: adminUser.storageSessionPath,
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    // use production build for tests on CI
    // otherwise, use the dev build (local environment)
    command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
