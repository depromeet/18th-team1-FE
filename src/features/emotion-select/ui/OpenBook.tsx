"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface OpenBookProps {
  isVisible: boolean;
  showApple: boolean;
  isTutorialActive: boolean;
  onAppleDismiss: () => void;
}

export const OpenBook = ({
  isVisible,
  showApple,
  isTutorialActive,
  onAppleDismiss,
}: OpenBookProps): React.ReactElement => (
  <div
    style={{ width: 165, height: 39, marginLeft: 92 }}
    className={`relative shrink-0 self-start overflow-visible ${!isVisible ? "invisible" : ""}`}
  >
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className="absolute bottom-0 left-0"
          style={{ width: 165, height: 64 }}
          initial={{ y: isTutorialActive ? 0 : -800, opacity: isTutorialActive ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: -200,
            opacity: 0,
            transition: { type: "tween", duration: 0.22, ease: "easeIn" },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          <Image
            src="/images/emotion/book-0.png"
            width={165}
            height={64}
            alt=""
            draggable={false}
            className="pointer-events-none block"
          />
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence initial={false}>
      {showApple && (
        <motion.div
          className="absolute -rotate-[5.24deg] cursor-pointer"
          style={{ width: 64, height: 60, bottom: 62, left: 52 }}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => {
            e.stopPropagation();
            onAppleDismiss();
          }}
          initial={{ y: isTutorialActive ? 0 : -800, opacity: isTutorialActive ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{
            y: -200,
            opacity: 0,
            transition: { type: "tween", duration: 0.18, ease: "easeIn" },
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          <Image
            src="/images/emotion/book-0-apple.png"
            width={64}
            height={60}
            alt=""
            draggable={false}
            className="pointer-events-none block"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
