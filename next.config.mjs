/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const config = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const pwaConfig = withPWA(config);

const nextConfig = {
  ...pwaConfig,
  reactStrictMode: true,
};

export default nextConfig;
