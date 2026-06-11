import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

interface IcDiscoverProps extends IconProps {
  variant?: "default" | "line";
}

export const IcDiscover = ({
  variant = "default",
  ...props
}: IcDiscoverProps): React.ReactElement => {
  if (variant === "line") {
    return (
      <BaseIcon viewBox="0 0 24 24" {...props}>
        <rect x="3.5" y="6.5" width="17" height="1.5" rx="0.75" />
        <rect x="3.5" y="11.5" width="17" height="1.5" rx="0.75" />
        <rect x="3.5" y="16.5" width="17" height="1.5" rx="0.75" />
      </BaseIcon>
    );
  }

  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
    </BaseIcon>
  );
};
