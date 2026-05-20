import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "node:process";

const host = typeof Deno !== "undefined" ? Deno.env.get("TAURI_DEV_HOST") : process.env.TAURI_DEV_HOST;

// @ts-ignore: Deno/Vite type mismatch due to multiple versions
export default defineConfig(async () => {
  const plugins = [react()];

  if (typeof Deno !== "undefined") {
    const deno = (await import("@deno/vite-plugin")).default;
    plugins.push(deno());
  }

  return {
    plugins,

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent Vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
          protocol: "ws",
          host,
          port: 1421,
        }
        : undefined,
      watch: {
        // 3. tell Vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
    },
  };
});
