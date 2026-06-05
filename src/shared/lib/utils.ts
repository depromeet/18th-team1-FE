import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind 클래스를 안전하게 병합한다.
 * shadcn/ui 컴포넌트에서 사용하는 기본 유틸이다.
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
