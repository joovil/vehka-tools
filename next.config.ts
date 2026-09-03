import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Standalone output is for the self-hosted Docker image (Dockerfile.prod).
  // Vercel builds its own output and does not support standalone.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default withNextIntl(nextConfig);
