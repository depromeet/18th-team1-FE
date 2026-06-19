import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

interface IcCalendarProps extends IconProps {
  variant?: "default" | "line";
}

export const IcCalendar = ({ variant = "default", ...props }: IcCalendarProps) => {
  if (variant === "line") {
    return (
      <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
        <g transform="translate(3.3 3.3)">
          <path
            d="M14.3471 2.1541H3.05294C1.75345 2.1541 0.7 3.23947 0.7 4.57834V14.2753C0.7 15.6142 1.75345 16.6995 3.05294 16.6995H14.3471C15.6466 16.6995 16.7 15.6142 16.7 14.2753V4.57834C16.7 3.23947 15.6466 2.1541 14.3471 2.1541Z"
            stroke="currentColor"
            strokeWidth={1.4}
          />
          <path d="M0.7 6.51831H16.7" stroke="currentColor" strokeWidth={1.4} />
          <path
            d="M5.02678 0.7V3.60908M12.5562 0.7V3.60908"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </g>
      </BaseIcon>
    );
  }

  return (
    <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
      <g transform="translate(4 3.3)">
        <path
          d="M16 14.2752C15.9998 15.6138 14.9458 16.6991 13.6465 16.6991H2.35254C1.05338 16.6989 0.000229966 15.6137 0 14.2752V7.01741H16V14.2752ZM13.6465 2.15413C14.9458 2.15413 15.9998 3.2393 16 4.57796V6.01741H0V4.57796C0.000171783 3.23942 1.05334 2.15432 2.35254 2.15413H13.6465Z"
          fill="currentColor"
        />
        <path
          d="M4.32668 0.7V3.60895M11.8559 0.7V3.60895"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </g>
    </BaseIcon>
  );
};
