import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // External packages for server components
  serverExternalPackages: ['gray-matter', 'remark', 'rehype'],
  
  // Webpack configuration for markdown files
  webpack: (config, { dev }) => {
    // Handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    
    // Disable problematic cache in development
    if (dev) {
      config.cache = false;
    }
    
    return config;
  },
  
  // Image optimization settings
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compiler options for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/blog/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/lib', '@/components'],
  },
};

export default nextConfig;
