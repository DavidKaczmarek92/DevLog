import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownEditor } from "./MarkdownEditor";
import { useState } from "react";

const meta: Meta<typeof MarkdownEditor> = {
  title: "Components/MarkdownEditor",
  component: MarkdownEditor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

export const Default: Story = {
  args: {
    value: "",
    onChange: () => {},
    placeholder: "Type your markdown here...",
  },
};

export const WithContent: Story = {
  args: {
    value: "# Hello World\n\nThis is a markdown editor.",
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value);
    return <MarkdownEditor {...args} value={value} onChange={setValue} />;
  },
  args: {
    value: "",
    placeholder: "Try typing...",
  },
};
