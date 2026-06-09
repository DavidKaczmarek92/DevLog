import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

    expect(
      screen.getByPlaceholderText("Enter markdown..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Write")).toBeInTheDocument();
    expect(screen.getByText("Preview")).toBeInTheDocument();
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<MarkdownEditor value="" onChange={onChange} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello" } });

    expect(onChange).toHaveBeenCalledWith("Hello");
  });

  it("switches to preview tab and back", () => {
    const onChange = vi.fn();
    render(<MarkdownEditor value="Some content" onChange={onChange} />);

    const previewTab = screen.getByText("Preview");
    fireEvent.click(previewTab);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText("Preview placeholder")).toBeInTheDocument();

    const writeTab = screen.getByText("Write");
    fireEvent.click(writeTab);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Some content")).toBeInTheDocument();
  });

  it("shows cheatsheet items in write tab", () => {
    render(<MarkdownEditor value="" onChange={() => {}} />);

    expect(screen.getByText("Bold:")).toBeInTheDocument();
    expect(screen.getByText("**text**")).toBeInTheDocument();
    expect(screen.getByText("List:")).toBeInTheDocument();
    expect(screen.getByText("- item")).toBeInTheDocument();
    expect(screen.getByText("Code:")).toBeInTheDocument();
    expect(screen.getByText("`code`")).toBeInTheDocument();
  });
});
