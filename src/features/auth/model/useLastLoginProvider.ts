import { useEffect, useState } from "react";

export type LoginProvider = "kakao" | "google";

const STORAGE_KEY = "lastLoginProvider";

export const getLastLoginProvider = (): LoginProvider | null => {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "kakao" || value === "google" ? value : null;
};

export const saveLastLoginProvider = (provider: LoginProvider): void => {
  localStorage.setItem(STORAGE_KEY, provider);
};

// localStorage에서 마지막 로그인 수단을 읽어 반환
// SSR 환경에서 localStorage 접근을 피하기 위해 useEffect에서 초기화한다.
export const useLastLoginProvider = (): LoginProvider | null => {
  const [provider, setProvider] = useState<LoginProvider | null>(null);

  useEffect(() => {
    setProvider(getLastLoginProvider());
  }, []);

  return provider;
};
