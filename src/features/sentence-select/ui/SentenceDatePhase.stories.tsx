import type { Meta, StoryObj } from "@storybook/nextjs";

import { SentenceDatePhase } from "./SentenceDatePhase";

const meta: Meta = {
  title: "features/sentence-select/SentenceDatePhase",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        className="relative mx-auto overflow-hidden bg-background"
        style={{ width: 375, height: 812 }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <SentenceDatePhase month="June" onReveal={() => {}} />,
};
