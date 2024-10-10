/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com']
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
