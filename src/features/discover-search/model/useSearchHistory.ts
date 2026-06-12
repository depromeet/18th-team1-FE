import { useSearchHistoryStore } from "@/store/discover-search/useSearchHistoryStore";

export const useSearchHistory = () => {
  const { history, addToHistory, removeFromHistory } = useSearchHistoryStore();
  return { history, addToHistory, removeFromHistory };
};
