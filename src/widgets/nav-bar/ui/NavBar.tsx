"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IcCalendar, IcDiscover, IcHome } from "@/shared/ui/icons";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: IcHome },
  { href: "/discover", label: "디스커버", icon: IcDiscover },
  { href: "/calendar", label: "캘린더", icon: IcCalendar },
] as const;

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-start rounded-[50px] bg-gray-600 p-1 shadow-[0px_0px_3px_rgba(0,0,0,0.05)]">
      <div className="flex items-center">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={`flex items-center justify-center rounded-full p-3 ${isActive ? "bg-gray-100" : ""}`}
            >
              <Icon
                size={24}
                className={isActive ? "text-gray-700" : "text-gray-300"}
                variant={isActive ? "default" : "line"}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
