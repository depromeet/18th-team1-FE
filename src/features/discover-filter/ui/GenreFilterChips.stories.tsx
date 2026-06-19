import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { GenreFilterChips } from "./GenreFilterChips";

const MOCK_GENRES = [
  { label: "일반문학", genreId: 1 },
  { label: "시･에세이", genreId: 2 },
  { label: "추리･미스터리", genreId: 3 },
  { label: "SF", genreId: 4 },
  { label: "공포･스릴러", genreId: 5 },
  { label: "판타지", genreId: 6 },
  { label: "로맨스", genreId: 7 },
  { label: "역사", genreId: 8 },
  { label: "무협", genreId: 9 },
];

const meta: Meta<typeof GenreFilterChips> = {
  title: "features/discover-filter/GenreFilterChips",
  component: GenreFilterChips,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-93.75 overflow-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GenreFilterChips>;

export const Default: Story = {
  render: () => {
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);
    return (
      <GenreFilterChips
        genres={MOCK_GENRES}
        selectedGenreId={selectedGenreId}
        onChange={setSelectedGenreId}
      />
    );
  },
};

export const SelectedMid: Story = {
  render: () => {
    const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(2);
    return (
      <GenreFilterChips
        genres={MOCK_GENRES}
        selectedGenreId={selectedGenreId}
        onChange={setSelectedGenreId}
      />
    );
  },
};
