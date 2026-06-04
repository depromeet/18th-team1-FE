import { TagChip } from "./TagChip";

interface TagItem {
  id: string;
  label: string;
}

interface TagListProps {
  items: TagItem[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export const TagList = ({ items, selectedIds, onSelectionChange }: TagListProps) => {
  const handleSelect = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    onSelectionChange(next);
  };

  return (
    <div className="flex flex-wrap gap-x-2.5 gap-y-3.5">
      {items.map((item) => (
        <TagChip
          key={item.id}
          label={item.label}
          isSelected={selectedIds.includes(item.id)}
          onClick={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
};
