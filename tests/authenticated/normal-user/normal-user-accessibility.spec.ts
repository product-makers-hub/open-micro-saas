import { test } from "@playwright/test";

import { testAccessibilityFor } from "../../utils";
import { normalUser } from "../../data/normal-user";

test.use({
  storageState: normalUser.storageSessionPath,
});

test.describe("Normal user accessibility pages", () => {
  test("should not have any automatically detectable accessibility issues on dashboard page", async ({
    page,
  }) => {
    await testAccessibilityFor("/dashboard", page);
  });
});
