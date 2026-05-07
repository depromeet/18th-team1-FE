"use client";

import { useEffect, useState } from "react";

const getSecondsUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
};

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((v) => String(v).padStart(2, "0")).join(":");
};

interface UseWritingTimerReturn {
  formattedTime: string;
  isUnderThreeHours: boolean;
}

export const useWritingTimer = (): UseWritingTimerReturn => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  useEffect(() => {
    setRemainingSeconds(getSecondsUntilMidnight());
    const interval = setInterval(() => {
      setRemainingSeconds(getSecondsUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    formattedTime: formatTime(remainingSeconds),
    isUnderThreeHours: remainingSeconds < 3 * 60 * 60,
  };
};
