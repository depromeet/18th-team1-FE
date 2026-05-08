export type EmotionCategory = "bad" | "neutral" | "good";

export type Emotion = {
  id: string;
  label: string;
  category: EmotionCategory;
  value: number;
};

export const CATEGORY_BG: Record<EmotionCategory, string> = {
  bad: "bg-key-secondary2",
  neutral: "bg-key-primary",
  good: "bg-key-secondary",
};

export const EMOTIONS: Emotion[] = [
  { id: "very-good", label: "아주 기분 좋아요", category: "good", value: 9 },
  { id: "good", label: "기분 좋아요", category: "good", value: 8 },
  { id: "slightly-good", label: "약간 기분 좋아요", category: "good", value: 7 },
  { id: "quite-good", label: "꽤 괜찮아요", category: "neutral", value: 6 },
  { id: "not-bad", label: "나쁘지 않아요", category: "neutral", value: 5 },
  { id: "neutral", label: "그저그래요", category: "neutral", value: 4 },
  { id: "slightly-bad", label: "약간 별로에요", category: "bad", value: 3 },
  { id: "bad", label: "별로에요", category: "bad", value: 2 },
  { id: "very-bad", label: "아주 별로에요", category: "bad", value: 1 },
];

// 선택한 책의 스택 수 기반 1~9 수치로 변환 (위 책=9, 아래 책=1)
export const getEmotionValue = (emotionId: string | null): number => {
  if (!emotionId) return 5;
  return EMOTIONS.find((e) => e.id === emotionId)?.value ?? 5;
};
