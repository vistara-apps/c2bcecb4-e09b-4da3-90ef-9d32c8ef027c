import { createPublicClient, http, formatEther, parseEther } from 'viem'
import { base, mainnet, polygon, arbitrum, optimism } from 'viem/chains'
import { SUPPORTED_CHAINS, API_ENDPOINTS } from './constants'
import type { Transaction, ChainConfig } from './types'

export const publicClients = {
  [base.id]: createPublicClient({
    chain: base,
    transport: http(SUPPORTED_CHAINS.BASE.rpcUrl),
  }),
  [mainnet.id]: createPublicClient({
    chain: mainnet,
    transport: http(SUPPORTED_CHAINS.ETHEREUM.rpcUrl),
  }),
  [polygon.id]: createPublicClient({
    chain: polygon,
    transport: http(SUPPORTED_CHAINS.POLYGON.rpcUrl),
  }),
  [arbitrum.id]: createPublicClient({
    chain: arbitrum,
    transport: http(SUPPORTED_CHAINS.ARBITRUM.rpcUrl),
  }),
  [optimism.id]: createPublicClient({
    chain: optimism,
    transport: http(SUPPORTED_CHAINS.OPTIMISM.rpcUrl),
  }),
}

export async function getBalance(address: string, chainId: number): Promise<string> {
  try {
    const client = publicClients[chainId as keyof typeof publicClients]
    if (!client) throw new Error(`Unsupported chain: ${chainId}`)

    const balance = await client.getBalance({ address: address as `0x${string}` })
    return formatEther(balance)
  } catch (error) {
    console.error('Error fetching balance:', error)
    return '0'
  }
}

export async function getTransactions(
  address: string,
  chainConfig: ChainConfig,
  page: number = 1,
  limit: number = 20
): Promise<Transaction[]> {
  try {
    const apiKey = chainConfig.apiKey
    if (!apiKey) throw new Error(`API key not configured for ${chainConfig.name}`)

    const params = new URLSearchParams({
      module: 'account',
      action: 'txlist',
      address,
      startblock: '0',
      endblock: '99999999',
      page: page.toString(),
      offset: limit.toString(),
      sort: 'desc',
      apikey: apiKey,
    })

    const response = await fetch(`${chainConfig.blockExplorer.replace('https://', 'https://api.')}/api?${params}`)
    const data = await response.json()

    if (data.status !== '1') {
      throw new Error(data.message || 'Failed to fetch transactions')
    }

    return data.result.map((tx: any) => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      timestamp: parseInt(tx.timeStamp),
      chainId: chainConfig.id,
      blockNumber: parseInt(tx.blockNumber),
      gasUsed: tx.gasUsed,
      gasPrice: tx.gasPrice,
      contractAddress: tx.contractAddress || undefined,
    }))
  } catch (error) {
    console.error(`Error fetching transactions for ${chainConfig.name}:`, error)
    return []
  }
}

export async function getAllChainTransactions(
  address: string,
  chains: ChainConfig[] = Object.values(SUPPORTED_CHAINS)
): Promise<Transaction[]> {
  const allTransactions: Transaction[] = []

  for (const chain of chains) {
    try {
      const transactions = await getTransactions(address, chain, 1, 50)
      allTransactions.push(...transactions)
    } catch (error) {
      console.error(`Failed to fetch transactions for ${chain.name}:`, error)
    }
  }

  // Sort by timestamp (most recent first)
  return allTransactions.sort((a, b) => b.timestamp - a.timestamp)
}

export function formatTransactionValue(value: string, decimals: number = 18): string {
  try {
    return formatEther(BigInt(value))
  } catch {
    return '0'
  }
}

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!isValidAddress(address)) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export async function getGasPrice(chainId: number): Promise<string> {
  try {
    const client = publicClients[chainId as keyof typeof publicClients]
    if (!client) throw new Error(`Unsupported chain: ${chainId}`)

    const gasPrice = await client.getGasPrice()
    return formatEther(gasPrice)
  } catch (error) {
    console.error('Error fetching gas price:', error)
    return '0'
  }
}

export async function estimateGas(
  chainId: number,
  from: string,
  to: string,
  value: string,
  data?: string
): Promise<string> {
  try {
    const client = publicClients[chainId as keyof typeof publicClients]
    if (!client) throw new Error(`Unsupported chain: ${chainId}`)

    const gasEstimate = await client.estimateGas({
      account: from as `0x${string}`,
      to: to as `0x${string}`,
      value: parseEther(value),
      data: data as `0x${string}` || '0x',
    })

    return gasEstimate.toString()
  } catch (error) {
    console.error('Error estimating gas:', error)
    return '21000' // Default gas limit
  }
}

