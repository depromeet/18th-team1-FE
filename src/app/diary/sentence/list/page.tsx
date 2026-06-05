"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import { SentenceErrorBoundary, SentenceLoadingView } from "@/features/sentence-select";

const SentenceListView = dynamic(
  () => import("@/features/sentence-select").then((m) => ({ default: m.SentenceListView })),
  { ssr: false },
);

const SentenceListPage = () => (
  <SentenceErrorBoundary>
    <Suspense fallback={<SentenceLoadingView />}>
      <SentenceListView />
    </Suspense>
  </SentenceErrorBoundary>
);

export default SentenceListPage;
