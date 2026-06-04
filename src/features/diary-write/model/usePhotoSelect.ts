"use client";

import { useEffect, useRef, useState } from "react";

interface UsePhotoSelectReturn {
  photoUrl: string | null;
  photoFile: File | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleClick: () => void;
  handleDelete: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const usePhotoSelect = (): UsePhotoSelectReturn => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const photoUrlRef = useRef<string | null>(null);

  useEffect(
    (): (() => void) => () => {
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    },
    [],
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleDelete = () => {
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    photoUrlRef.current = null;
    setPhotoUrl(null);
    setPhotoFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    const url = URL.createObjectURL(file);
    photoUrlRef.current = url;
    setPhotoUrl(url);
    setPhotoFile(file);
    e.target.value = "";
  };

  return {
    photoUrl,
    photoFile,
    inputRef,
    handleClick,
    handleDelete,
    handleFileChange,
  };
};
