"use client";

import Image from "next/image";
import { useState } from "react";

import type { UserProfile } from "@/entities/user";
import { IcProfileS } from "@/shared/ui/icons";

interface MyProfileSectionProps {
  profile: UserProfile | undefined;
  onEditNickname?: () => void;
}

export const MyProfileSection = ({ profile, onEditNickname }: MyProfileSectionProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="flex flex-col items-center gap-3 bg-gray-50 px-5 pb-5">
      <div className="flex flex-col items-center gap-1">
        <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d1e9ea]">
          {profile?.profileImageUrl && !imageError ? (
            <Image
              src={profile.profileImageUrl}
              alt="프로필 이미지"
              fill
              sizes="56px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <IcProfileS width={21} height={26} className="text-key-primary" />
          )}
        </div>
        <p className="head3 text-gray-600">{profile?.nickname ?? ""}</p>
      </div>
      <button
        type="button"
        onClick={onEditNickname}
        className="w-full rounded-lg bg-gray-100 py-2 text-center"
      >
        <span className="subhead4 text-gray-400">닉네임 수정하기</span>
      </button>
    </section>
  );
};
