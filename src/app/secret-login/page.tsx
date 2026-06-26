"use client";

import { useRouter } from "next/navigation";

import { fetchTemporaryLoginToken, refreshAccessToken } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { useAuthStore } from "@/store/auth/useAuthStore";

const SecretLoginPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    await fetchTemporaryLoginToken();
    const { accessToken } = await refreshAccessToken();
    setAuth(accessToken);
    router.replace("/");
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-5">
      <Button label="로그인" onClick={handleLogin} />
    </div>
  );
};

export default SecretLoginPage;
