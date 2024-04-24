import { test } from "@playwright/test";
import { testAccessibilityFor } from "../utils";

test.describe("Unauthenticated pages", () => {
  test("should not have any automatically detectable accessibility issues on home page", async ({
    page,
  }) => {
    await testAccessibilityFor("/", page);
  });

  test("should not have any automatically detectable accessibility issues on login page", async ({
    page,
  }) => {
    await testAccessibilityFor("/login", page);
  });

  test("should not have any automatically detectable accessibility issues on pricing page", async ({
    page,
  }) => {
    await testAccessibilityFor("/pricing", page);
  });
});
