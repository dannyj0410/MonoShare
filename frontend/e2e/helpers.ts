import { type Page, expect } from "@playwright/test";

export const generateTestEmail = () =>
  `test_${Date.now()}_${Math.random().toString(36).slice(2, 7)}@playwright.test`;

export const generateTestPassword = () => "TestPassword123!";

export const clickCreateButton = async (page: Page) => {
  // 1. Ensure the button is ready
  const createBtn = page.locator("button.create-btn");
  await createBtn.waitFor({ state: "visible" });

  // 2. Click the button (no Promise.all needed here for modern Playwright routing)
  await createBtn.click();
};

export const registerUser = async (page: Page) => {
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

  return { email, password };
};

export const signIn = async (page: Page, email: string, password: string) => {
  await page.goto("/sign-in");
  await page.waitForLoadState("networkidle");
  await page.locator("input[name='email']").waitFor({ state: "visible" });
  await page.locator("input[name='email']").fill(email);
  await page.locator("input[name='password']").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).not.toHaveURL("/sign-in", { timeout: 10000 });
};

export const logOut = async (page: Page) => {
  const aside = page.locator("aside[aria-label='User session']");
  await aside.waitFor({ state: "visible" });
  await aside.hover();

  // Target the button directly within the aside rather than by role/name
  const logoutBtn = aside.locator("button").first();
  await logoutBtn.waitFor({ state: "attached" });
  await logoutBtn.click({ force: true });
  await page.waitForTimeout(800);
};

// Extracts the share URL from the details page and rewrites
// the host to match the current baseURL so tests work locally
export const getShareUrl = async (
  page: Page,
  baseURL: string,
): Promise<string> => {
  // The share URL is in a <p> with class "arvo" inside the copy area
  // It's inside the flex container that also has the copy button
  const shareContainer = page.locator("div.mb-5 p.arvo");
  await shareContainer.waitFor({ state: "visible", timeout: 10000 });
  const fullText = (await shareContainer.textContent()) ?? "";
  const trimmed = fullText.trim();

  // Replace whatever host the server put in with our test baseURL
  const url = new URL(trimmed.includes("://") ? trimmed : `http://${trimmed}`);
  const base = new URL(baseURL);
  url.hostname = base.hostname;
  url.port = base.port;
  url.protocol = base.protocol;

  return url.toString();
};
