/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipfs.io', 'arweave.net', 'gateway.pinata.cloud'],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'RepVouch DAO',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Web3 Reputation Platform',
  },
}

module.exports = nextConfig

