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
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5MDAyIiwiZXhwIjoxNzgxMzUwMDMyLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzgxMzQ5MTMyLCJqdGkiOiIyYjM5OGIxOS1hOTFiLTQ2N2QtODk1ZS04M2Y5YzU2MTEyNWYifQ.V9oo6qKQe7M3vCGQPCRfX-D1F528oH9_ql0rAOCDm-A",
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
