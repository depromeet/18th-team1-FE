"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { SentenceErrorBoundary, SentenceLoadingView } from "@/features/sentence-select";

const SentenceView = dynamic(
  () => import("@/widgets/sentence-select").then((m) => ({ default: m.SentenceView })),
  { ssr: false },
);

const SentencePage = (): React.ReactElement => (
  <SentenceErrorBoundary>
    <Suspense fallback={<SentenceLoadingView />}>
      <SentenceView />
    </Suspense>
  </SentenceErrorBoundary>
);

export default SentencePage;
