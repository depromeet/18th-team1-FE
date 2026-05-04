import type { Meta, StoryObj } from "@storybook/nextjs";
import { BookOpen, Edit, Trash2 } from "lucide-react";

import { OptionMenu } from "./option-menu";

const meta: Meta<typeof OptionMenu> = {
  title: "OptionMenu",
  component: OptionMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof OptionMenu>;

const defaultItems = [
  {
    icon: <Edit />,
    label: "수정하기",
    onClick: () => {},
  },
  {
    icon: <BookOpen />,
    label: "자세히 보기",
    onClick: () => {},
  },
  {
    icon: <Trash2 />,
    label: "삭제하기",
    onClick: () => {},
    isDestructive: true,
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithoutDestructive: Story = {
  args: {
    items: [
      {
        icon: <Edit />,
        label: "수정하기",
        onClick: () => {},
      },
      {
        icon: <BookOpen />,
        label: "자세히 보기",
        onClick: () => {},
      },
    ],
  },
};

export const OnlyDestructive: Story = {
  args: {
    items: [
      {
        icon: <Trash2 />,
        label: "삭제하기",
        onClick: () => {},
        isDestructive: true,
      },
    ],
  },
};
