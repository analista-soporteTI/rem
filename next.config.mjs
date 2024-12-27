/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    TURSO_DATABASE_NAME: process.env.TURSO_DATABASE_NAME,
    TURSO_ORGANIZATION_NAME: process.env.TURSO_ORGANIZATION_NAME,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
    NEXT_PUBLIC_ALGOLIA_INDEX_NAME: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  async headers () {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none';"
          }
        ]
      }
    ]
  }
}

export default nextConfig
