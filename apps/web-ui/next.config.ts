import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages; the app must stay server-feature-free. See issue #77.
  output: "export",
  reactCompiler: true,
};

export default nextConfig;
