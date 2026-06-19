import type { Meta, StoryObj } from "@storybook/nextjs";
import { DiscoverSearchResults } from "./DiscoverSearchResults";

const meta: Meta<typeof DiscoverSearchResults> = {
  title: "widgets/DiscoverSearchResults",
  component: DiscoverSearchResults,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto h-[812px] w-93.75 overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DiscoverSearchResults>;

export const EmptySearch: Story = {
  args: {
    initialQuery: "",
  },
};

export const WithResults: Story = {
  args: {
    initialQuery: "세상에는 두 종류의",
  },
};
