import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";
import theme from "./theme";
import { MarkdownPlugin } from "./components/MarkdownPlugin";
import { ToolbarPlugin } from "./components/ToolbarPlugin";
import { CodeHighlightPlugin } from "./components/CodeHighlightPlugin";
import { cn } from "../../lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MarkdownEditor = ({
  value,
  onChange,
  placeholder,
  className,
}: MarkdownEditorProps) => {
  const initialConfig = {
    namespace: "MarkdownEditor",
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      LinkNode,
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className={cn(
          "relative rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring overflow-hidden",
          className,
        )}
      >
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="min-h-[200px] w-full px-3 py-2 text-sm focus:outline-none" />
            }
            placeholder={
              <div className="absolute top-[9px] left-3 pointer-events-none text-sm text-muted-foreground">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <ListPlugin />
        <CodeHighlightPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <MarkdownPlugin value={value} onChange={onChange} />
      </div>
    </LexicalComposer>
  );
};

export { MarkdownEditor };
export type { MarkdownEditorProps };
