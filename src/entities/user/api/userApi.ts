import { httpClient } from "@/shared/api/http-client";

import type { UserProfile } from "../model/user.types";

export const fetchUserProfile = (): Promise<UserProfile> =>
  httpClient.get<UserProfile>("/users/me");
