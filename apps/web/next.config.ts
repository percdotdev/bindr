import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    agentUpgrade: 'latest',
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['@workspace/ui', '@workspace/cs2'],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
