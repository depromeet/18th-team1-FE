import { httpClient } from "@/shared/api/http-client";

import type { UpdateProfileRequest, UserProfile } from "../model/user.types";

export const fetchUserProfile = (): Promise<UserProfile> =>
  httpClient.get<UserProfile>("/users/me");

export const updateUserProfile = (body: UpdateProfileRequest): Promise<UserProfile> =>
  httpClient.patch<UserProfile>("/users/me", body);

export const deleteUserAccount = (): Promise<void> => httpClient.delete("/users/me");
