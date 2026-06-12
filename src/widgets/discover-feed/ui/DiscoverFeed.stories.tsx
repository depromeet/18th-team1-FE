import type { Meta, StoryObj } from "@storybook/nextjs";
import { DiscoverFeed } from "./DiscoverFeed";

const meta: Meta = {
  title: "widgets/discover-feed/DiscoverFeed",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto w-[375px] h-[812px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DiscoverFeed />,
};
