"use client";

import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

import { useEmotionSelectStore } from "@/store/emotion-select/useEmotionSelectStore";

import sentenceLoadingJson from "../assets/sentence-loading.json";

type Stage = "finding" | "quote" | "almost";

const FALLBACK_QUOTE = {
  content: "세상에는 두 종류의 고통이 있다.",
  title: "아픔이 길이 되려면",
  author: "김승섭",
};

const TYPING_INTERVAL_MS = 50;
const ALMOST_TRIGGER_MS = 7000;
const FINDING_DURATION_MS = 2000;

export const RecommendationLoadingView = (): React.ReactElement => {
  const { loadingQuotes } = useEmotionSelectStore();
  const quoteRef = useRef(loadingQuotes[0] ?? FALLBACK_QUOTE);

  const [stage, setStage] = useState<Stage>("finding");
  const [stageKey, setStageKey] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    const toQuote = setTimeout(() => {
      setStage("quote");
      setStageKey((k) => k + 1);
    }, FINDING_DURATION_MS);

    const toAlmost = setTimeout(() => {
      setStage("almost");
      setStageKey((k) => k + 1);
    }, ALMOST_TRIGGER_MS);

    return () => {
      clearTimeout(toQuote);
      clearTimeout(toAlmost);
    };
  }, []);

  useEffect(() => {
    if (stage !== "quote") return;

    const content = quoteRef.current.content;
    setTypedText("");
    setShowSource(false);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      charIndex += 1;
      setTypedText(content.slice(0, charIndex));
      if (charIndex >= content.length) {
        clearInterval(typingInterval);
        setShowSource(true);
      }
    }, TYPING_INTERVAL_MS);

    return () => clearInterval(typingInterval);
  }, [stage]);

  return (
    <div
      className="fixed inset-x-0 top-0 flex flex-col items-center justify-center bg-background md:left-1/2 md:right-auto md:w-93.75 md:-translate-x-1/2"
      style={{ height: "var(--vh, 100dvh)" }}
    >
      <Lottie animationData={sentenceLoadingJson} style={{ width: 280, height: 189 }} loop />
      <div
        key={stageKey}
        className="-mt-11 flex h-13.5 w-42.5 flex-col items-center gap-3 text-center"
        style={{ animation: "slideInUp 0.4s ease-out" }}
      >
        {stage === "finding" && (
          <p className="body3 text-gray-500">책을 펼쳐 문장을 찾는 중이에요</p>
        )}
        {stage === "almost" && (
          <p className="body3 text-gray-500">오늘의 문장을 거의 다 찾았어요</p>
        )}
        {stage === "quote" && (
          <>
            <p className="body3 text-gray-500">{typedText}</p>
            <p
              className="body3 text-gray-500 transition-opacity duration-300 whitespace-nowrap"
              style={{ opacity: showSource ? 1 : 0 }}
            >
              {`『${quoteRef.current.title}』, ${quoteRef.current.author}`}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
