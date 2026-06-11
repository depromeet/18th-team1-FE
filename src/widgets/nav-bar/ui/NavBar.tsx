"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { IcCalendar, IcHome } from "@/shared/ui/icons";

const NAV_ITEMS = [
  { href: "/", label: "홈", icon: IcHome },
  { href: "/calendar", label: "캘린더", icon: IcCalendar },
] as const;

const HIDE_DELAY_MS = 300;

export const NavBar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsVisible(true), HIDE_DELAY_MS);
    };

    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll, { capture: true });
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <nav
      className={`flex flex-col items-start rounded-[50px] bg-gray-600 p-1 shadow-[0px_0px_3px_rgba(0,0,0,0.05)] transition-[transform,opacity] duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center rounded-full px-6 py-2 ${isActive ? "bg-gray-100" : ""}`}
            >
              <div className="flex flex-col items-center">
                <Icon
                  size={24}
                  className={isActive ? "text-gray-600" : "text-gray-300"}
                  variant={isActive ? "default" : "line"}
                />
                <span
                  className={`text-[0.625rem] tracking-[-0.02em] ${
                    isActive ? "font-semibold text-gray-600" : "font-medium text-gray-300"
                  }`}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
