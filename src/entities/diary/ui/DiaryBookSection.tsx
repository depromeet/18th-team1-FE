"use client";

import Image from "next/image";
import { IcLink } from "@/shared/ui/icons";

interface DiaryBookSectionProps {
  title: string;
  author: string;
  coverImageUrl: string;
  aladinLink?: string;
}

export const DiaryBookSection = ({
  title,
  author,
  coverImageUrl,
  aladinLink,
}: DiaryBookSectionProps): React.ReactElement => {
  const handleLinkOpen = () => {
    window.open(aladinLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex gap-3 rounded-md bg-muted p-3">
      <div className="relative h-29 w-18.5 shrink-0 overflow-hidden rounded-[4px]">
        {coverImageUrl && (
          <Image alt={title} src={coverImageUrl} fill sizes="74px" className="object-cover" />
        )}
      </div>
      <div className="flex flex-col justify-center gap-3">
        <div className="flex flex-col gap-1">
          <p className="subhead4 text-gray-700">{title}</p>
          <p className="caption2 text-gray-600">{author}</p>
        </div>
        {aladinLink && (
          <button
            type="button"
            onClick={handleLinkOpen}
            className="flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-3 py-2"
          >
            <IcLink size={16} className="text-gray-400" />
            <span className="caption2 text-gray-500">책 링크</span>
          </button>
        )}
      </div>
    </div>
  );
};
