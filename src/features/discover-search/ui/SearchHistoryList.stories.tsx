import type { Meta, StoryObj } from "@storybook/nextjs";
import { SearchHistoryList } from "./SearchHistoryList";

const meta: Meta<typeof SearchHistoryList> = {
  title: "features/discover-search/SearchHistoryList",
  component: SearchHistoryList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-93.75 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchHistoryList>;

export const Empty: Story = {
  args: {
    history: [],
    onSelect: () => {},
    onDelete: () => {},
  },
};

export const WithHistory: Story = {
  args: {
    history: ["세상에는 두 종류의", "고통이", "아픔이 길이 되려면"],
    onSelect: () => {},
    onDelete: () => {},
  },
};

export const FullHistory: Story = {
  args: {
    history: [
      "세상에는 두 종류의",
      "고통이",
      "아픔이 길이 되려면",
      "겨울과 봄 사이",
      "엄청긴 검색어엄청긴 검색어엄청긴 검색어엄청긴 검색어",
    ],
    onSelect: () => {},
    onDelete: () => {},
  },
};
