"use client";

import localFont from "next/font/local";

import { ErrorFallback } from "@/shared/ui/error-fallback";

import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/subset-PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const GlobalError = () => (
  <html lang="ko" className={pretendard.variable}>
    <body className="h-dvh font-pretendard text-gray-700 antialiased">
      <div className="flex h-full items-center justify-center bg-gray-0">
        <ErrorFallback />
      </div>
    </body>
  </html>
);

export default GlobalError;
