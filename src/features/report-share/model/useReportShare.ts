"use client";

export const useReportShare = () => {
  const handleShare = async () => {
    if (!navigator.share) {
      alert("이 브라우저에서는 공유 기능을 지원하지 않아요.");
      return;
    }

    try {
      await navigator.share({ title: "월말결산", url: window.location.href });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      alert("공유에 실패했어요. 다시 시도해주세요.");
    }
  };

  return { handleShare };
};
