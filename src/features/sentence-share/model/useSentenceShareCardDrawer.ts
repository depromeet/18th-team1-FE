import type { SentenceShareDrawerData } from "@/store/sentence-share/useSentenceShareDrawerStore";
import { useSentenceShareDrawerStore } from "@/store/sentence-share/useSentenceShareDrawerStore";

export const useSentenceShareCardDrawer = () => {
  const { open } = useSentenceShareDrawerStore();
  return { openSentenceShareCardDrawer: open };
};

export type { SentenceShareDrawerData };
