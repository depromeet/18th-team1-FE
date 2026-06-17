"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { EmotionTag } from "@/entities/report";

interface TagPosition {
  tagId: number;
  x: number;
  y: number;
}

type Rect = { x: number; y: number; w: number; h: number };

const GAP = 8;
const MIN_HEIGHT = 192;
const SPIRAL_STEP = 6;
const GRID_STEP = 4;

export const getTypographyClassName = (index: number): string => {
  if (index <= 1) return "title2";
  if (index <= 5) return "head3";
  return "caption1";
};

const hasOverlap = (x: number, y: number, w: number, h: number, placed: Rect[]): boolean =>
  placed.some(
    (p) => x < p.x + p.w + GAP && x + w + GAP > p.x && y < p.y + p.h + GAP && y + h + GAP > p.y,
  );

const overlapArea = (x: number, y: number, w: number, h: number, placed: Rect[]): number =>
  placed.reduce((sum, p) => {
    const overlapW = Math.min(x + w, p.x + p.w) - Math.max(x, p.x);
    const overlapH = Math.min(y + h, p.y + p.h) - Math.max(y, p.y);
    return overlapW > 0 && overlapH > 0 ? sum + overlapW * overlapH : sum;
  }, 0);

const findPosition = (
  w: number,
  h: number,
  containerW: number,
  placed: Rect[],
): { x: number; y: number } => {
  const maxX = Math.max(0, containerW - w);
  const maxY = Math.max(0, MIN_HEIGHT - h);
  const centerX = Math.min(maxX, Math.max(0, containerW / 2 - w / 2));
  const centerY = Math.min(maxY, Math.max(0, MIN_HEIGHT / 2 - h / 2));
  const aspect = containerW > 0 ? containerW / MIN_HEIGHT : 1;

  if (!hasOverlap(centerX, centerY, w, h, placed)) return { x: centerX, y: centerY };

  const maxRadius = Math.hypot(containerW, MIN_HEIGHT);
  for (let radius = SPIRAL_STEP; radius < maxRadius; radius += SPIRAL_STEP) {
    const steps = Math.max(8, Math.floor((2 * Math.PI * radius) / SPIRAL_STEP));
    for (let i = 0; i < steps; i++) {
      const angle = (2 * Math.PI * i) / steps;
      const x = centerX + radius * aspect * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      if (x < 0 || y < 0 || x > maxX || y > maxY) continue;
      if (!hasOverlap(x, y, w, h, placed)) return { x, y };
    }
  }

  let best = { x: 0, y: 0 };
  let bestOverlap = Number.POSITIVE_INFINITY;
  for (let y = 0; y <= maxY; y += GRID_STEP) {
    for (let x = 0; x <= maxX; x += GRID_STEP) {
      const overlap = overlapArea(x, y, w, h, placed);
      if (overlap < bestOverlap) {
        bestOverlap = overlap;
        best = { x, y };
      }
    }
  }
  return best;
};

const measureTag = (
  container: HTMLElement,
  text: string,
  typographyClassName: string,
): { w: number; h: number } => {
  const el = document.createElement("span");
  el.style.position = "absolute";
  el.style.visibility = "hidden";
  el.style.whiteSpace = "nowrap";
  el.className = typographyClassName;
  el.textContent = text;
  container.appendChild(el);
  const w = el.offsetWidth + 8;
  const h = el.offsetHeight;
  container.removeChild(el);
  return { w, h };
};

export const useEmotionCloud = (emotionTags: EmotionTag[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<TagPosition[]>([]);

  const sortedTags = useMemo(
    () =>
      [...emotionTags].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "ko")),
    [emotionTags],
  );

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | undefined;

    const computeLayout = () => {
      if (cancelled || !containerRef.current) return;
      const container = containerRef.current;
      const { width } = container.getBoundingClientRect();
      const placed: Rect[] = [];

      const computed = sortedTags.map((tag, index) => {
        const { w, h } = measureTag(container, tag.label, getTypographyClassName(index));
        const { x, y } = findPosition(w, h, width, placed);
        placed.push({ x, y, w, h });
        return { tagId: tag.tagId, x, y };
      });

      if (!cancelled) {
        setPositions(computed);
      }
    };

    void document.fonts.ready.then(() => {
      if (!cancelled) computeLayout();
    });

    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        if (!cancelled) computeLayout();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
    };
  }, [sortedTags]);

  const positionMap = useMemo(() => new Map(positions.map((p) => [p.tagId, p])), [positions]);

  return { containerRef, sortedTags, positionMap };
};
