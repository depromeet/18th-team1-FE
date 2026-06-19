"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { refreshAccessToken } from "@/features/auth";
import { useAuthStore } from "@/store/auth/useAuthStore";

const LoginCallbackPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    refreshAccessToken()
      .then(({ accessToken }) => {
        setAuth(accessToken);
        router.replace("/");
      })
      .catch(() => {
        clearAuth();
        router.replace("/login");
      });
  }, [router, setAuth, clearAuth]);

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <p className="body1 text-muted-foreground">로그인 중...</p>
    </div>
  );
};

export default LoginCallbackPage;
