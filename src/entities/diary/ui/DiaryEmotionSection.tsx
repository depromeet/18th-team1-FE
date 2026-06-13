import { DiaryTagChip } from "./DiaryTagChip";

interface DiaryEmotionSectionProps {
  emotions?: string[];
  emotionValue: number;
  content: string | null;
}

export const DiaryEmotionSection = ({
  emotions,
  emotionValue,
  content,
}: DiaryEmotionSectionProps) => {
  const hasEmotions = emotions && emotions.length > 0;
  const hasContent = content != null;

  if (!hasEmotions && !hasContent) return null;

  return (
    <div className="flex flex-col gap-3">
      <p className="body3 text-gray-400">나의 감정</p>
      <div className="flex flex-col gap-5">
        {hasEmotions && (
          <div className="flex flex-wrap gap-2">
            {emotions.map((emotion) => (
              <DiaryTagChip
                key={emotion}
                label={emotion}
                emotionValue={emotionValue}
                className="px-3.5 py-2.5"
              />
            ))}
          </div>
        )}
        {hasContent && (
          <div className="rounded-md bg-muted px-3.5 py-2.5">
            <p className="body3 whitespace-pre-wrap text-gray-500">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};
