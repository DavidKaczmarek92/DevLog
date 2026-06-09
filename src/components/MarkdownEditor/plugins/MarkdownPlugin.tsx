import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

interface MarkdownPluginProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownPlugin = ({ value, onChange }: MarkdownPluginProps) => {
  const [editor] = useLexicalComposerContext();

  // Handle initial value and external changes
  useEffect(() => {
    editor.update(() => {
      const currentMarkdown = $convertToMarkdownString(TRANSFORMERS);
      if (currentMarkdown !== value) {
        $convertFromMarkdownString(value, TRANSFORMERS);
      }
    });
  }, [editor, value]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          const markdown = $convertToMarkdownString(TRANSFORMERS);
          if (markdown !== value) {
            onChange(markdown);
          }
        });
      }}
    />
  );
};

export { MarkdownPlugin };
