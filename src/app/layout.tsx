import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";
import { AuthGuard } from "@/features/auth";

const pretendard = localFont({
  src: "../../public/fonts/subset-PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const gtPressura = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Pressura-Bold-Trial.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/GT-Pressura-Regular-Trial.otf",
      weight: "400",
    },
  ],
  variable: "--font-gt-pressura",
  display: "swap",
});

const millingTrial = localFont({
  src: "../../public/fonts/MillingTrial-Triplex1,5mm.otf",
  variable: "--font-milling",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://senti.today"),
  title: "Senti",
  description: "하루를 책 문장으로 기록하고 친구에게 공유해보세요",
  openGraph: {
    title: "Senti",
    description: "하루를 책 문장으로 기록하고 친구에게 공유해보세요",
    url: "https://senti.today",
    type: "website",
    images: [{ url: "/images/og_image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senti",
    description: "하루를 책 문장으로 기록하고 친구에게 공유해보세요",
    images: ["/images/og_image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${gtPressura.variable} ${millingTrial.variable}`}
      suppressHydrationWarning
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-RGVHQMJ1V9"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RGVHQMJ1V9');
        `}
      </Script>
      <body
        className="h-dvh overflow-hidden bg-gray-0 font-pretendard text-gray-700 antialiased"
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
