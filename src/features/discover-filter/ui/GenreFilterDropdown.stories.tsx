"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import type { GenreFilter } from "../model/useDiscoverFilter";
import { GenreFilterDropdown } from "./GenreFilterDropdown";

const meta: Meta<typeof GenreFilterDropdown> = {
  title: "features/discover-filter/GenreFilterDropdown",
  component: GenreFilterDropdown,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof GenreFilterDropdown>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<GenreFilter>("전체");
    return <GenreFilterDropdown selectedGenre={selected} onSelect={setSelected} />;
  },
};

export const WithGenreSelected: Story = {
  render: () => {
    const [selected, setSelected] = useState<GenreFilter>("한국소설");
    return <GenreFilterDropdown selectedGenre={selected} onSelect={setSelected} />;
  },
};
