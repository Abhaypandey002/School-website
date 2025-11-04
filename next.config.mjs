/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true
  },
  images: {
    remotePatterns: [],
    unoptimized: true
  }
};

export default nextConfig;
