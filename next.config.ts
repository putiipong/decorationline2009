import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Our authenticated Drive image API already transforms originals to WebP.
  // Avoid a second Vercel/Next optimizer fetch, which can cache errors and cost extra.
  images: { unoptimized: true },
};

export default nextConfig;
