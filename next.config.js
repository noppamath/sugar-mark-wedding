/** @type {import('next').NextConfig} */

const nextConfig = {
  // Use standard Next.js server deployment (Vercel, Netlify, etc.)
  // API routes require a runtime, so we can't use static export
  // GitHub Pages alternative: Configure GitHub Actions to deploy to Vercel
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_MAX_FILE_SIZE: process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760',
    NEXT_PUBLIC_ALLOWED_FORMATS: process.env.NEXT_PUBLIC_ALLOWED_FORMATS || 'image/jpeg,image/png,image/webp',
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/photos',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/share',
        destination: '/upload',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
