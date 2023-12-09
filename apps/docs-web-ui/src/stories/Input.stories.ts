import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@media/web-ui";

const meta = {
  title: "Web-ui/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    fullWidth: { type: "boolean" },
    id: { type: "string" },
    name: { type: "string" },
    label: { type: "string" },
    value: { type: "string" },
    onChange: { type: "function" },
    onBlur: { type: "function" },
    error: { type: "boolean" },
    helperText: { type: "string" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const stock: Story = {
  args: {
    id: "email",
    name: "email",
    label: "email",
    onChange: () => console.log("onChange"),
    onBlur: () => console.log("onBlur"),
    helperText: "smth went wrong",
  },
};

export const Error: Story = {
  args: {
    id: "email",
    name: "email",
    label: "email",
    onChange: () => console.log("onChange"),
    onBlur: () => console.log("onBlur"),
    helperText: "smth went wrong",
    error: true,
  },
};
