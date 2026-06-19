"use client";

import { type UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { UpdateProfileRequest, UserProfile } from "../model/user.types";
import { deleteUserAccount, fetchUserProfile, updateUserProfile } from "./userApi";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export const useUserProfileQuery = (enabled = true): UseQueryResult<UserProfile> =>
  useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchUserProfile,
    staleTime: 10 * 60 * 1000,
    enabled,
  });

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProfileRequest) => updateUserProfile(body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: userKeys.me() }),
  });
};

export const useDeleteAccountMutation = () => useMutation({ mutationFn: deleteUserAccount });
