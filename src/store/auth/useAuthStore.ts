import { create } from "zustand";
import { devtools } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  setAuth: (accessToken: string) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken:
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MDAyIiwiZXhwIjoxNzgxMDExODE2LCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgxMDEwOTE2LCJqdGkiOiI3MDA4NDhiMS1kMjQ2LTQ0MjktOGUxNS01NDQyZDg2NDdmZGEifQ.IAvqHUWV5dBDKWly6afcoTkQwCnGXoHdp7IJGZLExuM",
      setAuth: (accessToken: string) => {
        set({ accessToken }, false, "auth/setAuth");
      },
      clearAuth: () => {
        set({ accessToken: null }, false, "auth/clearAuth");
      },
    }),
    { name: "AuthStore" },
  ),
);
