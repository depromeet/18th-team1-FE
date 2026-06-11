import { IcDelete } from "@/shared/ui/icons";

interface SearchHistoryListProps {
  history: string[];
  onSelect: (query: string) => void;
  onDelete: (query: string) => void;
}

export const SearchHistoryList = ({
  history,
  onSelect,
  onDelete,
}: SearchHistoryListProps): React.ReactElement => (
  <div className="px-5 pt-[18px]">
    <p className="body2 text-gray-600">최근 검색</p>
    <ul className="mt-[19px] flex flex-col gap-[18px]">
      {history.map((query) => (
        <li key={query} className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onSelect(query)}
            className="body1 min-w-0 flex-1 truncate text-left text-gray-600"
          >
            {query}
          </button>
          <button type="button" onClick={() => onDelete(query)}>
            <IcDelete size={20} className="text-gray-200" />
          </button>
        </li>
      ))}
    </ul>
  </div>
);
