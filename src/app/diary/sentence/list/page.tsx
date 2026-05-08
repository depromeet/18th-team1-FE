"use client";

import { Suspense } from "react";

import { SentenceListView, SentenceLoadingView } from "@/features/sentence-select";

const SentenceListPage = (): React.ReactElement => (
  <Suspense fallback={<SentenceLoadingView />}>
    <SentenceListView />
  </Suspense>
);

export default SentenceListPage;
