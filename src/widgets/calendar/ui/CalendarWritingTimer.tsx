import { useRouter } from "next/navigation";

import { IcNextCard } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/text";
import { useWritingTimer } from "../model/useWritingTimer";

export const CalendarWritingTimer = (): React.ReactElement => {
  const router = useRouter();
  const handleNavigateToWrite = (): void => {
    router.push("/diary/emotion");
  };

  const { formattedTime, isUnderThreeHours } = useWritingTimer();

  return (
    <div className="flex w-full rounded-2xl bg-gray-50 p-5">
      <div className="flex-1">
        <Text variant="subhead5" color="gray-600">
          오늘의 문장 추천 받기
        </Text>
        <Text
          variant="point1-2"
          className={isUnderThreeHours ? "text-sub-sunday" : "text-gray-600"}
        >
          {formattedTime}
        </Text>
      </div>
      <button type="button" onClick={handleNavigateToWrite}>
        <IcNextCard className="text-gray-200" />
      </button>
    </div>
  );
};
