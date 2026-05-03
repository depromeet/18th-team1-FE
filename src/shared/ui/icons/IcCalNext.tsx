import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcCalNext = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M9 6L15 12L9 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);
