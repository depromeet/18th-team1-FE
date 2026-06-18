"use client";

import { useRouter } from "next/navigation";

import { useUserProfileQuery } from "@/entities/user";
import { MyProfileSection } from "@/features/my-profile";
import { ScrapSentenceSection } from "@/features/scrap-list";

export const MyPageView = () => {
  const router = useRouter();
  const { data: profile } = useUserProfileQuery();

  return (
    <div className="flex flex-col bg-gray-50">
      <MyProfileSection
        profile={profile}
        onEditNickname={() => router.push("/my-page/nickname-edit")}
      />
      <ScrapSentenceSection />
    </div>
  );
};
