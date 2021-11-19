/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // acá se definen env variables que estarán disponibles solo para el front
  env: {
    BACKEND_URL:
      process.env.NODE_ENV == "production"
        ? "https://ec2-18-216-243-84.us-east-2.compute.amazonaws.com:5000/api"
        : "http://localhost:5000/api",
  },
};
