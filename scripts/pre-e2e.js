import { execSync } from "node:child_process";

const isCI = process.env.CI && process.env.CI !== "false";

if (!isCI) {
  console.log("Building Tauri app in debug mode for E2E tests...");
  try {
    execSync("npx tauri build --debug --no-bundle", {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Failed to build Tauri app:", error);
    process.exit(1);
  }
} else {
  console.log(
    `CI detected (CI=${process.env.CI}), skipping debug build (assuming binary already exists).`,
  );
}
