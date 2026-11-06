import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
//   compiler:{
// removeConsole: {
//   exclude:['error','warn']
// }
//   },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images:{
    remotePatterns:[{protocol: 'https' ,hostname: 'images.unsplash.com'}]
  }
};

export default nextConfig;
