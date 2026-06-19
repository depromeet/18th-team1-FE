"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Lottie from "lottie-react";
import { Download } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Drawer, DrawerContent, DrawerTitle } from "@/shared/ui/drawer";
import { IcShare3 } from "@/shared/ui/icons";
import skeletonAnimation from "../../../../public/lottie/card-skeleton.json";

import { fetchCalendarCardImage } from "../api/calendarShareApi";
import type { CalendarCardVariant } from "../model/calendar-share.types";

const CARD_VARIANTS: CalendarCardVariant[] = [1, 2];
const CARD_WIDTH = 275;
const CARD_GAP = 12;
const CARD_CENTER_OFFSET = `calc(50% - ${CARD_WIDTH / 2}px)`;

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<Partial<Record<CalendarCardVariant, string>>>({});
  const blobCacheRef = useRef<Partial<Record<CalendarCardVariant, Blob>>>({});
  const objectUrlsRef = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  // setState 대신 ref 사용: 공유 시트가 열린 상태에서 리렌더가 발생하면 iOS Safari가 시트를 닫아버림
  const isSharingRef = useRef(false);

  const now = new Date();
  const targetYear = year ?? now.getFullYear();
  const targetMonth = month ?? now.getMonth() + 1;

  const pathname = usePathname();
  const selectedVariant = CARD_VARIANTS[activeIndex] ?? 1;

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname 변경 시에만 실행
  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname]);

  // 카드 프리뷰 이미지 선-패치 + 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(0);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      return;
    }

    const loadPreviews = async (): Promise<void> => {
      setIsLoading(true);
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
      setIsLoading(false);
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

  // iOS Safari: navigator.share()는 사용자 제스처의 동기 콜스택 안에서 호출해야 함.
  // async/await를 쓰면 마이크로태스크 경계에서 사용자 활성화 컨텍스트가 끊길 수 있으므로
  // 동기 함수로 선언 후 .then()/.catch()로 처리한다.
  const handleShare = (): void => {
    if (isSharingRef.current) return;

    if (!navigator.share) {
      alert("이 브라우저에서는 공유 기능을 지원하지 않아요.");
      return;
    }

    const blob = blobCacheRef.current[selectedVariant];
    if (!blob) {
      alert("카드를 불러오는 중이에요. 잠시 후 다시 시도해주세요.");
      return;
    }

    const file = new File([blob], "calendar-share.png", { type: "image/png" });
    // canShare가 undefined인 경우(구형 브라우저) 공유 시도; 정의되어 있으면 지원 여부 확인
    if (navigator.canShare && !navigator.canShare({ files: [file] })) {
      alert("이 기기에서는 이미지 공유를 지원하지 않아요.");
      return;
    }

    isSharingRef.current = true;
    navigator
      .share({ files: [file] })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        alert("공유에 실패했어요. 다시 시도해주세요.");
      })
      .finally(() => {
        isSharingRef.current = false;
      });
  };

  const handleSaveImage = async (): Promise<void> => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      let blob = blobCacheRef.current[selectedVariant];
      if (!blob) {
        blob = await fetchCalendarCardImage(targetYear, targetMonth, selectedVariant);
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calendar-share.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("이미지 저장에 실패했어요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[90vh]">
        <VisuallyHidden.Root>
          <DrawerTitle>공유 카드 선택</DrawerTitle>
        </VisuallyHidden.Root>
        {/* data-vaul-no-drag: vaul의 수직 드래그 감지가 수평 스크롤을 가로채지 않도록 */}
        {/* h-95 + shrink-0: flex 레이아웃에서 카드 높이(380px)가 눌려 이미지가 잘리지 않도록 고정 */}
        <div
          ref={scrollRef}
          data-vaul-no-drag
          className="mt-4 h-95 shrink-0 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollPaddingLeft: CARD_CENTER_OFFSET }}
          onScroll={handleScroll}
        >
          <div className="flex h-full" style={{ paddingLeft: CARD_CENTER_OFFSET, gap: CARD_GAP }}>
            {CARD_VARIANTS.map((variant) => {
              const previewUrl = previewUrls[variant];
              return (
                <div
                  key={variant}
                  className="h-full w-68.75 shrink-0 snap-start overflow-hidden rounded-2xl bg-gray-50 px-11 py-5"
                >
                  {previewUrl ? (
                    // biome-ignore lint/performance/noImgElement: blob URL은 next/image에서 지원하지 않음
                    <img
                      src={previewUrl}
                      alt={`캘린더 공유 카드 ${variant}`}
                      className="size-full object-cover rounded-2xl"
                    />
                  ) : isLoading ? (
                    <Lottie animationData={skeletonAnimation} loop className="size-full" />
                  ) : (
                    <div className="size-full bg-gray-100 rounded-2xl" />
                  )}
                </div>
              );
            })}
            {/* overflow-x: auto 컨테이너에서 padding-right가 무시되는 브라우저 버그 우회 */}
            <div aria-hidden style={{ width: CARD_CENTER_OFFSET, flexShrink: 0 }} />
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

        <div className="flex flex-col gap-3.75 pb-15 w-full">
          <div className="flex items-center border-t border-gray-200 mx-5 py-3">
            <span className="subhead4 text-gray-700">공유하기</span>
          </div>
          <div className="flex gap-6.5 items-center justify-center">
            <div className="flex flex-col gap-1.25 items-center">
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveImage}
                className="flex items-center justify-center size-15 rounded-xl bg-gray-100 disabled:opacity-50"
              >
                <Download size={24} className="text-gray-500" />
              </button>
              <span className="caption2 text-gray-600">다운로드</span>
            </div>
            <div className="flex flex-col gap-1.25 items-center">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center justify-center size-15 rounded-xl bg-gray-600"
              >
                <IcShare3 size={32} className="text-white" />
              </button>
              <span className="caption1 text-gray-600">더보기</span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
