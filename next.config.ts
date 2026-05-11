import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Forced cache restart 1
  reactCompiler: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
  serverActions: {
    bodySizeLimit: '500mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default withPayload(nextConfig);
