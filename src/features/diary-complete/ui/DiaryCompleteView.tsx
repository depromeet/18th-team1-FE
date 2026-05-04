"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/ui/button";
import { IconButton } from "@/shared/ui/icon-button";
import { IcShare } from "@/shared/ui/icons";
import { Text } from "@/shared/ui/text";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

interface DiaryCompleteViewProps {
  diaryId: string;
}

export const DiaryCompleteView = ({ diaryId: _ }: DiaryCompleteViewProps): React.ReactElement => {
  const router = useRouter();
  const today = formatDate(new Date());

  const handleNext = (): void => {
    router.push("/");
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center pt-17">
        <div className="flex flex-col items-center gap-2 text-center">
          <Text variant="head0" color="gray-700">
            오늘의 문장으로
            <br />
            일기 작성을 완료했어요
          </Text>
          <Text variant="subhead2" color="gray-300">
            일기는 공유되지 않아요
          </Text>
        </div>

        <div className="mt-22.5">
          <Image
            src="/images/diary-write.png"
            alt="일기 작성 완료"
            width={140}
            height={137}
            priority
          />
        </div>

        <div className="mt-7.5 rounded-lg bg-gray-50 px-2.5 py-2.5">
          <Text as="span" variant="point1" color="gray-500">
            {today}
          </Text>
        </div>
      </div>

      <div className="shrink-0 px-5 pb-8.5">
        <div className="flex gap-3.75">
          <Button label="다음" className="flex-1" onClick={handleNext} />
          <IconButton icon={<IcShare size={24} className="text-gray-0" />} />
        </div>
      </div>
    </div>
  );
};
