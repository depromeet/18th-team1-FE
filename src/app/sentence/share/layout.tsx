"use client";

import type { ReactNode } from "react";

import { useViewportHeight } from "@/shared/hooks/useViewportHeight";

const SentenceShareLayout = ({ children }: { children: ReactNode }): React.ReactElement => {
  useViewportHeight();

  return (
    <div
      className="fixed inset-x-0 top-0 flex flex-col bg-muted md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2"
      style={{ height: "var(--vh, 100dvh)" }}
    >
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
};

export default SentenceShareLayout;
