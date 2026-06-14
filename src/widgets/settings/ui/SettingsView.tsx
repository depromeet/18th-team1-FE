"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useUserProfileQuery } from "@/entities/user";
import { useLogoutMutation } from "@/features/auth";
import { ConfirmModal } from "@/shared/ui/confirm-modal";
import { IcProfileS } from "@/shared/ui/icons";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { Header } from "@/widgets/header";

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView = ({ onBack }: SettingsViewProps) => {
  const { data: profile } = useUserProfileQuery();
  const [imageError, setImageError] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();
  const { mutate: logoutMutate } = useLogoutMutation();

  const supportEmail = "sentitodayofficial@gmail.com";

  const handleEmailOpen = (subject: string) => {
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`;
  };

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSettled: () => {
        clearAuth();
        router.push("/login");
      },
    });
  };

  const handleWithdraw = () => {
    // TODO: 탈퇴 API 연동
    clearAuth();
    router.push("/login");
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex flex-col bg-muted md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2"
      style={{ height: "var(--vh, 100dvh)" }}
    >
      <Header title="설정" onBack={onBack} />
      <div className="flex flex-col gap-4 overflow-y-auto px-5 pt-[15px]">
        <div className="rounded-[20px] bg-background px-5 py-6">
          <div className="flex items-center gap-2.5">
            <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d1e9ea]">
              {profile?.profileImageUrl && !imageError ? (
                <Image
                  src={profile.profileImageUrl}
                  alt="프로필 이미지"
                  fill
                  sizes="40px"
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <IcProfileS width={15} height={19} className="text-key-primary" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="subhead4 text-gray-700">{profile?.nickname ?? ""}</p>
              <p className="body3 text-gray-700">
                {profile?.provider === "GOOGLE"
                  ? "구글 계정 회원"
                  : profile?.provider === "KAKAO"
                    ? "카카오 계정 회원"
                    : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[20px] bg-background px-5 py-6">
          <button
            type="button"
            onClick={() => setIsInquiryModalOpen(true)}
            className="body1 text-left text-gray-700"
          >
            문의하기
          </button>
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="body1 text-left text-gray-700"
          >
            저작권 침해 신고하기
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-[20px] bg-background px-5 py-6">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="body1 text-left text-gray-700"
          >
            로그아웃
          </button>
          <button
            type="button"
            onClick={() => setIsWithdrawModalOpen(true)}
            className="body1 text-left text-gray-700"
          >
            탈퇴하기
          </button>
        </div>

        <p className="caption3 text-center text-gray-600">현재 버전 1.0.0</p>
      </div>

      <ConfirmModal
        open={isInquiryModalOpen}
        onOpenChange={setIsInquiryModalOpen}
        description={
          <>
            {supportEmail}으로
            <br />
            문의해주세요
          </>
        }
        cancelLabel="취소"
        confirmLabel="이메일로 문의"
        onConfirm={() => handleEmailOpen("센티 문의")}
      />
      <ConfirmModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
        description={
          <>
            {supportEmail}으로
            <br />
            신고해주세요
          </>
        }
        cancelLabel="취소"
        confirmLabel="이메일로 신고"
        onConfirm={() => handleEmailOpen("저작권 침해 신고")}
      />
      <ConfirmModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        description="로그아웃 하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="로그아웃"
        onConfirm={handleLogout}
      />
      <ConfirmModal
        open={isWithdrawModalOpen}
        onOpenChange={setIsWithdrawModalOpen}
        description="센티를 탈퇴 하시겠습니까?"
        cancelLabel="취소"
        confirmLabel="탈퇴"
        onConfirm={handleWithdraw}
      />
    </div>
  );
};
