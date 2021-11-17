/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  // acá se definen env variables que estarán disponibles solo para el front
  env: {
    BACKEND_URL: "http://localhost:5000/api",
  },
};
