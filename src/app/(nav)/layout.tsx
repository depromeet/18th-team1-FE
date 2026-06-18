import type { ReactNode } from "react";

import { NavBar } from "@/widgets/nav-bar";
import { HomeBannerModalPortal } from "./HomeBannerModalPortal";

interface NavLayoutProps {
  children: ReactNode;
}

const NavLayout = ({ children }: NavLayoutProps) => {
  return (
    <div className="relative flex h-full flex-col">
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      <div className="pointer-events-none fixed bottom-0 left-1/2 z-10 h-30 w-full -translate-x-1/2 bg-gradient-to-t from-background to-transparent md:max-w-93.75" />
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
        <NavBar />
      </div>
      <HomeBannerModalPortal />
    </div>
  );
};

export default NavLayout;
