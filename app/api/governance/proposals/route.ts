import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Proposal } from '@/lib/types'

// Mock data for demonstration
const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Increase reputation scoring weight for DeFi activities',
    description: 'Proposal to adjust the reputation scoring algorithm to give more weight to DeFi participation, recognizing the importance of decentralized finance in the Web3 ecosystem.',
    proposer: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    voteStart: new Date('2024-01-15T00:00:00Z'),
    voteEnd: new Date('2024-01-22T00:00:00Z'),
    forVotes: '125000',
    againstVotes: '45000',
    abstainVotes: '15000',
    executed: false,
    status: 'active',
  },
  {
    id: '2',
    title: 'Add support for Arbitrum One chain',
    description: 'Expand RepVouch DAO to support Arbitrum One, allowing users to earn reputation from their Arbitrum transactions and activities.',
    proposer: '0x8ba1f109551bD4328030126452617686',
    voteStart: new Date('2024-01-10T00:00:00Z'),
    voteEnd: new Date('2024-01-17T00:00:00Z'),
    forVotes: '98000',
    againstVotes: '12000',
    abstainVotes: '8000',
    executed: true,
    status: 'passed',
  },
  {
    id: '3',
    title: 'Implement quarterly badge airdrops',
    description: 'Introduce quarterly airdrops of special edition reputation badges to reward consistent platform participation and engagement.',
    proposer: '0x9c2d4e8f1a5b7c3d6e8f2a4b6c8d9e1f',
    voteStart: new Date('2024-01-20T00:00:00Z'),
    voteEnd: new Date('2024-01-27T00:00:00Z'),
    forVotes: '0',
    againstVotes: '0',
    abstainVotes: '0',
    executed: false,
    status: 'active',
  },
]

export async function GET(): Promise<NextResponse<ApiResponse<Proposal[]>>> {
  try {
    // In production, this would fetch from the governance contract
    return NextResponse.json({
      success: true,
      data: mockProposals,
    })
  } catch (error) {
    console.error('Proposals fetch error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch proposals. Please try again later.',
      },
      { status: 500 }
    )
  }
}

interface CreateProposalRequest {
  title: string
  description: string
  proposer: string
  targets: string[]
  values: string[]
  calldatas: string[]
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<{ proposalId: string }>>> {
  try {
    const body: CreateProposalRequest = await request.json()
    const { title, description, proposer, targets, values, calldatas } = body

    if (!title || !description || !proposer) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: title, description, proposer',
        },
        { status: 400 }
      )
    }

    // In production, this would:
    // 1. Validate the proposer's voting power
    // 2. Check proposal threshold requirements
    // 3. Call the governance contract to create the proposal
    // 4. Return the proposal ID

    // For demo purposes, we'll simulate proposal creation
    const proposalId = (mockProposals.length + 1).toString()

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      data: {
        proposalId,
      },
      message: 'Proposal created successfully!',
    })
  } catch (error) {
    console.error('Proposal creation error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create proposal. Please try again later.',
      },
      { status: 500 }
    )
  }
}

