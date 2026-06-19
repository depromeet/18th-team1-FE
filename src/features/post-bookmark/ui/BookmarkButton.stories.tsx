import type { Meta, StoryObj } from "@storybook/nextjs";
import { BookmarkButton } from "./BookmarkButton";

const meta: Meta<typeof BookmarkButton> = {
  title: "features/post-bookmark/BookmarkButton",
  component: BookmarkButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    isBookmarked: { control: "boolean" },
    onToggle: { action: "toggled" },
  },
};

export default meta;
type Story = StoryObj<typeof BookmarkButton>;

export const Default: Story = {
  args: { isBookmarked: false },
};

export const Bookmarked: Story = {
  args: { isBookmarked: true },
};
