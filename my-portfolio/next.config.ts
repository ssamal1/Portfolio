import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/my-portfolio' : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable static exports for deployment
  output: 'export',
  // Configure base path for production
  basePath: isProd ? basePath : '',
  // Ensure proper routing for static exports
  trailingSlash: true,
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
  }),
  // Environment variables for client-side
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
