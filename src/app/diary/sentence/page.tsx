"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { SentenceErrorBoundary, SentenceLoadingView } from "@/features/sentence-select";

const SentenceDetailView = dynamic(
  () => import("@/features/sentence-select").then((m) => ({ default: m.SentenceDetailView })),
  { ssr: false },
);

const SentencePage = (): React.ReactElement => (
  <SentenceErrorBoundary>
    <Suspense fallback={<SentenceLoadingView />}>
      <SentenceDetailView />
    </Suspense>
  </SentenceErrorBoundary>
);

export default SentencePage;
