import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "@media/web-ui";

const meta = {
  title: "components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary", "ternitary", undefined],
      control: { type: "radio" },
    },
    type: {
      options: [
        "lead",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "base",
        "sm",
        "lg",
        "xl",
        "2xl",
        undefined,
      ],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lead: Story = {
  args: {
    variant: "primary",
    type: "lead",
    children: "text",
  },
};

export const H3: Story = {
  args: {
    variant: "secondary",
    type: "h3",
    children: "text",
  },
};

export const Base: Story = {
  args: {
    variant: "ternitary",
    type: "base",
    children: "text",
  },
};
export const Xl2: Story = {
  args: {
    type: "2xl",
    children: "text",
  },
};

export const Sm: Story = {
  args: {
    type: "sm",
    children: "text",
  },
};
