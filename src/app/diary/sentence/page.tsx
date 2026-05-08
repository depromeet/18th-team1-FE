"use client";

import { Suspense } from "react";

import {
  SentenceDetailView,
  SentenceErrorBoundary,
  SentenceLoadingView,
} from "@/features/sentence-select";

const SentencePage = (): React.ReactElement => (
  <SentenceErrorBoundary>
    <Suspense fallback={<SentenceLoadingView />}>
      <SentenceDetailView />
    </Suspense>
  </SentenceErrorBoundary>
);

export default SentencePage;
