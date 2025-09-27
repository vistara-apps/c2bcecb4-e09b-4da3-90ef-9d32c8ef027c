// Smart contract ABIs and interaction utilities
// These would be generated from actual contract deployments

export const REPUTATION_BADGE_ABI = [
  // ERC-721 standard functions
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function setApprovalForAll(address operator, bool _approved)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data)',

  // Custom functions for reputation badges
  'function mint(address to, uint256 score, string memory achievementType) returns (uint256)',
  'function getBadgeInfo(uint256 tokenId) view returns (uint256 score, string memory achievementType, uint256 mintedAt)',
  'function getUserBadges(address user) view returns (uint256[] memory)',
  'function totalSupply() view returns (uint256)',
] as const

export const STAKING_CONTRACT_ABI = [
  // Staking functions
  'function stake(uint256 amount)',
  'function unstake(uint256 amount)',
  'function claimRewards()',
  'function getStakedAmount(address user) view returns (uint256)',
  'function getPendingRewards(address user) view returns (uint256)',
  'function getTotalStaked() view returns (uint256)',

  // Configuration
  'function minStakeAmount() view returns (uint256)',
  'function unstakingPeriod() view returns (uint256)',
  'function rewardRate() view returns (uint256)',
] as const

export const GOVERNANCE_CONTRACT_ABI = [
  // Proposal functions
  'function propose(address[] targets, uint256[] values, bytes[] calldatas, string description) returns (uint256)',
  'function execute(uint256 proposalId)',
  'function castVote(uint256 proposalId, uint8 support)',
  'function castVoteWithReason(uint256 proposalId, uint8 support, string reason)',

  // View functions
  'function getProposal(uint256 proposalId) view returns (tuple(uint256 id, address proposer, address[] targets, uint256[] values, bytes[] calldatas, string description, uint256 voteStart, uint256 voteEnd, uint256 forVotes, uint256 againstVotes, uint256 abstainVotes, bool executed))',
  'function getVotes(address account, uint256 blockNumber) view returns (uint256)',
  'function hasVoted(uint256 proposalId, address account) view returns (bool)',
  'function proposalThreshold() view returns (uint256)',
  'function votingPeriod() view returns (uint256)',
] as const

export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function totalSupply() view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
] as const

// Contract addresses (would be populated with actual deployed addresses)
export const CONTRACTS = {
  REPUTATION_BADGE: '0x0000000000000000000000000000000000000000',
  STAKING_CONTRACT: '0x0000000000000000000000000000000000000000',
  GOVERNANCE_CONTRACT: '0x0000000000000000000000000000000000000000',
  RVCH_TOKEN: '0x0000000000000000000000000000000000000000',
} as const

// Utility functions for contract interactions
export function getContractAddress(contractName: keyof typeof CONTRACTS): string {
  return CONTRACTS[contractName]
}

export function getContractAbi(contractName: keyof typeof CONTRACTS) {
  switch (contractName) {
    case 'REPUTATION_BADGE':
      return REPUTATION_BADGE_ABI
    case 'STAKING_CONTRACT':
      return STAKING_CONTRACT_ABI
    case 'GOVERNANCE_CONTRACT':
      return GOVERNANCE_CONTRACT_ABI
    case 'RVCH_TOKEN':
      return ERC20_ABI
    default:
      throw new Error(`Unknown contract: ${contractName}`)
  }
}

// Type definitions for contract interactions
export interface BadgeInfo {
  score: bigint
  achievementType: string
  mintedAt: bigint
}

export interface ProposalInfo {
  id: bigint
  proposer: string
  targets: string[]
  values: bigint[]
  calldatas: string[]
  description: string
  voteStart: bigint
  voteEnd: bigint
  forVotes: bigint
  againstVotes: bigint
  abstainVotes: bigint
  executed: boolean
}

export interface StakingInfo {
  stakedAmount: bigint
  pendingRewards: bigint
  lastStakeTime: bigint
  unstakeAvailableTime: bigint
}

