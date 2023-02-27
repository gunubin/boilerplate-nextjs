/** @type {import('next').NextConfig} */
const withRoutes = require('nextjs-routes/config')();

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};

module.exports = withRoutes(nextConfig);
