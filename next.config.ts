// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 14.2+/15 için doğru anahtar
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
module.exports = {
  async redirects() {
    return [{ source: "/qr", destination: "/", permanent: true }];
  },
};
