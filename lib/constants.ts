import { ChainConfig } from './types'

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  ETHEREUM: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/',
    blockExplorer: 'https://etherscan.io',
    apiKey: process.env.ETHERSCAN_API_KEY,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  BASE: {
    id: 8453,
    name: 'Base',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    apiKey: process.env.BASESCAN_API_KEY,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
    apiKey: process.env.POLYGONSCAN_API_KEY,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  ARBITRUM: {
    id: 42161,
    name: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  OPTIMISM: {
    id: 10,
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
}

export const CONTRACT_ADDRESSES = {
  REPUTATION_BADGE: '0x...', // Deployed badge NFT contract
  STAKING_CONTRACT: '0x...', // Staking contract for $RVCH
  GOVERNANCE_CONTRACT: '0x...', // Governance contract
  RVCH_TOKEN: '0x...', // $RVCH token contract
}

export const STAKING_CONFIG = {
  MIN_STAKE: 10, // Minimum $RVCH to stake
  UNSTAKING_PERIOD: 7 * 24 * 60 * 60, // 7 days in seconds
  BASE_APY: 12.5, // Base annual percentage yield
  REWARD_CLAIM_COOLDOWN: 24 * 60 * 60, // 24 hours between claims
}

export const REPUTATION_THRESHOLDS = {
  BEGINNER: 0,
  INTERMEDIATE: 500,
  ADVANCED: 1000,
  EXPERT: 2000,
  MASTER: 5000,
}

export const BADGE_TYPES = {
  DEFI_PIONEER: {
    name: 'DeFi Pioneer',
    description: 'Completed over 100 DeFi transactions',
    threshold: 100,
    rarity: 'rare' as const,
  },
  NFT_COLLECTOR: {
    name: 'NFT Collector',
    description: 'Owns 25+ NFTs from verified collections',
    threshold: 25,
    rarity: 'common' as const,
  },
  GOVERNANCE_PARTICIPANT: {
    name: 'Governance Participant',
    description: 'Voted in 10+ DAO proposals',
    threshold: 10,
    rarity: 'epic' as const,
  },
  EARLY_ADOPTER: {
    name: 'Early Adopter',
    description: 'Active since the first month of Base',
    threshold: 1,
    rarity: 'legendary' as const,
  },
}

export const API_ENDPOINTS = {
  ETHERSCAN: 'https://api.etherscan.io/api',
  BASESCAN: 'https://api.basescan.org/api',
  POLYGONSCAN: 'https://api.polygonscan.com/api',
  IPFS_GATEWAY: 'https://ipfs.io/ipfs/',
  ARWEAVE_GATEWAY: 'https://arweave.net/',
}

export const GOVERNANCE_CONFIG = {
  PROPOSAL_THRESHOLD: 1000, // Minimum $RVCH to create proposal
  VOTING_PERIOD: 7 * 24 * 60 * 60, // 7 days in seconds
  EXECUTION_DELAY: 2 * 24 * 60 * 60, // 2 days in seconds
  QUORUM_PERCENTAGE: 10, // 10% of total staked tokens
}

export const NFT_CONFIG = {
  CONTRACT_NAME: 'RepVouch Reputation Badge',
  CONTRACT_SYMBOL: 'RVB',
  BASE_URI: 'ipfs://',
  MAX_SUPPLY: 10000,
}

export const UI_CONFIG = {
  ITEMS_PER_PAGE: 20,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
}

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/repvouch',
  DISCORD: 'https://discord.gg/repvouch',
  GITHUB: 'https://github.com/vistara-apps/repvouch-dao',
  DOCS: 'https://docs.repvouch.io',
}

export const ANALYTICS_CONFIG = {
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
}

