/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // swcMinify: true,
  // acá se definen env variables que estarán disponibles solo para el front
  env: {
    BACKEND_URL:
      process.env.NODE_ENV == "production"
        ? "https://api.cliffdev.com/api"
        : "http://localhost:5000/api",
    WS_URL:
      process.env.NODE_ENV == "production"
        ? "wss://api.cliffdev.com"
        : "ws://localhost:5000",
  },
};
