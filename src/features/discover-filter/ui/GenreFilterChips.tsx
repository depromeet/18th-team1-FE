import type { GenreDto } from "@/entities/post";

interface GenreFilterChipsProps {
  genres: GenreDto[];
  selectedGenreId: number | undefined;
  onChange: (genreId: number | undefined) => void;
}

export const GenreFilterChips = ({
  genres,
  selectedGenreId,
  onChange,
}: GenreFilterChipsProps): React.ReactElement => (
  <div className="flex gap-1.5 overflow-x-auto py-3 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <button
      key="all"
      type="button"
      onClick={() => onChange(undefined)}
      className={`caption1 shrink-0 whitespace-nowrap rounded-full px-3 py-1 ${
        selectedGenreId === undefined
          ? "bg-gray-700 text-white"
          : "border border-gray-200 bg-background text-gray-500"
      }`}
    >
      전체
    </button>
    {genres.map((genre) => (
      <button
        key={genre.genreId}
        type="button"
        onClick={() => onChange(genre.genreId)}
        className={`caption1 shrink-0 whitespace-nowrap rounded-full px-3 py-1 ${
          selectedGenreId === genre.genreId
            ? "bg-gray-700 text-white"
            : "border border-gray-200 bg-background text-gray-500"
        }`}
      >
        {genre.label}
      </button>
    ))}
  </div>
);
