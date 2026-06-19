"use client";

import { AnimatePresence, motion } from "framer-motion";

interface EmotionBookBadgeProps {
  label: string;
  isSelected: boolean;
}

export const EmotionBookBadge = ({
  label,
  isSelected,
}: EmotionBookBadgeProps): React.ReactElement => (
  <div className="mt-2 flex justify-center">
    <div className="rounded-full bg-background px-2.5 py-2.5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={label}
          className={`subhead4 whitespace-nowrap ${isSelected ? "text-gray-700" : "text-gray-300"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          {label}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
);
