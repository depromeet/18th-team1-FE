export type EmotionCategory = "bad" | "neutral" | "good";

export type Emotion = {
  id: string;
  label: string;
  category: EmotionCategory;
};

export const CATEGORY_BG: Record<EmotionCategory, string> = {
  bad: "bg-key-secondary2",
  neutral: "bg-key-primary",
  good: "bg-key-secondary",
};

export const EMOTIONS: Emotion[] = [
  { id: "very-good", label: "아주 기분 좋아요", category: "good" },
  { id: "good", label: "기분 좋아요", category: "good" },
  { id: "slightly-good", label: "약간 기분 좋아요", category: "good" },
  { id: "quite-good", label: "꽤 괜찮아요", category: "neutral" },
  { id: "not-bad", label: "나쁘지 않아요", category: "neutral" },
  { id: "neutral", label: "그저그래요", category: "neutral" },
  { id: "slightly-bad", label: "약간 별로에요", category: "bad" },
  { id: "bad", label: "별로에요", category: "bad" },
  { id: "very-bad", label: "아주 별로에요", category: "bad" },
];

// EMOTIONS 배열 순서를 1~100 수치로 변환 (긍정 → 부정)
export const getEmotionValue = (emotionId: string | null): number => {
  if (!emotionId) return 50;
  const index = EMOTIONS.findIndex((e) => e.id === emotionId);
  if (index === -1) return 50;
  return Math.round(100 - (index / (EMOTIONS.length - 1)) * 99);
};
