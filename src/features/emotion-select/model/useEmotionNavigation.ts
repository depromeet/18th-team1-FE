import { useRouter } from "next/navigation";

import { fetchTodayStatus } from "@/entities/sentence";
import { useToast } from "@/shared/hooks/useToast";
import {
  type LoadingQuote,
  useEmotionSelectStore,
} from "@/store/emotion-select/useEmotionSelectStore";

export const useEmotionNavigation = () => {
  const router = useRouter();
  const { setCurrentRecommendationId, setLoadingQuotes } = useEmotionSelectStore();
  const { toast } = useToast();

  const navigateToEmotion = async (loadingQuotes: LoadingQuote[] = []): Promise<void> => {
    let status: Awaited<ReturnType<typeof fetchTodayStatus>>;
    try {
      status = await fetchTodayStatus();
    } catch {
      toast("일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!status.canCreateTodayRecommendation && !status.hasOngoingRecommendation) {
      toast("오늘은 더 이상 문장을 추천받을 수 없어요.");
      return;
    }

    if (status.hasOngoingRecommendation && status.ongoingRecommendationId !== null) {
      setCurrentRecommendationId(status.ongoingRecommendationId);
      router.push("/sentence");
      return;
    }

    setLoadingQuotes(loadingQuotes);
    router.push("/emotion");
  };

  return { navigateToEmotion };
};
