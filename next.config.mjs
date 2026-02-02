/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.edilportale.com' },
      { protocol: 'https', hostname: 'aurorahomeluxury.co.uk' },
    ],
  },
}

export default nextConfig
