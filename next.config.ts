import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Private Google Drive originals are served via /api/drive-image as local URLs.
  // Never expose Drive service account credentials to client code.
};

export default nextConfig;
