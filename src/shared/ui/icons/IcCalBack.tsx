import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcCalBack = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M15 6L9 12L15 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);
