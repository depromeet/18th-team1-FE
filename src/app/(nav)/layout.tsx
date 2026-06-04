import type { ReactNode } from "react";

import { NavBar } from "@/widgets/nav-bar";

interface NavLayoutProps {
  children: ReactNode;
}

const NavLayout = ({ children }: NavLayoutProps) => {
  return (
    <div className="relative flex h-full flex-col">
      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <NavBar />
      </div>
    </div>
  );
};

export default NavLayout;
