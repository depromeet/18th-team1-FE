"use client";

import { type UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEmotionValue } from "@/features/diary-emotion";
import { fetchPresignedUrl, uploadImageToGcs } from "@/shared/api/image-upload";
import { useDiaryEmotionStore } from "@/store/diary-emotion/useDiaryEmotionStore";

import { fetchCreateDiary } from "./diaryWriteApi";

interface CreateDiaryInput {
  quoteId: number;
  content: string | null;
  photoFile: File | null;
}

export const useCreateDiaryMutation = (): UseMutationResult<number, Error, CreateDiaryInput> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quoteId, content, photoFile }: CreateDiaryInput): Promise<number> => {
      const { selectedEmotionId, selectedSituationIds, selectedQuote } =
        useDiaryEmotionStore.getState();

      const emotionIntensity = selectedEmotionId ? getEmotionValue(selectedEmotionId) : undefined;

      const tagIds = selectedSituationIds.map(Number);

      let imageIds: number[] | undefined;
      if (photoFile) {
        const contentType = photoFile.type as "image/jpeg" | "image/png" | "image/webp";
        const { presignedUrl, imageId } = await fetchPresignedUrl({
          type: "DIARY",
          contentType,
        });
        await uploadImageToGcs(presignedUrl, photoFile);
        imageIds = [imageId];
      }

      const { diaryId } = await fetchCreateDiary({
        emotionIntensity,
        tagIds: tagIds.length > 0 ? tagIds : undefined,
        dailyRecommendationId: selectedQuote?.dailyRecommendationId,
        quoteId,
        content,
        imageIds,
      });

      return diaryId;
    },
    onSuccess: (): void => {
      useDiaryEmotionStore.getState().reset();
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
};
