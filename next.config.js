/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizeCss: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
