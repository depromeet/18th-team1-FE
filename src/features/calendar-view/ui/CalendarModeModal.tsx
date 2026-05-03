import { cn } from "@/shared/lib/utils";
import { IcCheck } from "@/shared/ui/icons";
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
    <div className="flex flex-col gap-3.5 rounded-[20px] bg-gray-0 p-4 shadow-[0_0_30px_rgba(0,0,0,0.10)]">
      {VIEW_MODE_OPTIONS.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          className="flex items-center gap-2"
          onClick={() => onSelect(value)}
        >
          <IcCheck size={24} className={cn("text-foreground", mode !== value && "invisible")} />
          <span className="body2 text-gray-700">{label}</span>
        </button>
      ))}
    </div>
  );
};
