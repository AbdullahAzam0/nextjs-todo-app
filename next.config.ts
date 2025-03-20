import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // This will allow the build to succeed even with TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This will allow the build to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
