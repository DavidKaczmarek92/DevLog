# Best Practices

This document outlines coding and development best practices for the DevLog project. It will be updated over time as new guidelines are established.

## File Naming and Organization

- Use separate `functionName.types.ts` and `functionName.helpers.(ts|tsx)` files for helper functions and non-props types. React component props interfaces must be defined in the same file as the React component. This keeps concerns separated and improves maintainability.

## React Components

- Use `interface` instead of `type` for React component props to improve IDE type inference and performance.
- Prefer Tailwind CSS utility classes over inline styles or separate CSS modules in React components.
- Follow accessibility practices (labels, alt text) in all UI components.
- Avoid `import * as React from "react";` — use direct type imports when needed (reference `src/App.tsx`).
- Define React components using arrow function syntax (`const Name = (props) => {}`) instead of function declarations.
- Do not manually set `displayName` on arrow function components.

## General

- Keep dependency versions pinned (avoiding carets `^` or tildes `~`) in `package.json` to ensure consistency across environments.
- Ensure `package-lock.json` is updated whenever `package.json` changes.

## Project Execution

See `.junie/guidelines.md` for commit rules, branch management, and available NPM scripts.
