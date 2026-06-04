import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'superhandsome-nondynastically-india.ngrok-free.dev',
    'aware-envy-dejected.ngrok-free.dev'
  ],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "image.makewebcdn.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "1drv.ms",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "canadacentral1-mediap.svc.ms",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "w9bzpeofpetbsuv8.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
