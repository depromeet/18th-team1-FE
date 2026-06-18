"use client";

import { motion } from "framer-motion";

import type { ShareType } from "../model/calendar-share.types";
import { Calendar, SelectText, TodayText } from "./CalendarShareTypeCard";

const SHARE_OPTIONS: {
  type: ShareType;
  label: string;
  card: () => React.ReactElement;
  rotation: string;
  overlap: string;
  zIndex: string;
}[] = [
  {
    type: "today-sentence",
    label: "오늘의 문장",
    card: TodayText,
    rotation: "-rotate-[14deg]",
    overlap: "-mr-8",
    zIndex: "z-30",
  },
  {
    type: "calendar",
    label: "캘린더",
    card: Calendar,
    rotation: "",
    overlap: "",
    zIndex: "z-20",
  },
  {
    type: "sentence-pick",
    label: "문장 선택",
    card: SelectText,
    rotation: "rotate-[12deg]",
    overlap: "-ml-8",
    zIndex: "z-10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface CalendarShareTypeSheetProps {
  isOpen: boolean;
  onSelect: (shareType: ShareType) => void;
  onClose: () => void;
}

export const CalendarShareTypeSheet = ({
  isOpen,
  onSelect,
  onClose,
}: CalendarShareTypeSheetProps): React.ReactElement | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 뒷배경 탭하면 닫힘 */}
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="닫기" />

      {/* 하단 그라디언트 — 캘린더를 서서히 지움 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-background via-background/85 to-transparent" />

      {/* 카드 3종 — 왼쪽부터 순서대로 stagger 등장 */}
      <div className="absolute bottom-14 left-0 right-0 flex items-end justify-center">
        {SHARE_OPTIONS.map(
          ({ type, label, card: CardComponent, rotation, overlap, zIndex }, index) => (
            <motion.button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              className={`relative flex flex-col items-center gap-2 ${rotation} ${zIndex} ${overlap}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="caption1 whitespace-nowrap rounded-full bg-gray-700 px-3 py-1.5 text-gray-0">
                {label}
              </span>
              <CardComponent />
            </motion.button>
          ),
        )}
      </div>

      {/* 하단 98px 그라디언트 박스 + 공유하기 텍스트 */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex h-24.5 flex-col items-center justify-center gap-2"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FAFAFA 19.21%)",
        }}
      >
        <span className="body1 text-gray-500">공유하기</span>
      </div>
    </div>
  );
};
