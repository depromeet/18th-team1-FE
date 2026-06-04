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

// 동시에 여러 요청이 401을 받아도 refresh를 한 번만 호출하기 위한 싱글턴 Promise
let refreshingPromise: Promise<string> | null = null;

/**
 * 쿠키의 refresh token(httpOnly)으로 새 access token을 발급받는다.
 * 여러 요청이 동시에 호출해도 하나의 Promise를 공유해 중복 요청을 방지한다.
 */
const refreshAccessToken = async (): Promise<string> => {
  if (refreshingPromise) return refreshingPromise;

  refreshingPromise = fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include", // httpOnly 쿠키의 refresh token 자동 전송
  })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        throw new ApiError("UNAUTHORIZED", res.status, "Session expired");
      }
      if (!res.ok) {
        throw new ApiError(getErrorCode(res.status), res.status, `HTTP Error ${res.status}`);
      }
      return res.json() as Promise<{ accessToken: string }>;
    })
    .then(({ accessToken }) => {
      useAuthStore.getState().setAuth(accessToken);
      return accessToken;
    })
    .finally(() => {
      refreshingPromise = null;
    });

  return refreshingPromise;
};

const redirectToLogin = () => {
  useAuthStore.getState().clearAuth();
  if (typeof window !== "undefined") {
    window.location.replace("/login");
  }
};

/**
 * 모든 API 요청의 단일 진입점.
 *
 * 인증 흐름:
 * 1. Zustand store의 access token을 Authorization 헤더에 자동 주입
 * 2. 401 응답 시 refresh token으로 access token 갱신 후 원본 요청 1회 재시도
 * 3. 갱신 실패 시 store 초기화 후 로그인 페이지로 리다이렉트
 *
 * @param isRetry - true이면 401 재시도를 하지 않아 무한 루프를 방지
 */
const executeRawRequest = async (
  path: string,
  options: RequestOptions = {},
  isRetry = false,
): Promise<Response> => {
  const { body, token: explicitToken, headers, ...rest } = options;
  const token = explicitToken ?? useAuthStore.getState().accessToken;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (response.status === 401 && !isRetry) {
    try {
      const newToken = await refreshAccessToken();
      return executeRawRequest(path, { ...options, token: newToken }, true);
    } catch (error) {
      if (error instanceof ApiError && error.code === "UNAUTHORIZED") {
        redirectToLogin();
      }
      throw error;
    }
  }

  if (!response.ok) {
    const errorCode = getErrorCode(response.status);
    throw new ApiError(errorCode, response.status, `HTTP Error ${response.status}`);
  }

  return response;
};

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const response = await executeRawRequest(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  return response.json() as Promise<T>;
};

const requestBlob = async (path: string, options: RequestOptions = {}): Promise<Blob> => {
  const response = await executeRawRequest(path, options);
  return response.blob();
};

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions): Promise<T> =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>(path, { ...options, method: "POST", body }),

  getBlob: (path: string, options?: RequestOptions): Promise<Blob> =>
    requestBlob(path, { ...options, method: "GET" }),
};
