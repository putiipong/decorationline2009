import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "en",
  },
  images: {
    domains: ['drive.google.com','images.pexels.com','images.unsplash.com','images.remotePatterns'],
  },
  /* config options here */
};

export default nextConfig;
