import { useMutation } from "@tanstack/react-query";

import { BASE_URL, httpClient } from "@/shared/api/http-client";
import { useAuthStore } from "@/store/auth/useAuthStore";

type RefreshResponse = {
  accessToken: string;
};

export const refreshAccessToken = (): Promise<RefreshResponse> =>
  httpClient.post<RefreshResponse>("/auth/refresh");

export const fetchDevToken = (): Promise<RefreshResponse> =>
  httpClient.get<RefreshResponse>("/auth/dev-token");

export const redirectToKakaoLogin = () => {
  window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
};

export const redirectToGoogleLogin = () => {
  window.location.href = `${BASE_URL}/oauth2/authorization/google`;
};

const logout = async (): Promise<void> => {
  const token = useAuthStore.getState().accessToken;
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
};

export const useLogoutMutation = () => useMutation({ mutationFn: logout });
