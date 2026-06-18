"use client";

import type { GenreDto } from "@/entities/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { IcCheck } from "@/shared/ui/icons";

interface GenreFilterDropdownProps {
  genres: GenreDto[];
  selectedGenreId: number | undefined;
  onSelect: (genreId: number | undefined) => void;
}

export const GenreFilterDropdown = ({
  genres,
  selectedGenreId,
  onSelect,
}: GenreFilterDropdownProps): React.ReactElement => {
  const selectedLabel =
    selectedGenreId === undefined
      ? "전체"
      : (genres.find((g) => g.genreId === selectedGenreId)?.label ?? "전체");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded-lg border border-border bg-muted px-3 py-2 outline-none min-w-[127px]">
        <IcCheck size={16} className="shrink-0 text-gray-600" />
        <span className="caption1 text-gray-600">{selectedLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={-38} className="w-[180px] px-1 py-[10px]">
        <DropdownMenuLabel className="caption3 px-4 py-[7px] text-gray-300">
          책 장르별 보기
        </DropdownMenuLabel>
        {[{ label: "전체", genreId: undefined }, ...genres].map((genre) => {
          const isSelected = genre.genreId === selectedGenreId;
          return (
            <DropdownMenuItem
              key={genre.genreId ?? "all"}
              onSelect={() => onSelect(genre.genreId)}
              className={isSelected ? "min-h-11 gap-2 px-4 py-2" : "min-h-11 py-2 pl-12 pr-4"}
            >
              {isSelected && <IcCheck size={24} className="shrink-0 text-gray-600" />}
              <span className={isSelected ? "subhead3 text-gray-600" : "body1 text-gray-500"}>
                {genre.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
