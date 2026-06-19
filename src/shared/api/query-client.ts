import { QueryClient } from "@tanstack/react-query";

import { ApiError } from "./error";

/**
 * 브라우저/서버 간 공유 가능한 QueryClient 싱글톤을 생성한다.
 * Next.js App Router 환경에서는 요청마다 새로운 클라이언트가 필요하므로
 * 이 팩토리를 통해 생성한다.
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        throwOnError: (error) => !(error instanceof ApiError) || error.status >= 500,
      },
      mutations: {
        retry: 0,
      },
    },
  });
};
