"use client";

import { useRouter } from "next/navigation";

import { useUserProfileQuery } from "@/entities/user";
import { MyProfileSection } from "@/features/my-profile";
import { ScrapSentenceSection } from "@/features/scrap-list";

export const MyPageView = () => {
  const router = useRouter();
  const { data: profile } = useUserProfileQuery();

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
      <MyProfileSection
        profile={profile}
        onEditNickname={() => router.push("/my-page/nickname-edit")}
      />
      <div className="h-px bg-gray-50" />
      <ScrapSentenceSection />
    </div>
  );
};
