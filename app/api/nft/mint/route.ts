import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Badge, NFTMetadata } from '@/lib/types'

interface MintRequest {
  address: string
  badgeId: string
  score: number
  achievementType: string
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ tokenId: string; transactionHash: string }>>> {
  try {
    const body: MintRequest = await request.json()
    const { address, badgeId, score, achievementType } = body

    if (!address || !badgeId || !score || !achievementType) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: address, badgeId, score, achievementType',
        },
        { status: 400 }
      )
    }

    // In production, this would:
    // 1. Validate the user's eligibility for the badge
    // 2. Generate NFT metadata and upload to IPFS
    // 3. Call the smart contract to mint the NFT
    // 4. Return the transaction hash and token ID

    // For demo purposes, we'll simulate the minting process
    const tokenId = `0x${Math.random().toString(16).substring(2, 10)}`
    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      data: {
        tokenId,
        transactionHash,
      },
      message: 'Badge minted successfully!',
    })
  } catch (error) {
    console.error('NFT minting error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to mint NFT. Please try again later.',
      },
      { status: 500 }
    )
  }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to mint NFTs.',
    },
    { status: 405 }
  )
}

