"use client";

import { useEffect, useState } from "react";

import { PLACEHOLDER_TEXTS } from "../config/sentenceType";

const CYCLE_INTERVAL_MS = 3000;
const FADE_OUT_DURATION_MS = 300;

interface UsePlaceholderCycleReturn {
  placeholderText: string;
  animationKey: number;
  isExiting: boolean;
}

export const usePlaceholderCycle = (isActive: boolean): UsePlaceholderCycleReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // isActive가 true가 될 때 랜덤 인덱스로 초기화
  useEffect(() => {
    if (!isActive) return;
    const randomIndex = Math.floor(Math.random() * PLACEHOLDER_TEXTS.length);
    setCurrentIndex(randomIndex);
    setAnimationKey((prev) => prev + 1);
    setIsExiting(false);
  }, [isActive]);

  // CYCLE_INTERVAL_MS마다 페이드아웃 트리거
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => setIsExiting(true), CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isActive]);

  // 페이드아웃 완료 후 다음 텍스트로 교체
  useEffect(() => {
    if (!isExiting) return;
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % PLACEHOLDER_TEXTS.length);
      setAnimationKey((prev) => prev + 1);
      setIsExiting(false);
    }, FADE_OUT_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [isExiting]);

  return {
    placeholderText: PLACEHOLDER_TEXTS[currentIndex] ?? "",
    animationKey,
    isExiting,
  };
};
