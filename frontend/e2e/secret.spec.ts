import { test, expect } from "@playwright/test";
import { clickCreateButton, getShareUrl } from "./helpers";

test.describe("Secret Creation and Viewing", () => {
  test("can create a secret as guest", async ({ page }) => {
    await page.goto("/");
    await page.locator("textarea[name='secret']").fill("my test secret value");
    await clickCreateButton(page);
    await page.waitForURL(/\/details\/.+/, { timeout: 15000 });
    await expect(
      page.getByText("Your secret has been created successfully!"),
    ).toBeVisible();
  });

  test("secret details page shows share link", async ({ page, baseURL }) => {
    await page.goto("/");
    await page
      .locator("textarea[name='secret']")
      .fill("share link test secret");
    await clickCreateButton(page);
    await expect(page).toHaveURL(/\/details\//, { timeout: 15000 });

    const shareUrl = await getShareUrl(page, baseURL!);
    expect(shareUrl).toContain("/secret/");
    expect(shareUrl).toContain("#");
  });

  test("can view a secret via share link", async ({ page, baseURL }) => {
    const secretText = `playwright_test_${Date.now()}`;

    await page.goto("/");
    await page.locator("textarea[name='secret']").fill(secretText);
    await clickCreateButton(page);
    await expect(page).toHaveURL(/\/details\//, { timeout: 15000 });

    const shareUrl = await getShareUrl(page, baseURL!);

    await page.goto(shareUrl);
    await expect(page.getByText("View Confirmation")).toBeVisible({
      timeout: 10000,
    });
    await page.getByRole("button", { name: "View" }).click();
    await expect(page.locator("textarea[name='secret-content']")).toContainText(
      secretText,
      { timeout: 10000 },
    );
  });

  test("secret is erased after viewing", async ({ page, context, baseURL }) => {
    const secretText = `erase_test_${Date.now()}`;

    await page.goto("/");
    await page.locator("textarea[name='secret']").fill(secretText);
    await clickCreateButton(page);
    await expect(page).toHaveURL(/\/details\//, { timeout: 15000 });

    const shareUrl = await getShareUrl(page, baseURL!);

    // View in new page
    const viewPage = await context.newPage();
    await viewPage.goto(shareUrl);
    await expect(viewPage.getByText("View Confirmation")).toBeVisible({
      timeout: 10000,
    });
    await viewPage.getByRole("button", { name: "View" }).click();
    await expect(
      viewPage.locator("textarea[name='secret-content']"),
    ).toContainText(secretText, { timeout: 10000 });
    await viewPage.close();

    // Try to view again
    const secondPage = await context.newPage();
    await secondPage.goto(shareUrl);
    await expect(
      secondPage.getByText(/already been viewed|no longer available/i),
    ).toBeVisible({ timeout: 10000 });
    await secondPage.close();
  });

  test("cannot create secret with empty text", async ({ page }) => {
    await page.goto("/");
    await clickCreateButton(page);
    await expect(page).toHaveURL("/", { timeout: 5000 });
  });

  test("character counter updates as user types", async ({ page }) => {
    await page.goto("/");
    await page.locator("textarea[name='secret']").fill("hello");
    await expect(page.getByText(/5 \/ /)).toBeVisible();
  });
});
