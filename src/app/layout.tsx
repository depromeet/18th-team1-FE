import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/subset-PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const gtPressura = localFont({
  src: "../../public/fonts/GT-Pressura-Extended-Bold-Trial.otf",
  variable: "--font-gt-pressura",
  display: "swap",
});

const millingTrial = localFont({
  src: "../../public/fonts/MillingTrial-Triplex1,5mm.otf",
  variable: "--font-milling",
  display: "swap",
});

export const metadata: Metadata = {
  title: "책 문장 일기",
  description: "책 속 문장으로 나의 하루를 기록하는 웹 애플리케이션",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps): React.ReactElement => {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${gtPressura.variable} ${millingTrial.variable}`}
    >
      <body
        className="h-dvh overflow-hidden bg-gray-0 font-pretendard text-gray-700 antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <div className="h-dvh w-full overflow-hidden md:mx-auto md:max-w-93.75">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
