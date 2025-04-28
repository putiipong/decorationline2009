import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "th"],
    defaultLocale: "en",
  },
  images: {
    domains: ['drive.google.com','images.*.com'],
  },
  /* config options here */
};

export default nextConfig;
