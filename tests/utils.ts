import { expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export const testAccessibilityFor = async (url: string, page: Page) => {
  await page.goto(url);
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
};
