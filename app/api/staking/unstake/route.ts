import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse } from '@/lib/types'

interface UnstakeRequest {
  address: string
  amount: number
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ transactionHash: string; availableAt: number }>>> {
  try {
    const body: UnstakeRequest = await request.json()
    const { address, amount } = body

    if (!address || !amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid unstaking parameters',
        },
        { status: 400 }
      )
    }

    // In production, this would:
    // 1. Validate the user's staked amount
    // 2. Check unstaking period requirements
    // 3. Initiate the unstaking process
    // 4. Return the transaction hash and unlock time

    // For demo purposes, we'll simulate the unstaking process
    const transactionHash = `0x${Math.random().toString(16).substring(2, 66)}`
    const unstakingPeriod = 7 * 24 * 60 * 60 // 7 days in seconds
    const availableAt = Math.floor(Date.now() / 1000) + unstakingPeriod

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    return NextResponse.json({
      success: true,
      data: {
        transactionHash,
        availableAt,
      },
      message: `Unstaking initiated for ${amount} $RVCH tokens. Funds will be available in 7 days.`,
    })
  } catch (error) {
    console.error('Unstaking error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to unstake tokens. Please try again later.',
      },
      { status: 500 }
    )
  }
}

