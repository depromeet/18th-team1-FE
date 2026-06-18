import type { Meta, StoryObj } from "@storybook/nextjs";

import { SentenceShareCardDrawer } from "./SentenceShareCardDrawer";

const meta: Meta<typeof SentenceShareCardDrawer> = {
  title: "features/sentence-share/SentenceShareCardDrawer",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        className="relative mx-auto overflow-hidden bg-muted"
        style={{ width: 375, height: 812 }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SentenceShareCardDrawer>;

export const TodaySentence: Story = {
  render: () => <SentenceShareCardDrawer isOpen shareType="today-sentence" onClose={() => {}} />,
};

export const SentencePick: Story = {
  render: () => (
    <SentenceShareCardDrawer
      isOpen
      shareType="sentence-pick"
      date="2026-06-10"
      onClose={() => {}}
    />
  ),
};
