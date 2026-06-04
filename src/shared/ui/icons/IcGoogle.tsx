import type { IconProps } from "./icon.types";

export const IcGoogle = ({ size = 24, className }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.04 12.26C23.04 11.44 22.97 10.65 22.84 9.9H12V14.26H18.19C17.92 15.68 17.12 16.89 15.92 17.69V20.51H19.72C21.84 18.55 23.04 15.66 23.04 12.26Z"
      fill="#4285F4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 23C15.24 23 17.96 21.93 19.72 20.51L15.92 17.69C14.86 18.41 13.53 18.84 12 18.84C8.87 18.84 6.23 16.85 5.3 14.12H1.37V17.03C3.12 20.5 7.27 23 12 23Z"
      fill="#34A853"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.3 14.12C5.07 13.4 4.94 12.63 4.94 11.84C4.94 11.05 5.07 10.28 5.3 9.56V6.65H1.37C0.5 8.38 0 10.35 0 12.45C0 14.55 0.5 16.52 1.37 18.25L5.3 14.12Z"
      fill="#FBBC05"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5.16C13.68 5.16 15.19 5.74 16.38 6.87L19.8 3.45C17.95 1.72 15.24 0.69 12 0.69C7.27 0.69 3.12 3.19 1.37 6.66L5.3 9.57C6.23 6.84 8.87 5.16 12 5.16Z"
      fill="#EA4335"
    />
  </svg>
);
