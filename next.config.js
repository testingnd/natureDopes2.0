

const cspHeader = `
    default-src 'self' http://localhost:3000 https://localhost:3000 http://naturedopes.com http://www.naturedopes.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://graph.instagram.com https://gw.iagon.com https://maps.gstatic.com https://next-auth.js.org https://www.naturedopes.com https://naturedopes.com http://naturedopes.com http://www.naturedopes.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    connect-src https://maps.googleapis.com https://maps.gstatic.com https://graph.instagram.com http://localhost:3000 https://localhost:3000 https://www.naturedopes.com https://naturedopes.com ws://localhost:3000 ws://www.naturedopes.com ws://naturedopes.com http://naturedopes.com http://www.naturedopes.com;
    media-src *.cdninstagram.com;
    img-src 'self' 'unsafe-inline' blob: data: https://maps.googleapis.com https://graph.instagram.com  *.cdninstagram.com https://maps.gstatic.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

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
        hostname: '**.cdninstagram.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-2.cdninstagram.com',
        port: '',
        pathname: '**'
      }
    ],
  },

  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
 
  typescript: {
  
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },


  reactStrictMode: false,


})

module.exports = nextConfig


  



