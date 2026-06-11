import { cn } from "@/shared/lib/utils";
import { IcMinusCircleFill, IcPlusCircleFill } from "@/shared/ui/icons";

interface SentenceTypeChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SentenceTypeChip = ({ label, isSelected, onClick }: SentenceTypeChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "subhead2 flex h-13.5 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[30px] px-3.5 py-3.375",
      isSelected
        ? "bg-key-secondary2 text-gray-0"
        : "border border-dashed border-gray-200 bg-gray-50 text-gray-500",
    )}
  >
    <span>{label}</span>
    {isSelected ? <IcMinusCircleFill size={20} /> : <IcPlusCircleFill size={20} />}
  </button>
);
