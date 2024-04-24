import { test } from "@playwright/test";

import { testAccessibilityFor } from "../../utils";

test.describe("Admin accessibility pages", () => {
  test("should not have any automatically detectable accessibility issues on dashboard page", async ({
    page,
  }) => {
    await testAccessibilityFor("/admin/dashboard", page);
  });

  test("should not have any automatically detectable accessibility issues on user management page", async ({
    page,
  }) => {
    await testAccessibilityFor("/admin/dashboard/user-management", page);
  });
});
