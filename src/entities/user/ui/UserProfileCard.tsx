"use client";

import Image from "next/image";

import { IcProfileNone } from "@/shared/ui/icons";

import { useUserProfileQuery } from "../api/queries";

export const UserProfileCard = (): React.ReactElement => {
  const { data } = useUserProfileQuery();

  if (!data) {
    return <div className="mx-5 mt-2.5 h-18 rounded-(--radius) bg-gray-50 animate-pulse" />;
  }

  const { nickname, profileImageUrl } = data;

  return (
    <div className="flex items-center bg-gray-50 rounded-(--radius) px-2.5 py-4 gap-2.5 mx-5 mt-2.5">
      {profileImageUrl ? (
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={profileImageUrl}
            alt={`${nickname}의 프로필 이미지`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <IcProfileNone />
      )}
      <p className="subhead6 text-gray-700">{nickname}</p>
    </div>
  );
};
