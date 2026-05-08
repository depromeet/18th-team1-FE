"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface HomeRedirectProps {
  error?: Error | null;
}

export const HomeRedirect = ({ error }: HomeRedirectProps): null => {
  const router = useRouter();

  useEffect(() => {
    console.error("[문장 추천 실패] 홈으로 이동합니다.", error ?? "");
    router.replace("/");
  }, [router, error]);

  return null;
};
