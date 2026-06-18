"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ConfirmModal } from "@/shared/ui/confirm-modal";
import { IcClose, IcTrash } from "@/shared/ui/icons";

import { useBulkDeleteScrapsMutation, useScrappedQuotesQuery } from "../api/queries";
import type { ScrappedQuote } from "../model/scrap.types";
import { ScrapActionSheet } from "./ScrapActionSheet";
import { ScrapBookCard } from "./ScrapBookCard";

export const ScrapSentenceSection = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useScrappedQuotesQuery();
  const { mutateAsync: bulkDeleteAsync } = useBulkDeleteScrapsMutation();

  const items = data?.pages.flatMap((page) => page.quotes) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ScrappedQuote | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!sentinel || !scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: scrollContainer, threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleEnterSelectMode = () => setIsSelectMode(true);

  const handleExitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedIds(new Set());
  };

  const handleConfirmDelete = async () => {
    await bulkDeleteAsync([...selectedIds].map(Number));
    setSelectedIds(new Set());
    setIsSelectMode(false);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const [leftItems, rightItems] = useMemo(() => {
    const left: ScrappedQuote[] = [];
    const right: ScrappedQuote[] = [];
    items.forEach((item, index) => {
      if (index % 2 === 0) left.push(item);
      else right.push(item);
    });
    return [left, right] as const;
  }, [items]);

  return (
    <section className="flex flex-1 flex-col overflow-hidden bg-background">
      <div className="flex shrink-0 items-center justify-between bg-background px-5 py-4.5">
        <span className="subhead1 text-gray-700">스크랩한 문장 {totalCount}개</span>
        {isSelectMode ? (
          <button
            type="button"
            onClick={handleExitSelectMode}
            className="flex size-8.25 items-center justify-center rounded-full border border-gray-200 bg-background"
          >
            <IcClose size={13} className="text-gray-600" />
          </button>
        ) : totalCount > 0 ? (
          <button
            type="button"
            onClick={handleEnterSelectMode}
            className="rounded-full border border-gray-200 px-3 py-1.5"
          >
            <span className="body3 text-gray-500">선택하기</span>
          </button>
        ) : null}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="body3 text-gray-400">아직 스크랩한 문장이 없어요.</p>
          </div>
        ) : (
          <div className="flex justify-center gap-1.75 px-2.5 pb-4">
            {(
              [
                ["left", leftItems],
                ["right", rightItems],
              ] as const
            ).map(([side, columnItems]) => (
              <div key={side} className="flex min-w-0 flex-1 max-w-43.5 flex-col gap-2.5">
                {columnItems.map((item) => (
                  <ScrapBookCard
                    key={String(item.quoteId)}
                    coverImageUrl={item.bookCoverImageUrl}
                    quote={item.content}
                    bookTitle={item.title}
                    author={item.author}
                    isSelected={selectedIds.has(String(item.quoteId))}
                    onSelect={
                      isSelectMode ? () => handleToggleSelect(String(item.quoteId)) : undefined
                    }
                    onPress={!isSelectMode ? () => setActiveItem(item) : undefined}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        <div ref={sentinelRef} className="h-px" />
      </div>

      {isSelectMode && (
        <div className="flex shrink-0 items-center justify-between bg-background px-5 py-3.75 shadow-[0_-4px_15px_rgba(0,27,55,0.1)]">
          <span className="subhead1 text-gray-700">{selectedIds.size}개의 문장이 선택됨</span>
          <button
            type="button"
            className="relative -top-px"
            disabled={selectedIds.size === 0}
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <IcTrash size={24} className="text-gray-600" />
          </button>
        </div>
      )}

      <ConfirmModal
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description={
          <p>
            <span className="subhead3 text-gray-700">{selectedIds.size}개의 문장</span>을
            <br />
            스크랩 삭제할까요?
          </p>
        }
        cancelLabel="취소"
        confirmLabel="삭제"
        onConfirm={handleConfirmDelete}
      />
      <ScrapActionSheet
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) setActiveItem(null);
        }}
        quoteId={activeItem?.quoteId ?? 0}
        quote={activeItem?.content ?? ""}
        bookTitle={activeItem?.title ?? ""}
        author={activeItem?.author ?? ""}
        coverImageUrl={activeItem?.bookCoverImageUrl}
        bookPurchaseLink={activeItem?.bookPurchaseLink ?? ""}
      />
    </section>
  );
};
