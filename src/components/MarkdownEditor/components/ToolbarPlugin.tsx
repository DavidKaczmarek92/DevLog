import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useIntl } from "react-intl";
import messages from "./messages";
import {
  REDO_COMMAND,
  UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createCodeNode } from "@lexical/code";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { Button } from "../../Button/Button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Quote,
  Code,
  SquareCode,
} from "lucide-react";
import { useToolbarState } from "./hooks/useToolbarState";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const intl = useIntl();
  const { canUndo, canRedo, isBold, isItalic, isCode } = useToolbarState();

  return (
    <div className="flex items-center gap-1 p-1 border-b bg-muted/50">
      <Button
        variant="ghost"
        size="sm"
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        title={intl.formatMessage(messages.undo)}
        aria-label={intl.formatMessage(messages.undo)}
        type="button"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        title={intl.formatMessage(messages.redo)}
        aria-label={intl.formatMessage(messages.redo)}
        type="button"
      >
        <Redo className="h-4 w-4" />
      </Button>
      <div className="w-px h-4 bg-border mx-1" />
      <Button
        variant={isBold ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        title={intl.formatMessage(messages.bold)}
        aria-label={intl.formatMessage(messages.bold)}
        type="button"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={isItalic ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        title={intl.formatMessage(messages.italic)}
        aria-label={intl.formatMessage(messages.italic)}
        type="button"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={isCode ? "secondary" : "ghost"}
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        title={intl.formatMessage(messages.inlineCode)}
        aria-label={intl.formatMessage(messages.inlineCode)}
        type="button"
      >
        <Code className="h-4 w-4" />
      </Button>
      <div className="w-px h-4 bg-border mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode("h1"));
            }
          });
        }}
        title={intl.formatMessage(messages.h1)}
        aria-label={intl.formatMessage(messages.h1)}
        type="button"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createHeadingNode("h2"));
            }
          });
        }}
        title={intl.formatMessage(messages.h2)}
        aria-label={intl.formatMessage(messages.h2)}
        type="button"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <div className="w-px h-4 bg-border mx-1" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        title={intl.formatMessage(messages.bulletList)}
        aria-label={intl.formatMessage(messages.bulletList)}
        type="button"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        title={intl.formatMessage(messages.numberedList)}
        aria-label={intl.formatMessage(messages.numberedList)}
        type="button"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createQuoteNode());
            }
          });
        }}
        title={intl.formatMessage(messages.quote)}
        aria-label={intl.formatMessage(messages.quote)}
        type="button"
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createCodeNode());
            }
          });
        }}
        title={intl.formatMessage(messages.codeBlock)}
        aria-label={intl.formatMessage(messages.codeBlock)}
        type="button"
      >
        <SquareCode className="h-4 w-4" />
      </Button>
    </div>
  );
};

export { ToolbarPlugin };
