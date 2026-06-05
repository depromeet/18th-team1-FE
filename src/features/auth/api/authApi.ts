import { BASE_URL, httpClient } from "@/shared/api/http-client";

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
