

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://graph.instagram.com https://gw.iagon.com https://maps.gstatic.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    connect-src 'self' https://maps.googleapis.com https://maps.gstatic.com https://graph.instagram.com https://gw.iagon.com https://naturedopesapi-production.up.railway.app http://localhost:3000 http://localhost:8080 ws://localhost:3000 wss://www.naturedopes.com wss://naturedopes.com;
    img-src 'self' blob: data: https://maps.googleapis.com https://graph.instagram.com https://gw.iagon.com *.cdninstagram.com https://maps.gstatic.com;
    media-src 'self' *.cdninstagram.com;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    worker-src 'self' blob:;
    upgrade-insecure-requests;
`

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

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


  



