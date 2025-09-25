import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // allow images from your NestJS backend
  },
};

export default nextConfig;
