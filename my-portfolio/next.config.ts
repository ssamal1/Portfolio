import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for deployment
  output: 'export',
  // Image optimization settings for static export
  images: {
    unoptimized: true,
    domains: ['avatars.githubusercontent.com'],
  },
  // Handle static routes
  exportPathMap: async () => ({
    '/': { page: '/' },
    '/cv': { page: '/cv' },
    '/projects': { page: '/projects' },
    // Add dynamic routes for project pages if needed
    // '/projects/[id]': { page: '/projects/[id]' },
    '/404': { page: '/404' },
  })
};

export default nextConfig;
