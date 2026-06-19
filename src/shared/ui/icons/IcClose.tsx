import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcClose = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 15 14" fill="none" {...props}>
    <path
      d="M0.700012 0.700195L13.2 13.2002"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M13.7 0.700195L1.20001 13.2002"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </BaseIcon>
);
