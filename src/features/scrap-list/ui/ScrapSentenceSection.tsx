"use client";

import { useState } from "react";
import { IcClose, IcTrash } from "@/shared/ui/icons";
import { MOCK_SCRAP_ITEMS, type ScrapItem } from "../model/mock";
import { ScrapActionSheet } from "./ScrapActionSheet";
import { ScrapBookCard } from "./ScrapBookCard";
import { ScrapDeleteDialog } from "./ScrapDeleteDialog";

export const ScrapSentenceSection = () => {
  const items = MOCK_SCRAP_ITEMS;
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ScrapItem | null>(null);

  const handleEnterSelectMode = () => setIsSelectMode(true);

  const handleExitSelectMode = () => {
    setIsSelectMode(false);
    setSelectedIds(new Set());
  };

  const handleConfirmDelete = () => {
    setSelectedIds(new Set());
    setIsSelectMode(false);
    setIsDeleteDialogOpen(false);
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

  return (
    <section className="flex flex-1 flex-col overflow-hidden bg-background">
      {/* 헤더 */}
      <div className="flex shrink-0 items-center justify-between bg-background px-5 py-4.5">
        <span className="subhead1 text-gray-700">스크랩한 문장 {items.length}개</span>
        {isSelectMode ? (
          <button
            type="button"
            onClick={handleExitSelectMode}
            className="flex size-8.25 items-center justify-center rounded-full border border-gray-200 bg-background"
          >
            <IcClose size={13} className="text-gray-600" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleEnterSelectMode}
            className="rounded-full border border-gray-200 px-3 py-1.5"
          >
            <span className="body3 text-gray-500">선택하기</span>
          </button>
        )}
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="body3 text-gray-400">아직 스크랩한 문장이 없어요.</p>
          </div>
        ) : (
          <div className="flex justify-center gap-1.75 px-2.5 pb-4">
            <div className="flex min-w-0 flex-1 max-w-43.5 flex-col gap-2.5">
              {items
                .filter((_, index) => index % 2 === 0)
                .map((item) => (
                  <ScrapBookCard
                    key={item.id}
                    coverImageUrl={item.coverImageUrl}
                    quote={item.quote}
                    bookTitle={item.bookTitle}
                    author={item.author}
                    isSelected={selectedIds.has(item.id)}
                    onSelect={isSelectMode ? () => handleToggleSelect(item.id) : undefined}
                    onPress={!isSelectMode ? () => setActiveItem(item) : undefined}
                  />
                ))}
            </div>
            <div className="flex min-w-0 flex-1 max-w-43.5 flex-col gap-2.5">
              {items
                .filter((_, index) => index % 2 === 1)
                .map((item) => (
                  <ScrapBookCard
                    key={item.id}
                    coverImageUrl={item.coverImageUrl}
                    quote={item.quote}
                    bookTitle={item.bookTitle}
                    author={item.author}
                    isSelected={selectedIds.has(item.id)}
                    onSelect={isSelectMode ? () => handleToggleSelect(item.id) : undefined}
                    onPress={!isSelectMode ? () => setActiveItem(item) : undefined}
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {/* 하단 바 (선택 모드) */}
      {isSelectMode && (
        <div className="flex shrink-0 items-center justify-between bg-background px-5 py-3.75 shadow-[0_-4px_15px_rgba(0,27,55,0.1)]">
          <span className="subhead1 text-gray-700">{selectedIds.size}개의 문장이 선택됨</span>
          <button
            type="button"
            className="relative -top-px"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <IcTrash size={24} className="text-gray-600" />
          </button>
        </div>
      )}
      <ScrapDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedCount={selectedIds.size}
        onConfirm={handleConfirmDelete}
      />
      <ScrapActionSheet
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) setActiveItem(null);
        }}
        quote={activeItem?.quote ?? ""}
        bookTitle={activeItem?.bookTitle ?? ""}
        author={activeItem?.author ?? ""}
        coverImageUrl={activeItem?.coverImageUrl}
      />
    </section>
  );
};
