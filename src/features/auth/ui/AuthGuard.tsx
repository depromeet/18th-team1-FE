"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReactNode, Suspense, useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth/useAuthStore";

import { fetchDevToken, refreshAccessToken } from "../api/authApi";

// /login으로 시작하는 경로는 인증 없이 접근 허용 (/login/callback 포함)
const PUBLIC_PATHS = ["/login", "/secret-login"];

// 공유된 월말결산(/report?year=...&month=...&userId=...)은 토큰 없이 접근 허용
const SHARED_REPORT_PATH = "/report";

const LoadingFallback = () => (
  <div className="flex min-h-dvh items-center justify-center">
    <p className="body1 text-muted-foreground">로딩 중...</p>
  </div>
);

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuardInner = ({ children }: AuthGuardProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
    const isSharedReportPath = pathname === SHARED_REPORT_PATH && searchParams.has("userId");

    // 공개 경로는 인증 체크 없이 렌더링
    if (isPublicPath || isSharedReportPath) {
      setIsReady(true);
      return;
    }

    // 이미 토큰 보유 중이면 즉시 렌더링 (페이지 간 이동 시 로딩 없음)
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      setIsReady(true);
      return;
    }

    // 토큰 없으면 토큰 발급 시도, 실패 시 로그인 페이지로 이동
    setIsReady(false);

    const initToken = async () => {
      // 개발 모드에서는 dev-token으로 임시 토큰 발급 시도
      if (process.env.NODE_ENV === "development") {
        try {
          const { accessToken: devToken } = await fetchDevToken();
          setAuth(devToken);
          setIsReady(true);
          return;
        } catch {
          // dev-token 실패 시 일반 refresh 흐름으로 계속
        }
      }

      refreshAccessToken()
        .then(({ accessToken: newToken }) => {
          setAuth(newToken);
          setIsReady(true);
        })
        .catch(() => {
          clearAuth();
          router.replace("/login");
        });
    };

    initToken();
  }, [pathname, searchParams, router, setAuth, clearAuth]);

  if (!isReady) {
    return <LoadingFallback />;
  }

  return <>{children}</>;
};

export const AuthGuard = ({ children }: AuthGuardProps) => (
  <Suspense fallback={<LoadingFallback />}>
    <AuthGuardInner>{children}</AuthGuardInner>
  </Suspense>
);
