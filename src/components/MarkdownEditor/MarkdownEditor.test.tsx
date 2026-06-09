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
    expect(screen.getByLabelText("Bold")).toBeInTheDocument();
    expect(screen.getByLabelText("Italic")).toBeInTheDocument();
  });

  it("renders provided markdown content", async () => {
    const onChange = vi.fn();
    render(<MarkdownEditor value="# Hello World" onChange={onChange} />);

    // In Lexical, headings are rendered as H1 nodes
    expect(await screen.findByText("Hello World")).toBeInTheDocument();
  });

  it("shows toolbar buttons", () => {
    render(<MarkdownEditor value="" onChange={() => {}} />);

    const toolbarButtons = [
      "Undo",
      "Redo",
      "Heading 1",
      "Heading 2",
      "Bullet List",
      "Numbered List",
      "Quote",
      "Inline Code",
      "Code Block",
    ];

    toolbarButtons.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });
  it("renders code blocks correctly", async () => {
    const onChange = vi.fn();
    const markdown = "```javascript\nconst x = 1;\n```";
    render(<MarkdownEditor value={markdown} onChange={onChange} />);

    expect(await screen.findByText("const")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
