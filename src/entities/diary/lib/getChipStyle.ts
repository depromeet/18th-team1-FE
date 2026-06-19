export const getChipStyle = (emotionValue: number): string => {
  if (emotionValue >= 7) return "bg-key-primary-0 text-key-primary-100";
  if (emotionValue >= 4) return "bg-key-point-0 text-key-point-100";
  return "bg-key-secondary-0 text-key-secondary";
};
