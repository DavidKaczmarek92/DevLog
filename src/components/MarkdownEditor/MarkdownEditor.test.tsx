import "@testing-library/jest-dom/vitest";
import { render, screen } from "../../test/test-utils";
import { describe, expect, it, vi } from "vitest";
import { MarkdownEditor } from "./MarkdownEditor";

describe("MarkdownEditor", () => {
  it("renders correctly with default props", () => {
    const onChange = vi.fn();
    render(
      <MarkdownEditor
        value=""
        onChange={onChange}
        placeholder="Enter markdown..."
      />,
    );

    expect(screen.getByText("Enter markdown...")).toBeInTheDocument();
    expect(screen.getByTitle("Bold")).toBeInTheDocument();
    expect(screen.getByTitle("Italic")).toBeInTheDocument();
  });

  it("renders provided markdown content", async () => {
    const onChange = vi.fn();
    render(<MarkdownEditor value="# Hello World" onChange={onChange} />);

    // In Lexical, headings are rendered as H1 nodes
    expect(await screen.findByText("Hello World")).toBeInTheDocument();
  });

  it("shows toolbar buttons", () => {
    render(<MarkdownEditor value="" onChange={() => {}} />);

    expect(screen.getByTitle("Undo")).toBeInTheDocument();
    expect(screen.getByTitle("Redo")).toBeInTheDocument();
    expect(screen.getByTitle("Heading 1")).toBeInTheDocument();
    expect(screen.getByTitle("Heading 2")).toBeInTheDocument();
    expect(screen.getByTitle("Bullet List")).toBeInTheDocument();
    expect(screen.getByTitle("Numbered List")).toBeInTheDocument();
    expect(screen.getByTitle("Quote")).toBeInTheDocument();
  });
});
