import { NextRequest, NextResponse } from 'next/server'
import { getAllChainTransactions, isValidAddress } from '@/lib/blockchain'
import type { ApiResponse, Transaction } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<ApiResponse<Transaction[]>>> {
  try {
    const { address } = await params

    if (!address || !isValidAddress(address)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid wallet address provided',
        },
        { status: 400 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100) // Max 100
    const page = Math.max(parseInt(searchParams.get('page') || '1'), 1)

    // Fetch transactions from all supported chains
    const allTransactions = await getAllChainTransactions(address)

    if (allTransactions.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No transactions found for this address',
      })
    }

    // Sort by timestamp (most recent first) and paginate
    const sortedTransactions = allTransactions.sort((a, b) => b.timestamp - a.timestamp)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedTransactions,
    })
  } catch (error) {
    console.error('Transactions fetch error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch transactions. Please try again later.',
      },
      { status: 500 }
    )
  }
}

