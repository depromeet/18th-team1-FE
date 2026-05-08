"use client";

import { type UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEmotionValue } from "@/features/diary-emotion";
import { fetchPresignedUrl, uploadImageToGcs } from "@/shared/api/image-upload";
import {
  loadRecommendationParams,
  useDiaryEmotionStore,
} from "@/store/diary-emotion/useDiaryEmotionStore";

import { fetchCreateDiary } from "./diaryWriteApi";

interface CreateDiaryInput {
  quoteId: number;
  content: string | null;
  photoFile: File | null;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

const isAllowedImageType = (type: string): type is AllowedImageType =>
  (ALLOWED_IMAGE_TYPES as readonly string[]).includes(type);

export const useCreateDiaryMutation = (): UseMutationResult<number, Error, CreateDiaryInput> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quoteId, content, photoFile }: CreateDiaryInput): Promise<number> => {
      const { selectedEmotionId, selectedSituationIds, selectedQuote } =
        useDiaryEmotionStore.getState();

      const emotionValue = getEmotionValue(selectedEmotionId);

      const savedParams = loadRecommendationParams();
      const resolvedSituationIds =
        selectedSituationIds.length > 0 ? selectedSituationIds : (savedParams?.emotionTagIds ?? []);
      const tagIds: number[] = resolvedSituationIds.map((id) => Number(id));

      let imageIds: number[] = [];
      if (photoFile) {
        if (!isAllowedImageType(photoFile.type)) {
          throw new Error("지원하지 않는 이미지 형식이에요. JPEG, PNG, WEBP 파일을 사용해주세요.");
        }
        const { presignedUrl, imageId } = await fetchPresignedUrl({
          type: "DIARY",
          contentType: photoFile.type,
        });
        await uploadImageToGcs(presignedUrl, photoFile);
        imageIds = [imageId];
      }

      const { diaryId } = await fetchCreateDiary({
        emotionValue,
        tagIds,
        dailyRecommendationId: selectedQuote?.dailyRecommendationId ?? 0,
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
