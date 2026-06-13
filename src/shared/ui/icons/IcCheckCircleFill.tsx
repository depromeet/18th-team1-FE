import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcCheckCircleFill = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="12" cy="12" r="10.5" fill="currentColor" stroke="white" />
    <path
      d="M8 11.5L11.5 15L17 9"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);
