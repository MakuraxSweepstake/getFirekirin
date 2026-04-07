import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // domains: ["app.bdwebai.com", "sweepstake.webjuwa.com", "app.socialspins777.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.getfirekirin.com',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'app.getfirekirin.com',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.getfirekirin.com',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/buy-coins/:slug/tryspeed',
        destination: '/buy-coins/:slug/success',
        permanent: false,
      },
    ];
  },

  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL || ""
    return [
      {
        source: '/api/backend/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
