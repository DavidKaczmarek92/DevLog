# Guidelines

- Commit changes automatically only when a task is completed or a significant
  milestone is reached. Do NOT commit directly to `main`; verify the
  current branch using `git branch --show-current` to ensure you are on a feature
  branch.
- Push changes only from feature branches (not `main`) after
  verifying `npm run fmt`, `npm run lint`, and `npm run type-check` succeed.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) (semantic
  commit messages) for all commits to support automatic versioning and changelog
  generation.
- Never force-push.
- Abort any commit or push if sensitive files, secrets, or credentials are detected.
- Do not update RFCs documentation in the `rfcs/` directory.
- Use `interface` instead of `type` for React component props to improve IDE type inference and performance.
- Keep dependency versions pinned (avoiding carets `^` or tildes `~`) in `package.json` to ensure consistency across environments.
- Ensure `package-lock.json` is updated whenever `package.json` changes.
- When modifying the Rust backend, ensure `cargo test` passes in the `src-tauri` directory.
- Always execute `npm run lint` (and `npm run fmt`, `npm run type-check`) before pushing changes.
- Use `interface` (not `type`) for React component props (see `src/components/Button/Button.tsx:32`).
- Prefer Tailwind CSS utility classes over inline styles or separate CSS modules in React components.
- Follow accessibility practices (labels, alt text) in all UI components.
- Avoid `import * as React from "react";` — use direct type imports when needed (reference `src/App.tsx`).
- Define React components using arrow function syntax (`const Name = (props) => {}`) instead of function declarations.
- Do not manually set `displayName` on arrow function components.
- Use separate `functionName.types.ts` and `functionName.helpers.(ts|tsx)` files for helper functions and non-props types. React component props interfaces must be defined in the same file as the React component.

## Project Execution

This project uses NPM scripts for development and build processes. Use the following commands:

- `npm run dev`: Start the Tauri development environment (Frontend + Rust backend).
- `npm run build`: Build the production application.
- `npm run fmt`: Format source code using Prettier.
- `npm run lint`: Lint source code using ESLint.
- `npm run type-check`: Run TypeScript type checking.
- `npm test`: Run tests using Vitest.
- `npm run storybook`: Start Storybook.

Avoid checking `package.json` for these tasks as they are the standard entry points.
