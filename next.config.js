// next.config.js - Añadir headers CSP
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },

  // ⭐⭐ NUEVO: Headers CSP para desarrollo ⭐⭐
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';

    if (!isDev) {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:;
              style-src 'self' 'unsafe-inline' https:;
              font-src 'self' https: data:;
              img-src 'self' https: http: data:;
              connect-src 'self' https: http: ws: wss:;
              frame-src 'self' https:;
              worker-src 'self' blob:;
              manifest-src 'self';
            `
              .replace(/\n/g, ' ')
              .replace(/\s+/g, ' ')
              .trim(),
          },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      crypto: false,
    };

    if (dev) config.ignoreWarnings = [{ module: /console-ninja/ }];

    return config;
  },
};

export default nextConfig;
