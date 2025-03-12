import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  images: {
    domains: ["upload.wikimedia.org"], // Ajoute les domaines autorisés ici
  },
});

export default nextConfig;
