"use client";

import { useEffect, useState } from "react";

interface DominantColorResult {
  color: string;
  isDark: boolean;
}

const FALLBACK: DominantColorResult = { color: "rgb(28, 34, 137)", isDark: true };

const colorCache = new Map<string, DominantColorResult>();

const getLuminance = (r: number, g: number, b: number) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

// 이미지 하단 20% 영역 샘플링 후, 어두운 이미지는 추가로 0.6배 다크닝
const sampleBottomRegionColor = (imageUrl: string): Promise<DominantColorResult> =>
  new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const sampleH = Math.max(1, Math.floor(img.height * 0.2));
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = sampleH;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(FALLBACK);
        return;
      }
      try {
        ctx.drawImage(img, 0, img.height - sampleH, img.width, sampleH, 0, 0, img.width, sampleH);
        const { data } = ctx.getImageData(0, 0, img.width, sampleH);
        let r = 0;
        let g = 0;
        let b = 0;
        const pixelCount = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i] ?? 0;
          g += data[i + 1] ?? 0;
          b += data[i + 2] ?? 0;
        }
        let avgR = Math.round(r / pixelCount);
        let avgG = Math.round(g / pixelCount);
        let avgB = Math.round(b / pixelCount);
        const isDark = getLuminance(avgR, avgG, avgB) < 0.5;
        // 어두운 계열 이미지는 Figma 결과에 맞게 추가 다크닝
        if (isDark) {
          avgR = Math.round(avgR * 0.8);
          avgG = Math.round(avgG * 0.8);
          avgB = Math.round(avgB * 0.8);
        }
        resolve({
          color: `rgb(${avgR}, ${avgG}, ${avgB})`,
          isDark,
        });
      } catch {
        resolve(FALLBACK);
      }
    };
    img.onerror = () => resolve(FALLBACK);
    img.src = imageUrl;
  });

export const useImageDominantColor = (imageUrl: string | null | undefined): DominantColorResult => {
  const [result, setResult] = useState<DominantColorResult>(FALLBACK);

  useEffect(() => {
    if (!imageUrl) {
      setResult(FALLBACK);
      return;
    }
    const cached = colorCache.get(imageUrl);
    if (cached) {
      setResult(cached);
      return;
    }
    let cancelled = false;
    sampleBottomRegionColor(imageUrl).then((res) => {
      if (!cancelled) {
        colorCache.set(imageUrl, res);
        setResult(res);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  return result;
};
