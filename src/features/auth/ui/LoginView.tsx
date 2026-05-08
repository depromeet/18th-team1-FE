"use client";

import { Button } from "@/shared/ui/button";
import { IcGoogle, IcKakao } from "@/shared/ui/icons";
import { Logo } from "@/shared/ui/logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { redirectToGoogleLogin, redirectToKakaoLogin } from "../api/authApi";
import { saveLastLoginProvider, useLastLoginProvider } from "../model/useLastLoginProvider";

export const LoginView = (): React.ReactElement => {
  const lastLoginProvider = useLastLoginProvider();

  const handleKakaoLogin = (): void => {
    saveLastLoginProvider("kakao");
    redirectToKakaoLogin();
  };

  const handleGoogleLogin = (): void => {
    saveLastLoginProvider("google");
    redirectToGoogleLogin();
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-between px-5 py-10.5 bg-gray-0">
      <div className="flex flex-1 items-center justify-center">
        <Logo width={125} height={43} />
      </div>

      <TooltipProvider>
        <div className="flex w-full flex-col gap-4">
          <Tooltip open={lastLoginProvider === "kakao"}>
            <TooltipTrigger asChild>
              <Button
                icon={<IcKakao size={20} />}
                label="카카오 계정으로 시작하기"
                className="gap-2.5 rounded-2xl bg-[#FEE500] text-gray-700"
                onClick={handleKakaoLogin}
              />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="caption1 rounded-xl bg-gray-600 text-gray-0"
              arrowClassName="fill-gray-600"
            >
              최근 로그인
            </TooltipContent>
          </Tooltip>

          <Tooltip open={lastLoginProvider === "google"}>
            <TooltipTrigger asChild>
              <Button
                icon={<IcGoogle size={18} />}
                label="구글 계정으로 시작하기"
                className="gap-2.5 rounded-2xl bg-background text-gray-700 border-gray-100 border"
                onClick={handleGoogleLogin}
              />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="caption1 rounded-xl bg-gray-600 text-gray-0"
              arrowClassName="fill-gray-600"
            >
              최근 로그인
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};
