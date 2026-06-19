"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserProfileQuery } from "@/entities/user";
import { IcProfileDefault } from "@/shared/ui/icons";

export const CalendarHeader = () => {
  const router = useRouter();
  const { data: profile } = useUserProfileQuery();

  return (
    <header className="h-15 flex items-center justify-between px-5">
      <span className="title3 text-gray-700">캘린더</span>
      <button
        type="button"
        onClick={() => router.push("/my-page")}
        aria-label="마이페이지로 이동"
        className="relative flex items-center justify-center size-10 shrink-0 overflow-hidden rounded-full bg-[#d1e9ea]"
      >
        {profile?.profileImageUrl ? (
          <Image
            src={profile.profileImageUrl}
            alt="프로필 이미지"
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <IcProfileDefault size={40} />
        )}
      </button>
    </header>
  );
};
