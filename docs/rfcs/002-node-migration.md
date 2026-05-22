# RFC-002 — Migration to Node.js

**Created:** 2026-05-20

---

## Summary

Migrate the project frontend tooling from Deno to Node.js/NPM to resolve development environment issues and improve developer productivity.

---

## Context

RFC-001 initially selected Deno as the JS runtime for its built-in TypeScript support and minimal configuration. However, real-world usage revealed significant friction with professional IDEs (specifically JetBrains IntelliJ IDEA / WebStorm).

## Reasons for Migration

### 1. IDE / DSL Integration Issues
Deno's integration with JetBrains IDEs via the Deno LSP encountered persistent Domain-Specific Language (DSL) issues. This resulted in:
- **Setup Difficulties:** Inconsistent behavior when setting up Deno in IntelliJ IDEA.
- **False Positives:** IDE errors that were not present in the actual runtime or `deno check`.
- **Divergent State:** Frequent cases where the IDE showed TypeScript errors but `deno check` passed, and vice-versa.

### 2. NPM Package Type Resolution
The handling of types for packages imported via `npm:` specifiers was unstable in the IDE:
- **Missing Types:** The IDE often failed to resolve or correctly display types for NPM packages.
- **Integration Mismatch:** The mismatch between Deno's internal type resolution and the IDE's expectations made development confusing and unreliable.

---

## Decisions

### Move to Node.js + NPM
- Replace `deno.json` with `package.json`.
- Use standard `tsconfig.json` for TypeScript configuration.
- Use NPM as the package manager and task runner.

### Tooling Changes
- **Vite:** Use standard Vite without the Deno plugin.
- **Linting:** Use ESLint instead of `deno lint`.
- **Formatting:** Use Prettier instead of `deno fmt`.

---

## Impact

- **Positive:** Consistent IDE experience, reliable type-checking, larger ecosystem of standard Node/Vite plugins.
- **Negative:** Addition of `node_modules` folder, more configuration files (`package.json`, `tsconfig.json`, `eslint.config.js`).

---

## References

- This RFC supersedes the "Deno as JS runtime" decision in [RFC-001](001-project-setup.md).
