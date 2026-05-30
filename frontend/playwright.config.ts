import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",

  // Run tests in parallel
  fullyParallel: false, // set false for MonoShare — tests share state (secrets get erased)

  // Fail the build on CI if test.only is accidentally left in
  forbidOnly: !!process.env.CI,

  // No retries locally, 1 retry on CI
  retries: process.env.CI ? 1 : 0,

  // One worker locally, one on CI — sequential to avoid race conditions
  workers: 1,

  // Reporter — list in terminal, HTML report for CI
  reporter: process.env.CI ? "github" : "list",

  use: {
    // Base URL — local dev server or production
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:8001",

    // Collect trace on first retry
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Don't slow down by default
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  // No webServer config — we test against an already-running server
});
