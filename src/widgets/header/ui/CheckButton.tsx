import { cn } from "@/shared/lib/utils";
import { IcCheck } from "@/shared/ui/icons";

interface CheckButtonProps {
  isChecked: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const CheckButton = ({ isChecked, onClick, disabled, className }: CheckButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex size-7 items-center justify-center rounded-full transition-colors",
        isChecked ? "bg-gray-700" : "bg-gray-200",
        className,
      )}
      aria-pressed={isChecked}
      aria-label="선택 확인"
    >
      <IcCheck size={24} className="text-gray-0" />
    </button>
  );
};
