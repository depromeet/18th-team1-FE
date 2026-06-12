import type { Meta, StoryObj } from "@storybook/nextjs";
import { DiscoverSearchBar } from "./DiscoverSearchBar";

const meta: Meta<typeof DiscoverSearchBar> = {
  title: "features/discover-search/DiscoverSearchBar",
  component: DiscoverSearchBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="px-5 py-3 w-93.75">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DiscoverSearchBar>;

export const Default: Story = {
  args: {
    onSubmit: (value) => alert(`검색: ${value}`),
  },
};
