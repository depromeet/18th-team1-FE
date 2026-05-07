"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { IcCameraAdd, IcTrash } from "@/shared/ui/icons";

interface PhotoBarProps {
  photoUrl: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAdd: () => void;
  onDelete: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoBar = ({
  photoUrl,
  inputRef,
  onAdd,
  onDelete,
  onFileChange,
}: PhotoBarProps): React.ReactElement => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(popupRef, () => setIsDeletePopupOpen(false), isDeletePopupOpen);

  const handlePhotoClick = (): void => {
    setIsDeletePopupOpen(true);
  };

  const handleDeleteAndClose = (): void => {
    onDelete();
    setIsDeletePopupOpen(false);
  };

  return (
    <div className="flex h-11 items-center rounded-full bg-key-secondary-0 pl-5 pr-1">
      <div className="relative flex items-center">
        {photoUrl ? (
          <button type="button" aria-label="사진 옵션" onClick={handlePhotoClick}>
            <Image
              src={photoUrl}
              alt="선택한 사진"
              width={30}
              height={30}
              className="size-7.5 rounded-sm object-cover"
              unoptimized
            />
          </button>
        ) : (
          <button type="button" aria-label="사진 추가" onClick={onAdd}>
            <IcCameraAdd size={30} className="text-gray-700" />
          </button>
        )}

        {isDeletePopupOpen && (
          <div
            ref={popupRef}
            className="absolute bottom-full left-2 z-20 mb-0 translate-y-3 flex w-36.5 flex-col items-start rounded-[20px] bg-white p-4 shadow-[0px_0px_15px_rgba(0,0,0,0.1)]"
          >
            <button
              type="button"
              className="flex items-center gap-2.5"
              onClick={handleDeleteAndClose}
            >
              <IcTrash size={20} className="text-destructive" />
              <span className="body2 text-destructive">삭제</span>
            </button>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
};
