"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { type ReactNode, Suspense, useEffect } from "react";

type PosthogProviderProps = {
  children: ReactNode;
};

const PosthogPageview = (): null => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const url = window.origin + pathname + (query ? `?${query}` : "");
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
};

export const PosthogProvider = ({ children }: PosthogProviderProps): React.ReactElement => {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always",
      capture_pageview: false,
      enable_heatmaps: true,
      session_recording: {
        maskAllInputs: true,
      },
    });
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PosthogPageview />
      </Suspense>
      {children}
    </PostHogProvider>
  );
};
