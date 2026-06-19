"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface SentenceDatePhaseProps {
  month: string;
  onReveal: () => void;
}

const SLIDE = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
const BASE_TRANSITION = { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const };

export const SentenceDatePhase = ({
  month,
  onReveal,
}: SentenceDatePhaseProps): React.ReactElement => {
  const day = new Date().getDate();
  const onRevealRef = useRef(onReveal);
  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  return (
    <motion.div
      className="absolute inset-0 bg-transparent"
      exit={{ y: -70, opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } }}
    >
      {/* Month + Day: 동시에 슬라이드인 */}
      <motion.div
        layoutId="sentence-share-month"
        className="absolute left-1/2 top-40 -translate-x-1/2"
        variants={SLIDE}
        initial="hidden"
        animate="visible"
        transition={{ ...BASE_TRANSITION, delay: 0.4 }}
      >
        <span className="block whitespace-nowrap capitalize text-center font-gt-pressura text-[4.375rem] font-bold leading-[1.2] tracking-[-0.0875rem] text-gray-700">
          {month}
        </span>
      </motion.div>

      <motion.span
        className="absolute left-1/2 top-[186.58px] -translate-x-1/2 font-gt-pressura text-[15rem] font-bold leading-[1.2] tracking-[-0.3rem] text-gray-700"
        variants={SLIDE}
        initial="hidden"
        animate="visible"
        transition={{ ...BASE_TRANSITION, delay: 0.4 }}
      >
        {day}
      </motion.span>

      {/* Image: 텍스트 뒤에 슬라이드인, 완료 즉시 onReveal */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-89.75 -translate-x-1/2"
        variants={SLIDE}
        initial="hidden"
        animate="visible"
        transition={{ ...BASE_TRANSITION, delay: 1.7 }}
        onAnimationComplete={(definition) => {
          if (definition === "visible") setTimeout(() => onRevealRef.current(), 1000);
        }}
      >
        <Image src="/images/diary.png" alt="" width={140} height={137} priority />
      </motion.div>
    </motion.div>
  );
};
