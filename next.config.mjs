/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    // ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
    ignoreBuildErrors: true,
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    // ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    taint: true,
    windowHistorySupport: true,
  },
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return webpackConfig
  },
}

export default config
