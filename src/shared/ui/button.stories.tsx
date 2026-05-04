import type { Meta, StoryObj } from "@storybook/nextjs";
import { BookOpen, Plus } from "lucide-react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: "text" },
    isDisabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: "확인",
  },
};

export const WithIcon: Story = {
  args: {
    label: "책 추가",
    icon: <Plus size={20} />,
  },
};

export const Disabled: Story = {
  args: {
    label: "확인",
    isDisabled: true,
  },
};

export const WithIconDisabled: Story = {
  args: {
    label: "책 추가",
    icon: <BookOpen size={20} />,
    isDisabled: true,
  },
};
