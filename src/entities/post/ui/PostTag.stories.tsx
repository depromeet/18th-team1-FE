import type { Meta, StoryObj } from "@storybook/nextjs";
import { PostTag } from "./PostTag";

const meta: Meta<typeof PostTag> = {
  title: "entities/post/PostTag",
  component: PostTag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["good", "mid", "bad", "share"],
    },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof PostTag>;

export const Good: Story = {
  args: { label: "# 아주 기분 좋아요", variant: "good" },
};

export const Mid: Story = {
  args: { label: "# 꽤 괜찮아요", variant: "mid" },
};

export const Bad: Story = {
  args: { label: "# 약간 별로에요", variant: "bad" },
};

export const Share: Story = {
  args: { label: "# 공감해주는 문장", variant: "share" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <PostTag label="# 아주 기분 좋아요" variant="good" />
      <PostTag label="# 꽤 괜찮아요" variant="mid" />
      <PostTag label="# 약간 별로에요" variant="bad" />
      <PostTag label="# 공감해주는 문장" variant="share" />
    </div>
  ),
};
