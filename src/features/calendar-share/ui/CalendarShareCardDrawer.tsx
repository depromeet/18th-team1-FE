"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Drawer, DrawerContent } from "@/shared/ui/drawer";
import { NewButton } from "@/shared/ui/new-button";

import { fetchCalendarCardImage } from "../api/calendarShareApi";
import type { CalendarCardVariant } from "../model/calendar-share.types";

const CARD_VARIANTS: CalendarCardVariant[] = [1, 2];
const CARD_WIDTH = 275;
const CARD_GAP = 12;
const CARD_SIDE_OFFSET = 50; // (375 - 275) / 2

interface CalendarShareCardDrawerProps {
  isOpen: boolean;
  year?: number;
  month?: number;
  onClose: () => void;
}

export const CalendarShareCardDrawer = ({
  isOpen,
  year,
  month,
  onClose,
}: CalendarShareCardDrawerProps): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Partial<Record<CalendarCardVariant, string>>>({});
  const blobCacheRef = useRef<Partial<Record<CalendarCardVariant, Blob>>>({});
  const objectUrlsRef = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const targetYear = year ?? now.getFullYear();
  const targetMonth = month ?? now.getMonth() + 1;

  const selectedVariant = CARD_VARIANTS[activeIndex] ?? 1;

  useEffect(() => {
    setIsShareSupported(!!navigator.share);
  }, []);

  // 카드 프리뷰 이미지 선-패치 + 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(0);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      return;
    }

    const loadPreviews = async (): Promise<void> => {
      const urls: Partial<Record<CalendarCardVariant, string>> = {};
      const blobs: Partial<Record<CalendarCardVariant, Blob>> = {};

      await Promise.all(
        CARD_VARIANTS.map(async (variant) => {
          try {
            const blob = await fetchCalendarCardImage(targetYear, targetMonth, variant);
            const url = URL.createObjectURL(blob);
            objectUrlsRef.current.push(url);
            urls[variant] = url;
            blobs[variant] = blob;
          } catch {
            // 프리뷰 실패 시 placeholder 유지
          }
        }),
      );

      blobCacheRef.current = blobs;
      setPreviewUrls(urls);
    };

    loadPreviews();

    return () => {
      for (const url of objectUrlsRef.current) {
        URL.revokeObjectURL(url);
      }
      objectUrlsRef.current = [];
      blobCacheRef.current = {};
      setPreviewUrls({});
    };
  }, [isOpen, targetYear, targetMonth]);

  const handleScroll = useCallback((): void => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / (CARD_WIDTH + CARD_GAP));
    setActiveIndex(Math.min(index, CARD_VARIANTS.length - 1));
  }, []);

  // 모바일(iOS/Android): Web Share API로 이미지 공유
  const handleShare = async (variant?: CalendarCardVariant): Promise<void> => {
    if (!isShareSupported || isSharing) return;

    const targetVariant = variant ?? selectedVariant;
    setIsSharing(true);
    try {
      let blob = blobCacheRef.current[targetVariant];
      if (!blob) {
        blob = await fetchCalendarCardImage(targetYear, targetMonth, targetVariant);
      }

      const file = new File([blob], "calendar-share.png", { type: "image/png" });
      if (!navigator.canShare?.({ files: [file] })) {
        alert("이 기기에서는 이미지 공유를 지원하지 않아요.");
        return;
      }
      await navigator.share({ files: [file] });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      alert("공유에 실패했어요. 다시 시도해주세요.");
    } finally {
      setIsSharing(false);
    }
  };

  // PC 전용: 클립보드에 이미지 복사
  const handleCopyImage = async (): Promise<void> => {
    if (isCopying) return;
    setIsCopying(true);
    try {
      let blob = blobCacheRef.current[selectedVariant];
      if (!blob) {
        blob = await fetchCalendarCardImage(targetYear, targetMonth, selectedVariant);
      }
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    } catch {
      alert("이미지 복사에 실패했어요.");
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent
        className={cn(
          "data-[vaul-drawer-direction=bottom]:max-h-[90vh]",
          isShareSupported && "pb-[50vh]",
        )}
      >
        {/* data-vaul-no-drag: vaul의 수직 드래그 감지가 수평 스크롤을 가로채지 않도록 */}
        {/* h-95 + shrink-0: flex 레이아웃에서 카드 높이(380px)가 눌려 이미지가 잘리지 않도록 고정 */}
        <div
          ref={scrollRef}
          data-vaul-no-drag
          className="mt-4 h-95 shrink-0 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: CARD_SIDE_OFFSET }}
          onScroll={handleScroll}
        >
          <div
            className="flex h-full"
            style={{ paddingLeft: CARD_SIDE_OFFSET, paddingRight: CARD_SIDE_OFFSET, gap: CARD_GAP }}
          >
            {CARD_VARIANTS.map((variant) => {
              const previewUrl = previewUrls[variant];
              return (
                <button
                  key={variant}
                  type="button"
                  disabled={isSharing}
                  onClick={() => handleShare(variant)}
                  className="h-full w-68.75 shrink-0 snap-start overflow-hidden rounded-2xl bg-muted"
                >
                  {previewUrl ? (
                    // biome-ignore lint/performance/noImgElement: blob URL은 next/image에서 지원하지 않음
                    <img
                      src={previewUrl}
                      alt={`캘린더 공유 카드 ${variant}`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full animate-pulse bg-gray-100" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2.25 py-4">
          {CARD_VARIANTS.map((variant, index) => (
            <div
              key={variant}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                activeIndex === index ? "bg-gray-700" : "bg-gray-200",
              )}
            />
          ))}
        </div>

        {/* PC 전용: 클립보드 복사 버튼 (Web Share API 미지원 환경) */}
        {!isShareSupported && (
          <NewButton
            label={isCopying ? "복사 중..." : "이미지 복사"}
            disabled={isCopying}
            onClick={handleCopyImage}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};
