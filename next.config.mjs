/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.137.93', '192.168.1.25', '10.238.120.132', '127.0.0.1', 'localhost'],
}

export default nextConfig
