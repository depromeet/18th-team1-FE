import type { Meta, StoryObj } from "@storybook/nextjs";
import { PostAuthorProfile } from "./PostAuthorProfile";

const meta: Meta<typeof PostAuthorProfile> = {
  title: "entities/post/PostAuthorProfile",
  component: PostAuthorProfile,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof PostAuthorProfile>;

export const Default: Story = {
  args: {
    author: { id: "u1", nickname: "의젓한 토끼" },
    createdAt: "1분 전",
  },
};

export const WithAvatar: Story = {
  args: {
    author: {
      id: "u2",
      nickname: "조용한 고양이",
      avatarUrl: "https://i.pravatar.cc/32?img=3",
    },
    createdAt: "3분 전",
  },
};

export const LongNickname: Story = {
  args: {
    author: { id: "u3", nickname: "이름이조금긴사용자닉네임" },
    createdAt: "1시간 전",
  },
};
