// Import the bundle analyzer with ESM syntax
import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return webpackConfig;
  },
};

// Apply the bundle analyzer conditionally
export default withBundleAnalyzer(config);