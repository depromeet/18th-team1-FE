import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteDiary, fetchDiaries, fetchDiaryDetail } from "./diaryApi";

export const diaryKeys = {
  all: ["diaries"] as const,
  lists: () => [...diaryKeys.all, "list"] as const,
  list: (start: string, end: string) => [...diaryKeys.lists(), { start, end }] as const,
  details: () => [...diaryKeys.all, "detail"] as const,
  detail: (id: number) => [...diaryKeys.details(), id] as const,
};

export const useDiariesQuery = (start: string, end: string, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: diaryKeys.list(start, end),
    queryFn: () => fetchDiaries(start, end),
    enabled: options?.enabled ?? true,
  });

export const useDiaryDetailQuery = (id: number) =>
  useQuery({
    queryKey: diaryKeys.detail(id),
    queryFn: () => fetchDiaryDetail(id),
    enabled: id > 0,
  });

export const useDeleteDiaryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recommendationId: number) => deleteDiary(recommendationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: diaryKeys.all });
    },
  });
};
