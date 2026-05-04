"use client";

import { useRef, useState } from "react";

interface HomeScrollContainerProps {
  children: React.ReactNode;
}

export const HomeScrollContainer = ({ children }: HomeScrollContainerProps): React.ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (): void => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollTop > 0);
    }
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-gray-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {children}
      </div>
      {isScrolled && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-50 bg-linear-to-b from-transparent to-white" />
      )}
    </div>
  );
};
