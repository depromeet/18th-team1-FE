import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { AuthGuard } from "@/features/auth";

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
  title: "Senti",
  description: "책 문장으로 나의 하루를 기록할 수 있는 일기 서비스",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${gtPressura.variable} ${millingTrial.variable}`}
    >
      <body
        className="h-dvh overflow-hidden bg-gray-50 font-pretendard text-gray-700 antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <AuthGuard>
            <div className="h-dvh w-full overflow-hidden md:mx-auto md:max-w-93.75 bg-gray-0">
              {children}
            </div>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
