"use client";

import Image from "next/image";
import { memo } from "react";

import { cn } from "@/shared/lib/utils";
import { IcCheckCircleFill } from "@/shared/ui/icons";
import { useImageDominantColor } from "../model/useImageDominantColor";

interface ScrapBookCardProps {
  coverImageUrl?: string;
  quote: string;
  bookTitle: string;
  author: string;
  isSelected?: boolean;
  onSelect?: () => void;
  onPress?: () => void;
}

export const ScrapBookCard = memo(
  ({
    coverImageUrl,
    quote,
    bookTitle,
    author,
    isSelected = false,
    onSelect,
    onPress,
  }: ScrapBookCardProps) => {
    const { color, isDark } = useImageDominantColor(coverImageUrl);

    return (
      <button
        type="button"
        onClick={onSelect ?? onPress}
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          !isDark && "border border-gray-100",
        )}
      >
        {/* 책 표지: 카드 전체를 채우는 배경 */}
        <div className="absolute inset-0">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={bookTitle}
              fill
              className="object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="size-full bg-gray-100" />
          )}
        </div>

        {/* 하단 그라데이션 오버레이 — backdrop-blur: 40px, 동일 색상 투명→불투명 */}
        <div
          className="absolute bottom-0 left-0 right-0 top-35 backdrop-blur-2xl"
          style={{
            background: `linear-gradient(to bottom, ${color.replace("rgb(", "rgba(").replace(")", ", 0)")}, ${color})`,
          }}
        />

        {/* 이미지 위 여백 — 텍스트 시작 지점(150px)까지 공간 확보 */}
        <div className="h-35" aria-hidden="true" />

        {/* 텍스트 — normal flow로 카드 높이를 결정 */}
        <div className="relative flex flex-col gap-3 px-2.5 pt-2.5 pb-3.5">
          <p
            className={cn(
              "subhead5 line-clamp-4 text-left",
              isDark ? "text-white" : "text-gray-600",
            )}
          >
            {quote}
          </p>
          <p
            className={cn("caption2 truncate", isDark ? "text-white/70" : "text-[rgba(9,9,9,0.5)]")}
          >
            {`『${bookTitle}』, ${author}`}
          </p>
        </div>

        {/* 선택 오버레이 */}
        {isSelected && (
          <>
            <div className="absolute inset-0 bg-white/20" />
            <IcCheckCircleFill size={24} className="absolute right-5 top-5 text-key-secondary" />
          </>
        )}
      </button>
    );
  },
);
