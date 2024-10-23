/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: false },
  images: {
    domains: [
      'localhost',
      '192.168.2.14:1337',
      '192.168.2.14',
      'golden-skin-strapi-server.onrender.com',
      'res.cloudinary.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'golden-skin-strapi-server.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
