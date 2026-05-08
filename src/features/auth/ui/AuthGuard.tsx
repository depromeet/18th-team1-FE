"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth/useAuthStore";

import { refreshAccessToken } from "../api/authApi";

// /login으로 시작하는 경로는 인증 없이 접근 허용 (/login/callback 포함)
const PUBLIC_PATHS = ["/login"];

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps): React.ReactElement => {
  const pathname = usePathname();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

    // 공개 경로는 인증 체크 없이 렌더링
    if (isPublicPath) {
      setIsReady(true);
      return;
    }

    // 이미 토큰 보유 중이면 즉시 렌더링 (페이지 간 이동 시 로딩 없음)
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      setIsReady(true);
      return;
    }

    // 토큰 없으면 httpOnly 쿠키로 재발급 시도, 실패 시 로그인 페이지로 이동
    setIsReady(false);
    refreshAccessToken()
      .then(({ accessToken: newToken }) => {
        setAuth(newToken);
        setIsReady(true);
      })
      .catch(() => {
        clearAuth();
        router.replace("/login");
      });
  }, [pathname, router, setAuth, clearAuth]);

  if (!isReady) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="body1 text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  return <>{children}</>;
};
