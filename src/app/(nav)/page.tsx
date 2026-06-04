"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui/logo";
import { HomeDiarySection } from "@/widgets/home";

const RANDOM_BANNER_HEIGHT = 289; // h-72.25
const ACCENT_BAR_HEIGHT = 6; // h-1.5
const HOME_BANNER_HEIGHT = 126; // h-31.5
const BANNER_SCROLL_THRESHOLD = RANDOM_BANNER_HEIGHT + ACCENT_BAR_HEIGHT + HOME_BANNER_HEIGHT;

const HomePage = (): React.ReactElement => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPastBanner, setIsPastBanner] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = (): void => {
      setIsPastBanner(el.scrollTop >= BANNER_SCROLL_THRESHOLD);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-gray-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        <header
          className={cn(
            "sticky top-0 z-10 flex items-center px-5 py-4.75",
            isPastBanner ? "bg-key-secondary2" : "bg-gray-100",
          )}
        >
          <Logo
            className={cn(
              "transition-colors duration-300",
              isPastBanner ? "text-key-secondary-0-1" : "text-key-secondary2",
            )}
          />
        </header>
        <HomeDiarySection />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-35 bg-linear-to-b from-transparent to-white" />
    </div>
  );
};

export default HomePage;
