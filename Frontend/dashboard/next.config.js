const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the CaseSensitivePathsPlugin
    config.plugins.push(new CaseSensitivePathsPlugin());

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
