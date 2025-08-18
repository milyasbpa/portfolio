import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include markdown files in the build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
