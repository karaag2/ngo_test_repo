import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "ngo-test-repo.vercel.app" },
      { protocol: "https", hostname: "fajr-ong.onrender.com" },

    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://fajr-ong.onrender.com/api/:path*",
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
