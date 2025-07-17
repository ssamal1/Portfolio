import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable static exports for Vercel deployment
  // output: 'export',
  // Image optimization settings
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  // Enable static HTML export for non-dynamic pages
  // This is handled automatically by Vercel
};

// Only enable static exports for non-Vercel deployments
if (process.env.VERCEL !== '1') {
  nextConfig.output = 'export';
  nextConfig.images = {
    ...nextConfig.images,
    unoptimized: true,
  };
  nextConfig.exportPathMap = async () => ({
    '/': { page: '/' },
    '/cv': { page: '/cv' },
    '/projects': { page: '/projects' },
    '/404': { page: '/404' },
  });
}

export default nextConfig;
