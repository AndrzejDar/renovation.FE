/** @type {import('next').NextConfig} */

const TerserPlugin = require("terser-webpack-plugin");

const nextConfig = {
  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    if (!dev && !isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: {
              // Remove console logs from prod build
              drop_console: true,
            },
          },
        }),
      ];
    }

    return config;
  },
  images: {
    domains: ["www.buglo.pl", "api.buglo.dev3.muchmore.pl", "localhost"],
  },
};

module.exports = nextConfig;
