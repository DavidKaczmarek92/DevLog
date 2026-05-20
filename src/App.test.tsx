import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App.tsx";

// Mock Tauri invoke
vi.mock("@tauri-apps/api/core", () => ({
  invoke: vi.fn(),
}));

describe("App", () => {
  it("renders the DevLog title", () => {
    render(<App />);
    expect(screen.getByText("DevLog")).toBeInTheDocument();
  });

  it("renders the Vite and React logos", () => {
    render(<App />);
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
    expect(screen.getByAltText("Tauri logo")).toBeInTheDocument();
  });
});
