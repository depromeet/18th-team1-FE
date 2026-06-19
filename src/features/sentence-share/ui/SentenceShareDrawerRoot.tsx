"use client";

import { useSentenceShareDrawerStore } from "@/store/sentence-share/useSentenceShareDrawerStore";

import { SentenceShareCardDrawer } from "./SentenceShareCardDrawer";

export const SentenceShareDrawerRoot = (): React.ReactElement => {
  const { isOpen, data, close } = useSentenceShareDrawerStore();

  return (
    <SentenceShareCardDrawer
      isOpen={isOpen}
      shareType={data.shareType}
      date={data.date}
      sentencePickData={data.sentencePickData}
      onClose={close}
    />
  );
};
