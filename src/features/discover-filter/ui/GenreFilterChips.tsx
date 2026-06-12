import { GENRE_FILTERS, type GenreFilter } from "../model/useDiscoverFilter";

interface GenreFilterChipsProps {
  selected: GenreFilter;
  onChange: (genre: GenreFilter) => void;
}

export const GenreFilterChips = ({
  selected,
  onChange,
}: GenreFilterChipsProps): React.ReactElement => (
  <div className="flex gap-1.5 overflow-x-auto py-3 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {GENRE_FILTERS.map((genre) => (
      <button
        key={genre}
        type="button"
        onClick={() => onChange(genre)}
        className={`caption1 shrink-0 whitespace-nowrap rounded-full px-3 py-1 ${
          selected === genre
            ? "bg-gray-700 text-white"
            : "border border-gray-200 bg-background text-gray-500"
        }`}
      >
        {genre}
      </button>
    ))}
  </div>
);
