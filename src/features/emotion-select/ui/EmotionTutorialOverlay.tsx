"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

import { useOverlayPosition } from "@/features/emotion-select/model/useOverlayPosition";

interface EmotionTutorialOverlayProps {
  onDismiss: () => void;
}

const CIRCLE_TRAVEL = 96;
const TRAIL_HEIGHT = 165;

// bottom 대기(0.5s) → 위로 이동(1.2s) → top 대기(0.8s) → [1프레임 reset]
const LOOP_DURATION = 2.5;
const BOTTOM_WAIT = 0.5 / LOOP_DURATION;
const TOP_ARRIVE = 1.7 / LOOP_DURATION;

export const EmotionTutorialOverlay = ({
  onDismiss,
}: EmotionTutorialOverlayProps): React.ReactElement => {
  const { containerRef, position } = useOverlayPosition(TRAIL_HEIGHT);
  const circleY = useMotionValue(CIRCLE_TRAVEL);
  const trailClipPath = useMotionTemplate`inset(${circleY}px 0px 0px 0px round 30px)`;

  useEffect(() => {
    const controls = animate(circleY, [CIRCLE_TRAVEL, CIRCLE_TRAVEL, 0, 0], {
      times: [0, BOTTOM_WAIT, TOP_ARRIVE, 1],
      duration: LOOP_DURATION,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: ["linear", [0.4, 0, 0.2, 1], "linear"],
    });
    return () => controls.stop();
  }, [circleY]);

  const { top, left } = position;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 bg-black/80 pointer-events-auto"
      onPointerDown={onDismiss}
    >
      {top !== null && left !== null && (
        <>
          {/* 트레일: 서클이 지나간 구간만 progressively 채워짐 */}
          <motion.div
            style={{
              position: "absolute",
              top,
              left,
              width: 60,
              height: TRAIL_HEIGHT,
              clipPath: trailClipPath,
            }}
          >
            <svg viewBox="0 0 60 165" width="60" height="165" fill="none" aria-hidden="true">
              <path
                d="M0 30C0 13.4315 13.4315 0 30 0V0C46.5685 0 60 13.4315 60 30V135C60 151.569 46.5685 165 30 165V165C13.4315 165 0 151.569 0 135V30Z"
                fill="url(#trailGradient)"
              />
              <defs>
                <linearGradient
                  id="trailGradient"
                  x1="30"
                  y1="0"
                  x2="30"
                  y2="165"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#5F5F5F" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* 서클: trail 위에 렌더링되어야 border가 가려지지 않음 */}
          <motion.div
            style={{ position: "absolute", top, left, width: 60, height: 60, y: circleY }}
          >
            <svg viewBox="0 0 60 60" width="60" height="60" fill="none" aria-hidden="true">
              <circle
                cx="30"
                cy="30"
                r="29"
                fill="#D9D9D9"
                fillOpacity="0.2"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* 안내 텍스트 */}
          <p
            className="subhead4 absolute left-0 right-0 text-center text-white"
            style={{ top: top + TRAIL_HEIGHT + 22 }}
          >
            드래그하여 책을 쌓아보세요
          </p>
        </>
      )}
    </div>
  );
};
