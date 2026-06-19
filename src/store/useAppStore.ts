import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * 전역 앱 상태 예시 스토어.
 * 실제 도메인 상태는 features/ 또는 entities/ 내부 스토어로 분리한다.
 */
type AppState = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      theme: "light",
      setTheme: (theme: AppState["theme"]) => {
        set({ theme }, false, "app/setTheme");
      },
      toggleTheme: () => {
        set(
          (state: AppState) => ({ theme: state.theme === "light" ? "dark" : "light" }),
          false,
          "app/toggleTheme",
        );
      },
    }),
    { name: "AppStore" },
  ),
);
