import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@media/web-ui";

const meta = {
  title: "Web-ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary", "ternitary", undefined],
      control: { type: "radio" },
    },
    layout: {
      options: ["plain-text", "icon-text", "icon", "icon-rounded", undefined],
      control: { type: "radio" },
    },
    icon: {
      options: ["add", "edit", "delete", "search", "filter", undefined],
      control: { type: "radio" },
    },
    type: {
      options: ["normal", "danger", "warning", "info", undefined],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    layout: "icon-text",
    icon: "add",
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    layout: "plain-text",
    children: "Button",
  },
};

export const Ternitary: Story = {
  args: {
    variant: "ternitary",
    layout: "icon",
    icon: "delete",
    children: "Button",
  },
};

export const Def: Story = {
  args: {
    children: "Button",
  },
};
