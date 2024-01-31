import { test, expect } from "@playwright/test";

test.describe("Logout user", () => {
  test("should let the user logout when clicking the logout button", async ({
    page,
  }) => {
    // arrange
    await page.goto("/");
    await expect(page.getByRole("link", { name: /login/i })).not.toBeVisible();

    // act
    await page.getByRole("button", { name: /user profile avatar/i }).click();
    await page.getByRole("button", { name: /logout/i }).click();

    // assert
    await expect(page.getByRole("link", { name: /login/i })).toBeVisible();
  });
});
