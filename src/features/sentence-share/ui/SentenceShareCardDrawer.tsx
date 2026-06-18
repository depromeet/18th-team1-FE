"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";

import { Drawer, DrawerContent, DrawerTitle } from "@/shared/ui/drawer";
import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

import type { SentenceCardVariant } from "../api/sentenceShareApi";
import { fetchSentenceCardImage } from "../api/sentenceShareApi";

const CARD_VARIANTS: SentenceCardVariant[] = [1, 2, 3];
const CARD_WIDTH = 275;
const CARD_GAP = 12;
const CARD_CENTER_OFFSET = `calc(50% - ${CARD_WIDTH / 2}px)`;

interface SentenceShareCardDrawerProps {
  isOpen: boolean;
  shareType?: "today-sentence" | "sentence-pick";
  date?: string;
  sentencePickData?: { quote: string; title: string; author: string };
  onClose: () => void;
}

export const SentenceShareCardDrawer = ({
  isOpen,
  shareType = "today-sentence",
  date,
  sentencePickData,
  onClose,
}: SentenceShareCardDrawerProps): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewUrls, setPreviewUrls] = useState<Partial<Record<SentenceCardVariant, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const blobCacheRef = useRef<Partial<Record<SentenceCardVariant, Blob>>>({});
  const objectUrlsRef = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  // setState 대신 ref 사용: 공유 시트가 열린 상태에서 리렌더가 발생하면 iOS Safari가 시트를 닫아버림
  const isSharingRef = useRef(false);
  const { selectedQuote } = useEmotionSelectStore();

  const selectedVariant = CARD_VARIANTS[activeIndex] ?? 1;

  // 카드 프리뷰 이미지 선-패치 + 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(0);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      return;
    }

    const params =
      shareType === "sentence-pick" && date && sentencePickData
        ? {
            createdAt: date,
            quote: sentencePickData.quote,
            title: sentencePickData.title,
            author: sentencePickData.author,
          }
        : selectedQuote
          ? {
              createdAt: format(new Date(), "yyyy-MM-dd"),
              quote: selectedQuote.content,
              title: selectedQuote.title,
              author: selectedQuote.author,
            }
          : null;

    if (!params) return;

    const loadPreviews = async (): Promise<void> => {
      setIsLoading(true);
      const urls: Partial<Record<SentenceCardVariant, string>> = {};
      const blobs: Partial<Record<SentenceCardVariant, Blob>> = {};

      await Promise.all(
        CARD_VARIANTS.map(async (variant) => {
          try {
            const blob = await fetchSentenceCardImage({ variant, ...params });
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
  }, [isOpen, shareType, date, sentencePickData, selectedQuote]);

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

    const file = new File([blob], "sentence-share.png", { type: "image/png" });
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
        const params =
          shareType === "sentence-pick" && date && sentencePickData
            ? {
                createdAt: date,
                quote: sentencePickData.quote,
                title: sentencePickData.title,
                author: sentencePickData.author,
              }
            : selectedQuote
              ? {
                  createdAt: format(new Date(), "yyyy-MM-dd"),
                  quote: selectedQuote.content,
                  title: selectedQuote.title,
                  author: selectedQuote.author,
                }
              : null;
        if (!params) return;
        blob = await fetchSentenceCardImage({ variant: selectedVariant, ...params });
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sentence-share.png";
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
        {/*
          h-95 + shrink-0: DrawerContent flex 레이아웃에서 카드 높이(380px)가
          눌려 이미지가 잘리지 않도록 고정. overflow-x-auto는 암묵적으로
          overflow-y: auto를 유발하므로 명시적 높이가 필요함.
        */}
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
                      alt={`공유 카드 ${variant}`}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className={cn("size-full bg-gray-100", isLoading && "animate-pulse")} />
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

        <div className="flex gap-3 px-5 pb-6">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-medium"
          >
            더보기
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={() => void handleSaveImage()}
            className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
