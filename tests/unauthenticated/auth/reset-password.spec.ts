import { test, expect } from "@playwright/test";

import { encodeUserData } from "@/libs/encode-user-data";
import { normalUser } from "../../data/normal-user";
import { getUserByEmail } from "@/repositories/user-repository";

test.describe("Reset Password", () => {
  test("the reset password page should be accessible", async ({ page }) => {
    await page.goto("/auth/reset-password/token");
    await expect(page).toHaveTitle(/Reset Password/i);
    await expect(
      page.getByRole("heading", { name: /Reset Password/i }),
    ).toBeVisible();
  });

  test("the reset password form should be accessible", async ({ page }) => {
    await page.goto("/auth/reset-password/token");

    await expect(
      page.getByRole("form", { name: /reset password form/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("textbox", { name: /password/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /reset password/i }),
    ).toBeVisible();
  });

  test("should have a link to the login page", async ({ page }) => {
    await page.goto("/auth/reset-password/token");

    await expect(
      page.getByRole("link", { name: /return to login/i }),
    ).toBeVisible();
  });

  test("should show an error when the token is invalid", async ({ page }) => {
    // arrange
    const expectedMessage =
      "The reset password link has expired. Please request a new one";
    await page.goto("/auth/reset-password/invalid-token");
    await expect(page.getByText(expectedMessage)).not.toBeVisible();

    // act
    await page.getByRole("textbox", { name: /password/i }).fill("new-password");
    await page.getByRole("button", { name: /reset password/i }).click();

    // assert
    await expect(page.getByText(expectedMessage)).toBeVisible();
  });

  test("should show a success message when the password is updated", async ({
    page,
  }) => {
    // arrange
    const expectedMessage = "Password updated";
    const normalUserData = await getUserByEmail(normalUser.email);
    const token = encodeUserData({ uid: normalUserData?.publicId as string });
    await page.goto(`/auth/reset-password/${token}`);
    await expect(page.getByText(expectedMessage)).not.toBeVisible();

    // act
    await page
      .getByRole("textbox", { name: /password/i })
      .fill(normalUser.plainPassword);
    await page.getByRole("button", { name: /reset password/i }).click();

    // assert
    await expect(page.getByText(expectedMessage)).toBeVisible();
  });
});
