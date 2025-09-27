export interface User {
  walletAddress: string
  ensName?: string
  reputationScore: number
  badges: string[]
  stakedTokens: number
  joinedAt: Date
  lastActivity: Date
}

export interface Badge {
  id: string
  tokenId?: string
  title: string
  description: string
  type: 'defi' | 'nft' | 'governance' | 'early-adopter'
  score: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  mintedAt?: Date
  metadataURI?: string
}

export interface Opportunity {
  id: string
  title: string
  description: string
  requiredBadges: string[]
  reward: string
  applicants: number
  maxApplicants?: number
  type: 'airdrop' | 'beta' | 'bounty' | 'exclusive'
  postedBy: string
  applicationLink: string
  expiryDate: Date
  createdAt: Date
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  chainId: number
  blockNumber: number
  gasUsed: string
  gasPrice: string
  contractAddress?: string
  tokenSymbol?: string
  tokenDecimal?: number
}

export interface ReputationAnalysis {
  totalScore: number
  defiScore: number
  nftScore: number
  governanceScore: number
  transactionCount: number
  uniqueProtocols: number
  firstTransactionDate: Date
  lastTransactionDate: Date
  chains: number[]
  badges: Badge[]
}

export interface Proposal {
  id: string
  title: string
  description: string
  proposer: string
  voteStart: Date
  voteEnd: Date
  forVotes: string
  againstVotes: string
  abstainVotes: string
  executed: boolean
  status: 'active' | 'passed' | 'failed' | 'executed'
  calldata?: string
}

export interface StakingInfo {
  stakedAmount: number
  rewards: number
  apy: number
  unstakingPeriod: number
  lastRewardClaim: Date
}

export interface GovernanceVote {
  proposalId: string
  voter: string
  support: number // 0 = against, 1 = for, 2 = abstain
  votes: string
  timestamp: Date
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
  external_url?: string
}

export interface ChainConfig {
  id: number
  name: string
  rpcUrl: string
  blockExplorer: string
  apiKey?: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface WalletState {
  isConnected: boolean
  address?: string
  chainId?: number
  balance?: string
  ensName?: string
}

