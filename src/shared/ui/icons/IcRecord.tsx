import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcRecord = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 30 30" fill="none" overflow="visible" {...props}>
    <rect width="30" height="30" rx="15" fill="currentColor" />
    <path
      d="M15.1882 10.9253V19.4512M10.9253 15.1882H19.4512"
      stroke="white"
      strokeWidth="1.74727"
      strokeLinecap="round"
    />
  </BaseIcon>
);
