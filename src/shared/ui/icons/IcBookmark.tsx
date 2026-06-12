import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

interface IcBookmarkProps extends IconProps {
  variant?: "default" | "line";
}

export const IcBookmark = ({
  variant = "default",
  ...props
}: IcBookmarkProps): React.ReactElement => {
  if (variant === "line") {
    return (
      <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
        <path
          d="M12.2293 17.1442L7.8 19.8C7.13333 20.0833 6.5 20.0293 5.9 19.638C5.3 19.2467 5 18.6923 5 17.975V5C5 4.45 5.196 3.97933 5.588 3.588C5.98 3.19667 6.45067 3.00067 7 3H17C17.55 3 18.021 3.196 18.413 3.588C18.805 3.98 19.0007 4.45067 19 5V17.975C19 18.6917 18.7 19.246 18.1 19.638C17.5 20.03 16.8667 20.084 16.2 19.8L12.2293 17.1442Z"
          stroke="currentColor"
          strokeWidth={1.55}
          strokeLinejoin="round"
        />
      </BaseIcon>
    );
  }

  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path d="M12.2293 17.1442L7.8 19.8C7.13333 20.0833 6.5 20.0293 5.9 19.638C5.3 19.2467 5 18.6923 5 17.975V5C5 4.45 5.196 3.97933 5.588 3.588C5.98 3.19667 6.45067 3.00067 7 3H17C17.55 3 18.021 3.196 18.413 3.588C18.805 3.98 19.0007 4.45067 19 5V17.975C19 18.6917 18.7 19.246 18.1 19.638C17.5 20.03 16.8667 20.084 16.2 19.8L12.2293 17.1442Z" />
    </BaseIcon>
  );
};
