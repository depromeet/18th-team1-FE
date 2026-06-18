"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface SentenceDatePhaseProps {
  month: string;
  onReveal: () => void;
}

export const SentenceDatePhase = ({
  month,
  onReveal,
}: SentenceDatePhaseProps): React.ReactElement => {
  const day = new Date().getDate();

  const onRevealRef = useRef(onReveal);
  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const timer = setTimeout(() => onRevealRef.current(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-transparent"
      exit={{ y: -70, opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } }}
    >
      {/* Month: layoutId allows smooth shared-element transition to CardPhase */}
      <motion.div
        layoutId="sentence-share-month"
        className="absolute left-1/2 top-40 -translate-x-1/2"
      >
        <span className="block whitespace-nowrap capitalize text-center font-gt-pressura text-[4.375rem] font-bold leading-[1.2] tracking-[-0.0875rem] text-gray-700">
          {month}
        </span>
      </motion.div>

      {/* Day: Figma top=233.58px, minus status-bar 47px = 186.58px from viewport top */}
      <span className="absolute left-1/2 top-[186.58px] -translate-x-1/2 font-gt-pressura text-[15rem] font-bold leading-[1.2] tracking-[-0.3rem] text-gray-700">
        {day}
      </span>

      {/* Image: Figma top=406px, minus status-bar 47px = 359px — overlaps bottom of day number */}
      <div className="pointer-events-none absolute left-1/2 top-89.75 -translate-x-1/2">
        <Image src="/images/diary-write.png" alt="" width={140} height={137} priority />
      </div>
    </motion.div>
  );
};
