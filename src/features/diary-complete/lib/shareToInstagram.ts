export interface DiaryShareMeta {
  imageUrl: string;
}

export const shareDiaryImage = async (meta: DiaryShareMeta): Promise<void> => {
  const response = await fetch(meta.imageUrl);
  const blob = await response.blob();
  const file = new File([blob], "diary-share.png", { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      throw error;
    }
  }
};
