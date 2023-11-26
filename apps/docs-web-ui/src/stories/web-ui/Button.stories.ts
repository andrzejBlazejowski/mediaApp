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
      options: ["primary", "secondary", undefined],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Button",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button",
  },
};
export const Ternitary: Story = {
  args: {
    children: "Button",
  },
};
