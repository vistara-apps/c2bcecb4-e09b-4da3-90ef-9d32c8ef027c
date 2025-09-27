import { Transaction, ReputationAnalysis, Badge } from './types'
import { BADGE_TYPES, REPUTATION_THRESHOLDS } from './constants'

export function calculateReputationScore(transactions: Transaction[]): ReputationAnalysis {
  let defiScore = 0
  let nftScore = 0
  let governanceScore = 0
  let totalScore = 0

  const uniqueProtocols = new Set<string>()
  const chains = new Set<number>()
  let firstTransactionDate = new Date()
  let lastTransactionDate = new Date(0)

  // Analyze each transaction
  for (const tx of transactions) {
    chains.add(tx.chainId)

    // Update date range
    const txDate = new Date(tx.timestamp * 1000)
    if (txDate < firstTransactionDate) firstTransactionDate = txDate
    if (txDate > lastTransactionDate) lastTransactionDate = txDate

    // Extract contract address for protocol identification
    const contractAddress = tx.contractAddress || tx.to

    // DeFi scoring (simplified logic)
    if (isDeFiProtocol(contractAddress)) {
      defiScore += calculateDeFiScore(tx)
      uniqueProtocols.add(contractAddress)
    }

    // NFT scoring
    if (isNFTContract(contractAddress)) {
      nftScore += calculateNFTScore(tx)
    }

    // Governance scoring
    if (isGovernanceContract(contractAddress)) {
      governanceScore += calculateGovernanceScore(tx)
    }
  }

  // Calculate total score with weights
  totalScore = (defiScore * 0.4) + (nftScore * 0.3) + (governanceScore * 0.3)

  // Generate badges based on achievements
  const badges = generateBadges(transactions, {
    defiScore,
    nftScore,
    governanceScore,
    totalScore,
  })

  return {
    totalScore: Math.round(totalScore),
    defiScore: Math.round(defiScore),
    nftScore: Math.round(nftScore),
    governanceScore: Math.round(governanceScore),
    transactionCount: transactions.length,
    uniqueProtocols: uniqueProtocols.size,
    firstTransactionDate,
    lastTransactionDate,
    chains: Array.from(chains),
    badges,
  }
}

function isDeFiProtocol(address: string): boolean {
  // Simplified DeFi protocol detection
  // In production, this would use a comprehensive database of DeFi contracts
  const defiContracts = [
    // Uniswap, SushiSwap, etc. - would be populated with actual contract addresses
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // Example Uniswap V3 Factory
    '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', // Example Uniswap V2 Router
  ]

  return defiContracts.some(contract =>
    address.toLowerCase().includes(contract.toLowerCase())
  )
}

function isNFTContract(address: string): boolean {
  // Simplified NFT contract detection
  // In production, this would check contract bytecode or use NFT APIs
  return false // Placeholder - would implement actual NFT detection
}

function isGovernanceContract(address: string): boolean {
  // Simplified governance contract detection
  return false // Placeholder - would implement actual governance detection
}

function calculateDeFiScore(tx: Transaction): number {
  const value = parseFloat(tx.value) / 1e18 // Convert from wei

  // Base score from transaction value
  let score = Math.min(value * 10, 100)

  // Bonus for gas efficiency (lower gas price)
  const gasPrice = parseFloat(tx.gasPrice) / 1e9 // Convert to gwei
  if (gasPrice < 50) score *= 1.2

  return score
}

function calculateNFTScore(tx: Transaction): number {
  // NFT score based on transaction frequency and value
  const value = parseFloat(tx.value) / 1e18
  return Math.min(value * 5, 50)
}

function calculateGovernanceScore(tx: Transaction): number {
  // Governance score based on participation
  return 25 // Fixed score per governance action
}

