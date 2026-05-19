# Guidelines

- Do not use `git commit` automatically. Only commit when explicitly requested
  by the user.
- Do not update RFCs documentation in the `rfcs/` directory.

## Project Execution

This project uses Deno tasks for development and build processes. Use the following commands:

- `deno task dev`: Start the Tauri development environment (Frontend + Rust backend).
- `deno task build`: Build the production application.
- `deno task fmt`: Format source code.
- `deno task lint`: Lint source code.
- `deno task vite`: Run Vite directly if needed.

Avoid checking `deno.json` for these tasks as they are the standard entry points.
