/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f6oujhgi9dzrtqrk.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
