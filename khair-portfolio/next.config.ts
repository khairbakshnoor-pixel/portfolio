import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "1";
const config: NextConfig = {
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),
  images: { unoptimized: staticExport },
  poweredByHeader: false,
};
export default config;
