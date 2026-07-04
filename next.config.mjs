/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Prevents server-side image processing issues in dev/standalone environments
  },
};

export default nextConfig;
