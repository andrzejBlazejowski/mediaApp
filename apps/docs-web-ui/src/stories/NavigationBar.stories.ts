import type { Meta, StoryObj } from "@storybook/react";

import { NavigationBar } from "@media/web-ui";

const meta = {
  title: "navigation/NavigationBar",
  component: NavigationBar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: ["primary", "secondary", "ternitary", undefined],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    variant: "primary",
    items: [
      {
        id: "home",
        name: "Home",
        href: "/",
        childs: [
          {
            id: "home",
            name: "Home",
            href: "/",
          },
          {
            id: "About",
            name: "About",
            href: "/about",
          },
          {
            id: "Contact",
            name: "Contact",
            href: "/contact",
          },
        ],
      },
      {
        id: "About",
        name: "About",
        href: "/about",
      },
      {
        id: "Contact",
        name: "Contact",
        href: "/contact",
      },
    ],
  },
};
