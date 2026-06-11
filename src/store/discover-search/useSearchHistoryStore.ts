import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const MAX_HISTORY = 5;

type SearchHistoryState = {
  history: string[];
  addToHistory: (query: string) => void;
  removeFromHistory: (query: string) => void;
};

export const useSearchHistoryStore = create<SearchHistoryState>()(
  devtools(
    persist(
      (set) => ({
        history: [],
        addToHistory: (query: string) => {
          const trimmed = query.trim();
          if (!trimmed) return;
          set(
            (state) => ({
              history: [trimmed, ...state.history.filter((item) => item !== trimmed)].slice(
                0,
                MAX_HISTORY,
              ),
            }),
            false,
            "searchHistory/add",
          );
        },
        removeFromHistory: (query: string) => {
          set(
            (state) => ({ history: state.history.filter((item) => item !== query) }),
            false,
            "searchHistory/remove",
          );
        },
      }),
      {
        name: "discover_search_history",
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: "SearchHistoryStore" },
  ),
);
