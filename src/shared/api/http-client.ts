import { useAuthStore } from "@/store/auth/useAuthStore";

import { ApiError, type ApiErrorCode } from "./error";

export const BASE_URL: string = `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api`;

const STATUS_TO_ERROR_CODE: Record<number, ApiErrorCode> = {
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  500: "INTERNAL_ERROR",
};

const getErrorCode = (status: number): ApiErrorCode =>
  STATUS_TO_ERROR_CODE[status] ?? "INTERNAL_ERROR";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string;
};

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { body, token: explicitToken, headers, ...rest } = options;
  const token = explicitToken ?? useAuthStore.getState().accessToken;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorCode = getErrorCode(response.status);
    throw new ApiError(errorCode, response.status, `HTTP Error ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>(path, { ...options, method: "POST", body }),
};