function generateBadges(transactions: Transaction[], scores: {
  defiScore: number
  nftScore: number
  governanceScore: number
  totalScore: number
}): Badge[] {
  const badges: Badge[] = []

  // DeFi Pioneer Badge
  if (scores.defiScore >= BADGE_TYPES.DEFI_PIONEER.threshold) {
    badges.push({
      id: 'defi-pioneer',
      title: BADGE_TYPES.DEFI_PIONEER.name,
      description: BADGE_TYPES.DEFI_PIONEER.description,
      type: 'defi',
      score: scores.defiScore,
      rarity: BADGE_TYPES.DEFI_PIONEER.rarity,
    })
  }

  // NFT Collector Badge
  if (scores.nftScore >= BADGE_TYPES.NFT_COLLECTOR.threshold) {
    badges.push({
      id: 'nft-collector',
      title: BADGE_TYPES.NFT_COLLECTOR.name,
      description: BADGE_TYPES.NFT_COLLECTOR.description,
      type: 'nft',
      score: scores.nftScore,
      rarity: BADGE_TYPES.NFT_COLLECTOR.rarity,
    })
  }

  // Governance Participant Badge
  if (scores.governanceScore >= BADGE_TYPES.GOVERNANCE_PARTICIPANT.threshold) {
    badges.push({
      id: 'governance-participant',
      title: BADGE_TYPES.GOVERNANCE_PARTICIPANT.name,
      description: BADGE_TYPES.GOVERNANCE_PARTICIPANT.description,
      type: 'governance',
      score: scores.governanceScore,
      rarity: BADGE_TYPES.GOVERNANCE_PARTICIPANT.rarity,
    })
  }

  // Early Adopter Badge (based on first transaction date)
  const firstTx = transactions.sort((a, b) => a.timestamp - b.timestamp)[0]
  if (firstTx) {
    const firstTxDate = new Date(firstTx.timestamp * 1000)
    const baseLaunchDate = new Date('2023-07-13') // Base mainnet launch date

    if (firstTxDate <= baseLaunchDate) {
      badges.push({
        id: 'early-adopter',
        title: BADGE_TYPES.EARLY_ADOPTER.name,
        description: BADGE_TYPES.EARLY_ADOPTER.description,
        type: 'early-adopter',
        score: 100,
        rarity: BADGE_TYPES.EARLY_ADOPTER.rarity,
      })
    }
  }

  return badges
}

export function getReputationLevel(score: number): string {
  if (score >= REPUTATION_THRESHOLDS.MASTER) return 'Master'
  if (score >= REPUTATION_THRESHOLDS.EXPERT) return 'Expert'
  if (score >= REPUTATION_THRESHOLDS.ADVANCED) return 'Advanced'
  if (score >= REPUTATION_THRESHOLDS.INTERMEDIATE) return 'Intermediate'
  return 'Beginner'
}

export function getNextLevelThreshold(currentScore: number): number {
  if (currentScore < REPUTATION_THRESHOLDS.INTERMEDIATE) return REPUTATION_THRESHOLDS.INTERMEDIATE
  if (currentScore < REPUTATION_THRESHOLDS.ADVANCED) return REPUTATION_THRESHOLDS.ADVANCED
  if (currentScore < REPUTATION_THRESHOLDS.EXPERT) return REPUTATION_THRESHOLDS.EXPERT
  if (currentScore < REPUTATION_THRESHOLDS.MASTER) return REPUTATION_THRESHOLDS.MASTER
  return REPUTATION_THRESHOLDS.MASTER
}

export function calculateLevelProgress(currentScore: number): number {
  const currentLevel = getReputationLevel(currentScore)
  const nextThreshold = getNextLevelThreshold(currentScore)

  if (currentLevel === 'Master') return 100

  const prevThreshold = getPreviousLevelThreshold(currentScore)
  const progress = ((currentScore - prevThreshold) / (nextThreshold - prevThreshold)) * 100

  return Math.min(Math.max(progress, 0), 100)
}

function getPreviousLevelThreshold(score: number): number {
  if (score >= REPUTATION_THRESHOLDS.MASTER) return REPUTATION_THRESHOLDS.EXPERT
  if (score >= REPUTATION_THRESHOLDS.EXPERT) return REPUTATION_THRESHOLDS.ADVANCED
  if (score >= REPUTATION_THRESHOLDS.ADVANCED) return REPUTATION_THRESHOLDS.INTERMEDIATE
  if (score >= REPUTATION_THRESHOLDS.INTERMEDIATE) return REPUTATION_THRESHOLDS.BEGINNER
  return REPUTATION_THRESHOLDS.BEGINNER
}

