"use client";

// 모바일 키보드 팝업으로 변하는 실제 뷰포트 높이를 --vh CSS 변수에 동기화한다. 키보드 포커스 진입/해제 시 폴링으로 높이를 갱신하며, 스크롤 불가 영역의 배경 스크롤을 방지한다.
import { useEffect, useRef } from "react";

const POLL_INTERVAL_MS = 100;
const POLL_COUNT = 20;

export const useViewportHeight = () => {
  const focusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const focusOutTimerIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const vp = window.visualViewport ?? null;

    const updateVH = () => {
      const h = vp ? vp.height : window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${h}px`);
      // textarea 포커스 중(키보드 열린 상태)엔 갱신하지 않아 키보드 이전 높이를 보존한다.
      if (!(document.activeElement instanceof HTMLTextAreaElement)) {
        document.documentElement.style.setProperty("--vh-no-keyboard", `${h}px`);
      }
    };

    const preventTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("textarea")) return;
      // data-vaul-no-drag 요소(가로 스크롤 컨테이너 등) 내부는 네이티브 터치 스크롤을 허용
      if (target.closest("[data-vaul-no-drag]")) return;

      let el: HTMLElement | null = target;
      while (el) {
        const { overflowY, overflowX } = window.getComputedStyle(el);
        if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
          return;
        }
        if ((overflowX === "auto" || overflowX === "scroll") && el.scrollWidth > el.clientWidth) {
          return;
        }
        el = el.parentElement;
      }

      e.preventDefault();
    };

    const resetScroll = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    const onFocusIn = () => {
      if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
      let count = 0;
      focusIntervalRef.current = setInterval(() => {
        updateVH();
        count++;
        if (count >= POLL_COUNT) {
          if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
          focusIntervalRef.current = null;
        }
      }, POLL_INTERVAL_MS);
    };

    const onFocusOut = () => {
      if (focusIntervalRef.current) {
        clearInterval(focusIntervalRef.current);
        focusIntervalRef.current = null;
      }
      focusOutTimerIds.current.push(setTimeout(updateVH, 100));
      focusOutTimerIds.current.push(setTimeout(updateVH, 300));
    };

    updateVH();

    vp?.addEventListener("resize", updateVH);
    vp?.addEventListener("scroll", updateVH);
    window.addEventListener("resize", updateVH);
    window.addEventListener("scroll", resetScroll);
    document.addEventListener("touchmove", preventTouchMove, { passive: false });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      if (focusIntervalRef.current) clearInterval(focusIntervalRef.current);
      for (const id of focusOutTimerIds.current) clearTimeout(id);
      vp?.removeEventListener("resize", updateVH);
      vp?.removeEventListener("scroll", updateVH);
      window.removeEventListener("resize", updateVH);
      window.removeEventListener("scroll", resetScroll);
      document.removeEventListener("touchmove", preventTouchMove);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);
};
