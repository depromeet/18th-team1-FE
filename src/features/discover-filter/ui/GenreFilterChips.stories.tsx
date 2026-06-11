import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import type { GenreFilter } from "../model/useDiscoverFilter";
import { GenreFilterChips } from "./GenreFilterChips";

const meta: Meta<typeof GenreFilterChips> = {
  title: "features/discover-filter/GenreFilterChips",
  component: GenreFilterChips,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[375px] overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GenreFilterChips>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<GenreFilter>("전체");
    return <GenreFilterChips selected={selected} onChange={setSelected} />;
  },
};

export const SelectedMid: Story = {
  render: () => {
    const [selected, setSelected] = useState<GenreFilter>("에세이･시");
    return <GenreFilterChips selected={selected} onChange={setSelected} />;
  },
};
