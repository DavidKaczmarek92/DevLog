# Guidelines

- Commit changes automatically only when a task is completed or a significant
  milestone is reached, and only on the current non-protected feature branch.
- Push changes only from the current non-protected feature branch after verifying
  `deno task fmt` and `deno task lint` succeed.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) (semantic
  commit messages) for all commits to support automatic versioning and changelog
  generation.
- Never force-push.
- Abort any commit or push if sensitive files, secrets, or credentials are detected.
- Do not update RFCs documentation in the `rfcs/` directory.

## Project Execution

This project uses Deno tasks for development and build processes. Use the following commands:

- `deno task dev`: Start the Tauri development environment (Frontend + Rust backend).
- `deno task build`: Build the production application.
- `deno task fmt`: Format source code.
- `deno task lint`: Lint source code.
- `deno task vite`: Run Vite directly if needed.

Avoid checking `deno.json` for these tasks as they are the standard entry points.
