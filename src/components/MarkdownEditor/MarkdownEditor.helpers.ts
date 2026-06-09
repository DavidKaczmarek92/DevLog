export interface CheatsheetItem {
  labelId: string;
  defaultLabel: string;
  syntax: string;
}

export const CHEATSHEET_ITEMS: CheatsheetItem[] = [
  {
    labelId: "editor.cheatsheet.bold",
    defaultLabel: "Bold",
    syntax: "**text**",
  },
  { labelId: "editor.cheatsheet.list", defaultLabel: "List", syntax: "- item" },
  { labelId: "editor.cheatsheet.code", defaultLabel: "Code", syntax: "`code`" },
];
