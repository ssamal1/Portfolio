import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
    unoptimized: true, // Required for static exports
  },
  // Enable static exports for deployment
  output: 'export',
  // Optional: Enable if you need to support browser-based image optimization
  // (remove if you're using static exports)
  // images: {
  //   loader: 'custom',
  //   loaderFile: './imageLoader.js',
  // },
};

export default nextConfig;
