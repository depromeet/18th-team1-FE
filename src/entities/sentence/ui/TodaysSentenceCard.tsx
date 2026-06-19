"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

import { Text } from "@/shared/ui/text";

const FLIP_INTERVAL_MS = 4000;

interface TodaysSentenceCardProps {
  date: string;
  quote: string;
  bookTitle: string;
  bookAuthor: string;
  bookCoverImage?: string;
  animateWords?: boolean;
}

export const TodaysSentenceCard = ({
  date,
  quote,
  bookTitle,
  bookAuthor,
  bookCoverImage,
  animateWords = false,
}: TodaysSentenceCardProps) => {
  const controls = useAnimation();
  const isFlippedRef = useRef(false);
  const isFlippingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
            delay: 0.28 + idx * 0.15,
            hasSpaceAfter: wordIndex < words.length - 1,
          };
        }),
      };
    });
  }, [quote]);

  const flipRef = useRef<() => Promise<void>>(async () => {});
  flipRef.current = async () => {
    if (isFlippingRef.current) return;
    isFlippingRef.current = true;
    isFlippedRef.current = !isFlippedRef.current;
    await controls.start({
      rotateY: isFlippedRef.current ? 180 : 0,
      y: [0, -30, -30, 0],
      scale: [1, 1.05, 1.05, 1],
      transition: {
        rotateY: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
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
    isFlippingRef.current = false;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      flipRef.current();
    }, FLIP_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleClick = () => {
    flipRef.current();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      flipRef.current();
    }, FLIP_INTERVAL_MS);
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
                      {animateWords ? (
                        <motion.span
                          className="inline-block"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.05, delay }}
                        >
                          {word}
                        </motion.span>
                      ) : (
                        word
                      )}
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
              『{bookTitle}』, {bookAuthor}
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
          {bookCoverImage && (
            <Image alt="book cover" fill className="object-cover object-top" src={bookCoverImage} />
          )}
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
