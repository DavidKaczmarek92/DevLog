import { cn } from "../../lib/utils";
import { Editor } from "./Editor";

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
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <Editor value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export { MarkdownEditor };
export type { MarkdownEditorProps };
