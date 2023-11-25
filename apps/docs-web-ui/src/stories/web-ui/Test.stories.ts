import type { Meta, StoryObj } from "@storybook/react";

import { Test } from "@media/web-ui";

console.log("============================================================");
console.log(Test);

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Web-ui/test",
  component: Test,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
