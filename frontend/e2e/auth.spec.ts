import { test, expect } from "@playwright/test";
import {
  registerUser,
  signIn,
  logOut,
  generateTestEmail,
  generateTestPassword,
} from "./helpers";

test.describe("Authentication", () => {
  test("can register a new account", async ({ page }) => {
    const email = generateTestEmail();
    const password = generateTestPassword();

    await page.goto("/create-account");
    await page.waitForLoadState("networkidle");
    await page.locator("input[name='email']").waitFor({ state: "visible" });
    await page.locator("input[name='email']").fill(email);
    await page.locator("input[name='password']").fill(password);
    await page.locator("input[name='confirm']").fill(password);
    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page).not.toHaveURL("/create-account", { timeout: 10000 });

    // Username should appear in the UserAndLogout component
    const username = email.split("@")[0];
    await expect(page.getByText(username)).toBeVisible({ timeout: 10000 });
  });

  test("can sign in with valid credentials", async ({ page }) => {
    const { email, password } = await registerUser(page);
    await logOut(page);
    await signIn(page, email, password);

    const username = email.split("@")[0];
    await expect(page.getByText(username)).toBeVisible({ timeout: 10000 });
  });

  test("shows error with wrong password", async ({ page }) => {
    await page.goto("/sign-in");
    await page.waitForLoadState("networkidle");
    await page.locator("input[name='email']").waitFor({ state: "visible" });
    await page.locator("input[name='email']").fill("nonexistent@test.com");
    await page.locator("input[name='password']").fill("wrongpassword123");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText(/incorrect email or password/i)).toBeVisible({
      timeout: 10000,
    });
  });

  test("shows validation error for invalid email format", async ({ page }) => {
    await page.goto("/sign-in");
    await page.waitForLoadState("networkidle");
    const emailInput = page.locator("input[name='email']");
    await emailInput.waitFor({ state: "visible" });
    await emailInput.fill("notanemail");
    await emailInput.blur();

    await expect(page.getByText(/incorrect email/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("authenticated user is redirected away from sign in page", async ({
    page,
  }) => {
    await registerUser(page);
    await page.goto("/sign-in");
    // AuthGuard should redirect away from sign-in
    await expect(page).not.toHaveURL("/sign-in", { timeout: 10000 });
  });

  test("unauthenticated user is redirected away from my secrets", async ({
    page,
  }) => {
    await page.goto("/my-secrets");
    await expect(page).toHaveURL("/sign-in", { timeout: 10000 });
  });

  test("can log out", async ({ page }) => {
    await registerUser(page);
    await logOut(page);

    // After logout, username should not be visible
    await expect(page.locator("aside[aria-label='User session']")).toBeHidden({
      timeout: 5000,
    });
  });
});
