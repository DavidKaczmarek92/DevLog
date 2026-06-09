export interface CheatsheetItem {
  label: string;
  syntax: string;
}

export const CHEATSHEET_ITEMS: CheatsheetItem[] = [
  { label: "Bold", syntax: "**text**" },
  { label: "List", syntax: "- item" },
  { label: "Code", syntax: "`code`" },
];
