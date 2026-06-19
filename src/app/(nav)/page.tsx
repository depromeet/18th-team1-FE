"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useUserProfileQuery } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import { IcProfileDefault } from "@/shared/ui/icons";
import { Logo } from "@/shared/ui/logo";
import { HomeView } from "@/widgets/home";

const RANDOM_BANNER_HEIGHT = 289;
const ACCENT_BAR_HEIGHT = 6;
const HOME_BANNER_HEIGHT = 126;
const BANNER_SCROLL_THRESHOLD = RANDOM_BANNER_HEIGHT + ACCENT_BAR_HEIGHT + HOME_BANNER_HEIGHT;

const HomePage = () => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPastBanner, setIsPastBanner] = useState(false);
  const { data: profile } = useUserProfileQuery();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsPastBanner(el.scrollTop >= BANNER_SCROLL_THRESHOLD);
    };

    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-none bg-gray-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        <header
          className={cn(
            "sticky top-0 z-10 flex items-center justify-between px-5 py-3",
            isPastBanner ? "bg-key-secondary" : "bg-gray-100",
          )}
        >
          <Logo
            className={cn(
              "transition-colors duration-300",
              isPastBanner ? "text-key-secondary-0-1" : "text-key-secondary",
            )}
          />
          <button
            type="button"
            onClick={() => router.push("/my-page")}
            className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d1e9ea]"
          >
            {profile?.profileImageUrl ? (
              <Image
                src={profile.profileImageUrl}
                alt="프로필"
                width={36}
                height={36}
                className="size-full object-cover"
              />
            ) : (
              <IcProfileDefault size={36} />
            )}
          </button>
        </header>
        <HomeView />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-35 bg-linear-to-b from-transparent to-white" />
    </div>
  );
};

export default HomePage;
