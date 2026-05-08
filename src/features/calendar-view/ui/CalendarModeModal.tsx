import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import type { CalendarMode } from "../model/calendar.types";

interface CalendarModeModalProps {
  mode: CalendarMode;
  onSelect: (mode: CalendarMode) => void;
}

const VIEW_MODE_OPTIONS: { label: string; value: CalendarMode }[] = [
  { label: "주간", value: "weekly" },
  { label: "월간", value: "monthly" },
];

export const CalendarModeModal = ({
  mode,
  onSelect,
}: CalendarModeModalProps): React.ReactElement => {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] bg-gray-0 py-4 pl-4 pr-6 shadow-[0_0_30px_rgba(0,0,0,0.10)]">
      {VIEW_MODE_OPTIONS.map(({ label, value }) => (
        <label key={value} htmlFor={value} className="flex cursor-pointer items-center gap-2.5">
          <Checkbox id={value} checked={mode === value} onCheckedChange={() => onSelect(value)} />
          <span className={cn("body1", mode === value ? "text-key-secondary2" : "text-gray-300")}>
            {label}
          </span>
        </label>
      ))}
    </div>
  );
};
