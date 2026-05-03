import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

export const IcFilter = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4.75 8.35H6.62M11.62 8.35H19.25M4.75 15.65H12.25M17.25 15.65H19.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.62 8.35A2.5 2.5 0 1 0 11.62 8.35A2.5 2.5 0 1 0 6.62 8.35ZM12.25 15.65A2.5 2.5 0 1 0 17.25 15.65A2.5 2.5 0 1 0 12.25 15.65Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </BaseIcon>
);
