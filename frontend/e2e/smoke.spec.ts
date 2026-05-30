import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/MonoShare/);
    await expect(page.locator("textarea[name='secret']")).toBeVisible();
  });

  test("sign in page loads", async ({ page }) => {
    await page.goto("/sign-in");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("input[name='email']")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.locator("input[name='password']")).toBeVisible();
  });

  test("create account page loads", async ({ page }) => {
    await page.goto("/create-account");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("input[name='email']")).toBeVisible({
      timeout: 10000,
    });
  });

  test("health check endpoint responds", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe("ok");
  });
});
