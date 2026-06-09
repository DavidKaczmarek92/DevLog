import { renderHook, act } from "@testing-library/react";
import { useToolbarState } from "./useToolbarState";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import {
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  type LexicalEditor,
} from "lexical";

const wrapper = ({ children }: { children: ReactNode }) => (
  <LexicalComposer
    initialConfig={{
      namespace: "TestEditor",
      nodes: [
        HeadingNode,
        QuoteNode,
        ListNode,
        ListItemNode,
        CodeNode,
        CodeHighlightNode,
      ],
      onError: (error) => {
        throw error;
      },
    }}
  >
    {children}
  </LexicalComposer>
);

describe("useToolbarState", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useToolbarState(), { wrapper });

    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.isBold).toBe(false);
    expect(result.current.isItalic).toBe(false);
    expect(result.current.isCode).toBe(false);
  });

  it("should update canUndo when CAN_UNDO_COMMAND is dispatched", () => {
    let editor: LexicalEditor | undefined;
    const { result } = renderHook(
      () => {
        const [editorContext] = useLexicalComposerContext();
        editor = editorContext;
        return useToolbarState();
      },
      { wrapper },
    );

    act(() => {
      editor?.dispatchCommand(CAN_UNDO_COMMAND, true);
    });

    expect(result.current.canUndo).toBe(true);

    act(() => {
      editor?.dispatchCommand(CAN_UNDO_COMMAND, false);
    });

    expect(result.current.canUndo).toBe(false);
  });

  it("should update canRedo when CAN_REDO_COMMAND is dispatched", () => {
    let editor: LexicalEditor | undefined;
    const { result } = renderHook(
      () => {
        const [editorContext] = useLexicalComposerContext();
        editor = editorContext;
        return useToolbarState();
      },
      { wrapper },
    );

    act(() => {
      editor?.dispatchCommand(CAN_REDO_COMMAND, true);
    });

    expect(result.current.canRedo).toBe(true);

    act(() => {
      editor?.dispatchCommand(CAN_REDO_COMMAND, false);
    });

    expect(result.current.canRedo).toBe(false);
  });
});
