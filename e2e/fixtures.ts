import { test as base } from "playwright-bdd";
import { chromium, type Page } from "@playwright/test";
import * as path from "node:path";

export const test = base.extend<{ page: Page }>({
  // eslint-disable-next-line no-empty-pattern
  page: async ({}, use) => {
    /* eslint-disable react-hooks/rules-of-hooks */
    const isCI = !!process.env.CI;

    // Determine the path to the Tauri binary
    let binaryPath = "";
    if (process.platform === "darwin") {
      binaryPath = path.join(process.cwd(), "src-tauri/target/debug/devlog");
    } else {
      binaryPath = isCI
        ? path.join(process.cwd(), "src-tauri/target/release/devlog")
        : path.join(process.cwd(), "src-tauri/target/debug/devlog");
    }

    const browser = await chromium.launch({
      executablePath: binaryPath,
      env: {
        ...process.env,
        TAURI_WEBVIEW_AUTOMATION: "true",
      },
    });

    const page = await browser.newPage();
    await use(page);
    await browser.close();
    /* eslint-enable react-hooks/rules-of-hooks */
  },
});
