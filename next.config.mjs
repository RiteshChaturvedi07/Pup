/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'puppy.instabizweb.com',
      },
    ],
  },
};

export default nextConfig;
