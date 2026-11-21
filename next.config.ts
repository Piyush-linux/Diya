import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos are served from Unsplash's CDN, which resizes them itself.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
