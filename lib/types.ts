export interface User {
  id: string;
  walletAddress: string;
  ensName?: string;
  reputationScore: number;
  badges: string[];
  stakedTokens: number;
}

export interface Badge {
  id: string;
  tokenId?: string;
  title: string;
  description: string;
  type: 'defi' | 'nft' | 'governance' | 'early-adopter';
  score: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  scoreAtMint?: number;
  achievementType?: string;
  metadataURI?: string;
  mintTimestamp?: Date;
  mintedAt?: Date;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  requiredBadges: string[];
  reward: string;
  applicationLink: string;
  postedBy: string;
  expiryDate: Date;
  applicants: number;
  maxApplicants?: number;
  type: 'airdrop' | 'beta' | 'bounty' | 'exclusive';
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: Date;
  chainId: number;
}

export interface StakingInfo {
  stakedAmount: number;
  rewards: number;
  apy: number;
  unstakingPeriod: number;
}

export interface ReputationAnalysis {
  totalScore: number;
  defiScore: number;
  nftScore: number;
  governanceScore: number;
  transactionCount: number;
  uniqueProtocols: number;
  firstTransactionDate: Date;
}
