"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Text } from "@/shared/ui/text";

interface TodaysSentenceCardProps {
  date: string;
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  bookCoverImage?: string;
}

export const TodaysSentenceCard = ({
  date,
  quote,
  bookTitle,
  bookAuthor,
  bookCoverImage = "/images/book.webp",
}: TodaysSentenceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const controls = useAnimation();

  const wordLines = useMemo(() => {
    let globalIndex = 0;
    return quote.split("\n").map((line, lineIndex) => {
      const words = line.split(" ");
      return {
        lineKey: `L${lineIndex}`,
        words: words.map((word, wordIndex) => {
          const idx = globalIndex++;
          return {
            wordKey: `W${idx}`,
            word,
            delay: 0.28 + idx * 0.07,
            hasSpaceAfter: wordIndex < words.length - 1,
          };
        }),
      };
    });
  }, [quote]);

  const handleClick = async () => {
    if (isFlipping) return;
    setIsFlipping(true);
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    await controls.start({
      rotateY: nextFlipped ? 180 : 0,
      y: [0, -30, -30, 0],
      scale: [1, 1.05, 1.05, 1],
      transition: {
        rotateY: {
          duration: 0.9,
          ease: [0.4, 0, 0.2, 1],
        },
        // 착지 easing에 spring 곡선을 녹여서 자연스러운 탄성
        y: {
          duration: 0.9,
          times: [0, 0.28, 0.6, 1],
          ease: ["easeOut", "linear", [0.34, 1.56, 0.64, 1]],
        },
        scale: {
          duration: 0.9,
          times: [0, 0.28, 0.6, 1],
          ease: ["easeOut", "linear", [0.34, 1.56, 0.64, 1]],
        },
      },
    });
    setIsFlipping(false);
  };

  return (
    <button
      type="button"
      className="h-94.5 w-65 shrink-0 cursor-pointer bg-transparent text-left"
      style={{ perspective: "1200px" }}
      onClick={handleClick}
    >
      <motion.div
        animate={controls}
        className="relative w-full"
        style={{
          height: "378px",
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        {/* 앞면 */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl shadow-[0px_2px_30px_rgba(0,0,0,0.1)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex h-11.75 shrink-0 items-center bg-key-secondary px-4.5">
            <Text as="span" variant="point3" color="gray-0">
              {date}
            </Text>
          </div>

          <div className="flex flex-1 flex-col justify-start bg-background px-4.5 pt-5 pb-4.5">
            <div className="head4 text-key-secondary">
              {wordLines.map(({ lineKey, words }) => (
                <p key={lineKey} className="m-0">
                  {words.map(({ wordKey, word, delay, hasSpaceAfter }) => (
                    <span key={wordKey} className="inline-block">
                      <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {word}
                      </motion.span>
                      {hasSpaceAfter && <span>&nbsp;</span>}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          <div className="h-3 shrink-0 bg-key-point" />

          <div className="flex h-13 shrink-0 items-center bg-key-primary px-4.5">
            <Text as="span" variant="body2" color="key-secondary">
              {bookTitle}, {bookAuthor}
            </Text>
          </div>
        </div>

        {/* 뒷면 */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0px_2px_30px_rgba(0,0,0,0.1)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* 책 표지 이미지 */}
          <Image alt="book cover" fill className="object-cover object-top" src={bookCoverImage} />
          {/* 책 질감 오버레이 */}
          <Image
            alt=""
            fill
            className="pointer-events-none object-cover mix-blend-multiply opacity-20"
            src="/images/book-texture-overlay.png"
          />
          {/* 제본 spine 효과 */}
          <Image
            alt=""
            width={11}
            height={378}
            className="pointer-events-none absolute left-0 top-0 h-full w-[11px] object-cover"
            src="/images/book-spine-left.png"
          />
          <Image
            alt=""
            width={8}
            height={378}
            className="pointer-events-none absolute top-0 h-full w-[8px] object-cover"
            style={{ left: "11px" }}
            src="/images/book-spine-right.png"
          />
        </div>
      </motion.div>
    </button>
  );
};
