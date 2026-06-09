import { useState } from "react";
import { cn } from "../../lib/utils";
import { type Tab } from "./MarkdownEditor.types";
import { CHEATSHEET_ITEMS } from "./MarkdownEditor.helpers";
import { Button } from "../Button/Button";

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
  const [activeTab, setActiveTab] = useState<Tab>("write");

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex items-center gap-1 border-b">
        <Button
          variant={activeTab === "write" ? "secondary" : "ghost"}
          size="sm"
          className={cn(
            "rounded-none border-b-2 border-transparent px-4 py-2 h-auto text-sm font-medium transition-none",
            activeTab === "write" && "border-primary bg-secondary",
          )}
          onClick={() => setActiveTab("write")}
        >
          Write
        </Button>
        <Button
          variant={activeTab === "preview" ? "secondary" : "ghost"}
          size="sm"
          className={cn(
            "rounded-none border-b-2 border-transparent px-4 py-2 h-auto text-sm font-medium transition-none",
            activeTab === "preview" && "border-primary bg-secondary",
          )}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </Button>
      </div>

      {activeTab === "write" && (
        <div className="flex flex-col gap-2">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground px-1">
            {CHEATSHEET_ITEMS.map((item) => (
              <span key={item.label}>
                <span className="font-semibold">{item.label}:</span>{" "}
                <code className="bg-muted px-1 rounded">{item.syntax}</code>
              </span>
            ))}
          </div>
        </div>
      )}

      {activeTab === "preview" && (
        <div className="min-h-[224px] w-full rounded-md border border-input bg-muted/30 p-4 text-muted-foreground text-sm">
          Preview placeholder
        </div>
      )}
    </div>
  );
};

export { MarkdownEditor };
export type { MarkdownEditorProps };
