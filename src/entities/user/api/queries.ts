"use client";

import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import type { UserProfile } from "../model/user.types";
import { fetchUserProfile } from "./userApi";

export const userKeys = {
  all: ["user"] as const,
  me: () => [...userKeys.all, "me"] as const,
};

export const useUserProfileQuery = (): UseQueryResult<UserProfile> =>
  useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchUserProfile,
    staleTime: 10 * 60 * 1000,
  });
