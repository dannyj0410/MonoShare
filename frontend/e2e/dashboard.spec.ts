import { test, expect } from "@playwright/test";
import { registerUser, clickCreateButton } from "./helpers";

test.describe("My Secrets Dashboard", () => {
  test("authenticated user can access my secrets page", async ({ page }) => {
    await registerUser(page);
    await page.goto("/my-secrets");
    await expect(page).toHaveURL("/my-secrets");
    await expect(page.getByRole("heading", { name: "My Secrets" })).toBeVisible(
      { timeout: 10000 },
    );
  });

  test("created secret appears in dashboard", async ({ page }) => {
    await registerUser(page);

    const userSession = page.locator("aside[aria-label='User session']");
    await userSession.waitFor({ state: "visible" });

    await page.goto("/", { waitUntil: "networkidle" });

    await userSession.waitFor({ state: "visible" });
    // Wait for the form to be ready before interacting
    await page.locator("textarea[name='secret']").waitFor({ state: "visible" });
    await page.locator("textarea[name='secret']").fill("dashboard test secret");
    await clickCreateButton(page);
    await page.waitForURL(/\/details\/.+/, { timeout: 15000 });

    await page.goto("/my-secrets");
    await page.waitForLoadState("networkidle");
    await expect(page.getByLabel("Active secret count")).not.toContainText(
      "0",
      { timeout: 10000 },
    );
  });

  test("can delete a secret from dashboard", async ({ page }) => {
    await registerUser(page);

    await page.goto("/", { waitUntil: "networkidle" });

    const userSession = page.locator("aside[aria-label='User session']");
    await userSession.waitFor({ state: "visible" });

    await page.locator("textarea[name='secret']").waitFor({ state: "visible" });
    await page.locator("textarea[name='secret']").fill("secret to delete");
    await clickCreateButton(page);
    await expect(page).toHaveURL(/\/details\/.+/, { timeout: 15000 });

    await page.goto("/my-secrets");
    await page.waitForLoadState("networkidle");

    await page.locator("svg[id*='Eraser']").first().click();
    await expect(page.getByText("Erase Confirmation")).toBeVisible({
      timeout: 5000,
    });
    await page.getByRole("button", { name: "Erase" }).click();

    await expect(page.getByLabel("Active secret count")).toContainText("0", {
      timeout: 10000,
    });
  });
});
