"use client";

import { isServer, type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

import { createQueryClient } from "@/shared/api/query-client";
import { ToastContainer } from "@/shared/ui/toast";
import { PosthogProvider } from "./posthog-provider";

let browserQueryClient: QueryClient | undefined;

const getQueryClient = (): QueryClient => {
  if (isServer) {
    // 서버에서는 요청마다 새 클라이언트 생성
    return createQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
};

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const queryClient = getQueryClient();

  return (
    <PosthogProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
        <ToastContainer />
      </QueryClientProvider>
    </PosthogProvider>
  );
};
