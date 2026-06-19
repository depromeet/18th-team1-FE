"use client";

import { useReportRouteContext } from "@/entities/report";
import { useUserProfileQuery } from "@/entities/user";

export const useReportShare = () => {
  const { year, month, userId: sharedUserId, isSharedView } = useReportRouteContext();
  const { data: userProfile } = useUserProfileQuery(!isSharedView);

  const ownerId = isSharedView ? sharedUserId : userProfile?.id;

  const handleShare = async () => {
    if (!navigator.share) {
      alert("이 브라우저에서는 공유 기능을 지원하지 않아요.");
      return;
    }

    if (ownerId === undefined) {
      alert("공유 정보를 불러오는 중이에요. 잠시 후 다시 시도해주세요.");
      return;
    }

    const url = `${window.location.origin}/report?year=${year}&month=${month}&userId=${ownerId}`;

    try {
      await navigator.share({ title: "월말결산", url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      alert("공유에 실패했어요. 다시 시도해주세요.");
    }
  };

  return { handleShare };
};
