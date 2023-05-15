/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  images: {
    domains: [
      "infura-ipfs.io",
      "www.gimbalabs.com",
      "res.cloudinary.com"
    ]
  },
}

module.exports = nextConfig
