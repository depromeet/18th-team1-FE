import { Text } from "@/shared/ui/text";

interface TagChipProps {
  label: string;
  isSelected: boolean;
  onClick?: () => void;
}

export const TagChip = ({ label, isSelected, onClick }: TagChipProps) => {
  const color = isSelected ? ("gray-50" as const) : ("gray-500" as const);
  const baseClassName = `rounded-full px-3 py-2 ${isSelected ? "bg-gray-700" : "bg-gray-50"}`;

  if (!onClick) {
    return (
      <Text as="span" variant="body1" color={color} className={baseClassName}>
        {label}
      </Text>
    );
  }

  return (
    <Text
      as="button"
      type="button"
      onClick={onClick}
      variant="body1"
      color={color}
      className={`cursor-pointer ${baseClassName}`}
    >
      {label}
    </Text>
  );
};
