import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.aladin.co.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  ...(process.env.NODE_ENV === "development" && {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.API_BASE_URL}/api/:path*`,
        },
      ];
    },
  }),
};

export default nextConfig;
