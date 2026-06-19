"use client";

import { motion, type Transition } from "framer-motion";
import Image from "next/image";

export type BookType = "thin" | "thick";

const DROP_Y = -260;
const BOUNCE_Y = -22;
const STAGGER_DELAY = 0.09;

const getDropTransition = (index: number): Transition => ({
  duration: 0.9,
  times: [0, 0.55, 0.72, 1],
  ease: ["easeIn", "easeOut", "easeInOut"],
  delay: (8 - index) * STAGGER_DELAY,
});

const getRotateTransition = (index: number): Transition => ({
  duration: 0.9,
  times: [0, 0.55, 0.7, 0.84, 1],
  ease: ["linear", "easeOut", "easeInOut", "easeOut"],
  delay: (8 - index) * STAGGER_DELAY,
});

interface EmotionBookItemProps {
  index: number;
  width: number;
  height: number;
  marginLeft: number;
  bookType: BookType;
  coloredImageSrc: string;
  isColored: boolean;
  isTutorialActive: boolean;
  shouldDropAnimate: boolean;
}

export const EmotionBookItem = ({
  index,
  width,
  height,
  marginLeft,
  bookType,
  coloredImageSrc,
  isColored,
  isTutorialActive,
  shouldDropAnimate,
}: EmotionBookItemProps): React.ReactElement => {
  const tilt = index % 2 === 0 ? 5 : -5;
  const residualTilt = index % 2 === 0 ? 1.5 : -1.5;

  return (
    <div style={{ width, height, marginLeft }} className="relative shrink-0 self-start">
      {/* 항상 DOM에 유지해 이미지를 미리 로드 — opacity로만 크로스페이드 */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: isTutorialActive ? 1 : 0 }}
        animate={{ opacity: isColored ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      >
        <Image
          src={coloredImageSrc}
          width={width}
          height={height}
          alt=""
          draggable={false}
          className="pointer-events-none block"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: shouldDropAnimate ? 0 : 1, y: shouldDropAnimate ? DROP_Y : 0 }}
        animate={{
          opacity: isColored ? 0 : 1,
          y: shouldDropAnimate ? [DROP_Y, 0, BOUNCE_Y, 0] : 0,
          rotate: shouldDropAnimate ? [0, 0, tilt, residualTilt, 0] : 0,
        }}
        transition={{
          opacity: isColored
            ? { duration: 0.12 }
            : { duration: 0.12, delay: shouldDropAnimate ? (8 - index) * STAGGER_DELAY : 0 },
          y: shouldDropAnimate ? getDropTransition(index) : { duration: 0 },
          rotate: shouldDropAnimate ? getRotateTransition(index) : { duration: 0 },
        }}
      >
        <Image
          src={`/images/emotion/book-placeholder-${bookType}.png`}
          width={width}
          height={height}
          alt=""
          draggable={false}
          className="pointer-events-none block"
        />
      </motion.div>
    </div>
  );
};
