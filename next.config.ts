import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Use basePath only when building for GitHub Actions (GitHub Pages)
  basePath: process.env.GITHUB_ACTIONS ? '/Demo-restaurantes' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
