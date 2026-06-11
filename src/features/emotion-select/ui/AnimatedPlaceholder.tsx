interface AnimatedPlaceholderProps {
  text: string;
}

export const AnimatedPlaceholder = ({ text }: AnimatedPlaceholderProps) => (
  <span className="body1 pointer-events-none text-gray-300">
    {text.split("").map((char, index) => (
      <span
        // biome-ignore lint/suspicious/noArrayIndexKey: 고정 텍스트를 문자 단위로 렌더링하므로 index 키 사용이 안전함
        key={index}
        className="inline-block"
        style={{
          opacity: 0,
          animation: "char-fade-in 0.4s ease forwards",
          animationDelay: `${index * 0.035}s`,
        }}
      >
        {char === " " ? " " : char}
      </span>
    ))}
  </span>
);
