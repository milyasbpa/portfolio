import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static generation for better performance
  output: 'standalone',
  
  // External packages for server components
  serverExternalPackages: ['gray-matter', 'remark', 'rehype'],
  
  // Webpack configuration for markdown and content files
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    
    // Optimize content loading for production builds
    if (!dev && isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }
    
    return config;
  },
  
  // Enable static exports for better performance
  trailingSlash: false,
  
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
        source: '/api/blogs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
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
};

export default nextConfig;
