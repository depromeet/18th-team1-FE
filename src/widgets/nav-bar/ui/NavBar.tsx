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
    <nav className="rounded-[50px] bg-gray-700 p-1">
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
