import { type RefObject, useEffect } from "react";

// ref 요소 외부를 클릭했을 때 onClickOutside 콜백을 실행한다. isEnabled로 감지 활성/비활성 제어 가능.
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClickOutside: () => void,
  isEnabled = true,
) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, onClickOutside, isEnabled]);
};
