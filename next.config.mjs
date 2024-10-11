/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', '192.168.2.14:1337', '192.168.2.14'],
  },
};

export default nextConfig;
