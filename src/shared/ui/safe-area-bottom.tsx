import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface SafeAreaBottomProps {
  children?: ReactNode;
  className?: string;
}

export const SafeAreaBottom = ({ children, className }: SafeAreaBottomProps) => (
  <div className={cn(className)} style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
    {children}
  </div>
);
