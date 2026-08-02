/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cpus: 1,
    workerThreads: false,
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@next/swc-*/**',
        'node_modules/typescript/**',
        'node_modules/@swc/**',
      ],
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'alfaengenhariama.com.br' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
};

export default nextConfig;
