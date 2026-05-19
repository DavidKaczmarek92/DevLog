# RFC-001 — Project Setup: Tauri + Deno + React + TypeScript

**Created:** 2025-05-10  

---

## Summary

Initial project setup for DevLog — Tauri v2 as the desktop framework, Deno as the JS runtime for tooling, React + TypeScript for the frontend.

Decisions around state management, styling, and routing are deferred to future RFCs.

---

## Decisions

### Tauri v2

**Why Tauri over Electron:**
- Binary size: Tauri apps are ~5–10 MB vs Electron's ~150 MB
- Memory footprint: uses the OS native webview (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux) instead of bundling Chromium
- Security model: fine-grained permissions per capability, nothing is allowed by default
- Rust backend gives us access to native OS APIs (notifications, system tray, file system) without Node.js

**Tauri v2 specifically:**
- Stable as of October 2024
- Improved plugin system (`tauri-plugin-store`, `tauri-plugin-sql`, `tauri-plugin-notification`)
- Starting on v2 avoids a future migration from v1

---

### Deno as JS runtime

**Why Deno over Node.js:**
- Built-in TypeScript support — no `ts-node`, no extra transpilation step for scripts
- Built-in formatter (`deno fmt`) and linter (`deno lint`) — fewer dev dependencies
- Secure by default — scripts need explicit permissions (`--allow-read`, `--allow-net`)
- Native ES modules — no CommonJS confusion
- `deno task` replaces npm scripts cleanly

**Compatibility:**
- Tauri CLI (`@tauri-apps/cli`) runs fine under Deno via `npm:` specifiers
- Vite works with Deno via `npm:vite`
- All React packages are compatible

> Note: Deno is used as the runtime for tooling and scripts. The frontend bundle is built with Vite (run via Deno) and executes in the webview as standard browser JS. Replacing Vite with `deno bundle` was considered but rejected — Vite has better HMR, PostCSS support, and plugin ecosystem for a React + Tailwind project.

---

### React + TypeScript

**Why React:**
- Largest ecosystem for UI components
- Vite + React is the official Tauri frontend recommendation

**Why TypeScript:**
- Catches integration bugs between frontend and Tauri commands early
- Tauri v2 generates TypeScript types for all defined commands automatically



---

## Deferred Decisions

To be decided in future RFCs once features start being built:

- **State management** — Zustand, Jotai, React Context, or just `useState`. To be evaluated based on actual complexity.
- **Styling** — Tailwind CSS + shadcn/ui is the likely direction but not locked in yet.
- **Routing** — simple state-based routing vs `tanstack-router`. To be evaluated at the dashboard/history screen stage.
- **`tauri-plugin-sql` vs raw Rust commands** — to be evaluated when implementing the data layer in RFC-002.

---

## Project Structure

```
devlog/
├── src-tauri/                  # Rust / Tauri backend
│   ├── src/
│   │   ├── main.rs             # Entry point
│   │   ├── lib.rs              # App setup, plugin registration
│   │   └── commands/           # Tauri commands (one file per domain)
│   │       ├── reviews.rs
│   │       └── settings.rs
│   ├── capabilities/
│   │   └── default.json        # Permission declarations
│   ├── Cargo.toml
│   └── tauri.conf.json         # Tauri config
│
├── src/                        # React frontend
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Root component
│   ├── routes/                 # One file per screen
│   │   ├── Dashboard.tsx
│   │   ├── Review.tsx
│   │   ├── History.tsx
│   │   ├── ReviewDetail.tsx
│   │   └── Settings.tsx
│   ├── components/             # Shared UI components
│   ├── lib/                    # Utilities and API clients
│   └── types/                  # Shared TypeScript types
│
├── scripts/                    # Deno utility scripts
│
├── deno.json                   # Deno config + tasks
├── vite.config.ts
├── tsconfig.json
├── index.html
└── README.md
```

---

## Key Config Files

### `deno.json`

```json
{
  "tasks": {
    "dev": "deno run -A npm:@tauri-apps/cli tauri dev",
    "build": "deno run -A npm:@tauri-apps/cli tauri build",
    "fmt": "deno fmt",
    "lint": "deno lint"
  },
  "imports": {
    "react": "npm:react@^18",
    "react-dom": "npm:react-dom@^18"
  },
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "react-jsx"
  }
}
```

---

### `vite.config.ts`

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
});
```

---

### `src-tauri/tauri.conf.json` (key sections)

```json
{
  "productName": "DevLog",
  "version": "0.1.0",
  "identifier": "dev.devlog.app",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:1420",
    "beforeDevCommand": "deno run -A npm:vite",
    "beforeBuildCommand": "deno run -A npm:vite build"
  },
  "app": {
    "windows": [
      {
        "title": "DevLog",
        "width": 1100,
        "height": 700,
        "minWidth": 800,
        "minHeight": 550
      }
    ]
  }
}
```

---

### `src-tauri/Cargo.toml` (key dependencies)

```toml
[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-store = "2"
tauri-plugin-sql = { version = "2", features = ["sqlite"] }
tauri-plugin-notification = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```

---

## Bootstrapping Steps

### Prerequisites

> **Security Note:** It is recommended to verify installation scripts before running them or to follow the official installation instructions from [rustup.rs](https://rustup.rs/) and [deno.com](https://docs.deno.com/runtime/manual/getting_started/installation). Alternatively, use official package managers (e.g., `brew`, `apt`, `pacman`) where available to reduce supply-chain risks.

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Deno
curl -fsSL https://deno.land/install.sh | sh

# Linux only — system dependencies
sudo apt-get install libwebkit2gtk-4.1-dev libgtk-3-dev \
  libayatana-appindicator3-dev librsvg2-dev
```

### Init project

```bash
# Create Tauri app with Deno + React + TypeScript
deno run -A npm:create-tauri-app@latest devlog \
  --template react-ts \
  --manager deno

cd devlog

# Add Tauri plugins
deno run -A npm:@tauri-apps/cli add store sql notification
```

### First run

```bash
deno task dev
```

---

## Alternatives Considered

| Option | Rejected because |
|--------|-----------------|
| Electron | Too heavy (~150 MB), slower startup, higher memory usage |
| Node.js instead of Deno | More config files, manual TypeScript setup |
| Next.js / Remix | SSR not needed for desktop, conflicts with Tauri's dev server |
| `deno bundle` instead of Vite | Weaker HMR, no PostCSS, fewer plugins for React projects |

---

## Open Questions

- Window size defaults — 1100x700 feels right but should window size/position be persisted between sessions?

---

## References

- [Tauri v2 docs](https://v2.tauri.app/)
- [Tauri + Deno guide](https://v2.tauri.app/start/frontend/deno/)
- [tauri-plugin-store](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/store)
- [tauri-plugin-sql](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/sql)
