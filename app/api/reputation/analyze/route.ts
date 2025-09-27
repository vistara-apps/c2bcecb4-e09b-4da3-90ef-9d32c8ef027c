import { NextRequest, NextResponse } from 'next/server'
import { getAllChainTransactions, isValidAddress } from '@/lib/blockchain'
import { calculateReputationScore } from '@/lib/reputation'
import type { ApiResponse, ReputationAnalysis } from '@/lib/types'

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<ReputationAnalysis>>> {
  try {
    const body = await request.json()
    const { address } = body

    if (!address || !isValidAddress(address)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid wallet address provided',
        },
        { status: 400 }
      )
    }

    // Fetch transactions from all supported chains
    const transactions = await getAllChainTransactions(address)

    if (transactions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No transactions found for this address',
        },
        { status: 404 }
      )
    }

    // Calculate reputation score
    const analysis = calculateReputationScore(transactions)

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error('Reputation analysis error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze reputation. Please try again later.',
      },
      { status: 500 }
    )
  }
}

export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed. Use POST to analyze reputation.',
    },
    { status: 405 }
  )
}

