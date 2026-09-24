/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};
export default nextConfig;
