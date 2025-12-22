/** @type {import('next').NextConfig} */
const bspName = process.env.NEXT_PUBLIC_BSP_NAME
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  basePath: process.env.NODE_ENV === 'development' ? '' : bspName,
}

module.exports = nextConfig
