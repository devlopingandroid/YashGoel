/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-icons"],
  async rewrites() {
    return [
      {
        source: "/case-study/:slug",
        destination: "/projects/:slug",
      },
    ];
  },
};

export default nextConfig;
