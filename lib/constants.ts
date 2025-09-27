export const REPUTATION_THRESHOLDS = {
  BEGINNER: 0,
  INTERMEDIATE: 500,
  ADVANCED: 1000,
  EXPERT: 2000,
  MASTER: 5000,
} as const;

export const BADGE_TYPES = {
  DEFI: 'defi',
  NFT: 'nft',
  GOVERNANCE: 'governance',
  EARLY_ADOPTER: 'early-adopter',
} as const;

export const OPPORTUNITY_TYPES = {
  AIRDROP: 'airdrop',
  BETA: 'beta',
  BOUNTY: 'bounty',
  EXCLUSIVE: 'exclusive',
} as const;

export const RARITY_LEVELS = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
} as const;

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  BASE: 8453,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
} as const;

export const API_ENDPOINTS = {
  ETHERSCAN: 'https://api.etherscan.io/api',
  BASESCAN: 'https://api.basescan.org/api',
  POLYGONSCAN: 'https://api.polygonscan.com/api',
} as const;

export const CONTRACT_ADDRESSES = {
  RVCH_TOKEN: '0x...',
  BADGE_NFT: '0x...',
  STAKING: '0x...',
  GOVERNANCE: '0x...',
} as const;

export const STAKING_CONFIG = {
  MIN_STAKE: 10,
  UNSTAKING_PERIOD: 7 * 24 * 60 * 60, // 7 days in seconds
  BASE_APY: 12.5,
} as const;
