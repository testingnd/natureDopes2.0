


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-cdg4-3.cdninstagram.com',
        port: '',
        pathname: '**'
        
      },
      {
        protocol: 'https',
        hostname: 'scontent-cdg4-2.cdninstagram.com',
        port: '',
        pathname: '**'
        
      },
      {
        protocol: 'https',
        hostname: 'scontent-cdg4-1.cdninstagram.com',
        port: '',
        pathname: '**'
        
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        port: '',
        pathname: '**'
      }
    ],
  },

  reactStrictMode: false,


})

module.exports = nextConfig


  



