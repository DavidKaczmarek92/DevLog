import { execSync } from "node:child_process";

console.log("Building Tauri app in debug mode for E2E tests...");
try {
  execSync("npx tauri build --debug --no-bundle", {
    stdio: "inherit",
  });
} catch (error) {
  console.error("Failed to build Tauri app:", error);
  process.exit(1);
}
