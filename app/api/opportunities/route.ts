import { NextRequest, NextResponse } from 'next/server';
import { Opportunity } from '@/lib/types';

// Mock data for opportunities (in production, this would be stored in a database)
const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Early Access to DeFi Protocol',
    description: 'Get exclusive beta access to our new yield farming protocol with guaranteed APY.',
    requiredBadges: ['defi-master', 'early-adopter'],
    reward: '$500 in platform tokens',
    applicationLink: 'https://example.com/apply/defi-beta',
    postedBy: 'DeFi Protocol Team',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    applicants: 45,
    maxApplicants: 100,
    type: 'beta',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: '2',
    title: 'NFT Collection Airdrop',
    description: 'Exclusive airdrop for verified NFT collectors. Limited to top 1000 participants.',
    requiredBadges: ['nft-collector', 'expert-trader'],
    reward: 'Free NFT from our collection',
    applicationLink: 'https://example.com/apply/nft-airdrop',
    postedBy: 'NFT Project Alpha',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    applicants: 234,
    maxApplicants: 1000,
    type: 'airdrop',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '3',
    title: 'Governance Bounty Program',
    description: 'Earn rewards for participating in protocol governance and proposing improvements.',
    requiredBadges: ['governance-participant'],
    reward: 'Up to $1000 in tokens',
    applicationLink: 'https://example.com/apply/governance-bounty',
    postedBy: 'DAO Treasury',
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 60 * 1000), // 60 days from now
    applicants: 12,
    maxApplicants: 50,
    type: 'bounty',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
  {
    id: '4',
    title: 'VIP Community Access',
    description: 'Join our exclusive Web3 community with premium features and networking opportunities.',
    requiredBadges: ['legendary-trader', 'consistent-trader'],
    reward: 'Lifetime VIP membership',
    applicationLink: 'https://example.com/apply/vip-community',
    postedBy: 'Web3 Community Hub',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    applicants: 89,
    maxApplicants: 200,
    type: 'exclusive',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userBadges = searchParams.get('badges')?.split(',') || [];
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredOpportunities = MOCK_OPPORTUNITIES;

    // Filter by user badges if provided
    if (userBadges.length > 0) {
      filteredOpportunities = filteredOpportunities.filter(opportunity => {
        // Check if user has any of the required badges
        return opportunity.requiredBadges.some(requiredBadge =>
          userBadges.includes(requiredBadge)
        );
      });
    }

    // Filter by type if provided
    if (type) {
      filteredOpportunities = filteredOpportunities.filter(opportunity =>
        opportunity.type === type
      );
    }

    // Apply pagination
    const paginatedOpportunities = filteredOpportunities.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        opportunities: paginatedOpportunities,
        total: filteredOpportunities.length,
        hasMore: offset + limit < filteredOpportunities.length,
      },
    });

  } catch (error) {
    console.error('Opportunities fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const opportunityData = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'requiredBadges', 'reward', 'applicationLink', 'postedBy', 'type'];
    for (const field of requiredFields) {
      if (!opportunityData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new opportunity
    const newOpportunity: Opportunity = {
      id: (MOCK_OPPORTUNITIES.length + 1).toString(),
      title: opportunityData.title,
      description: opportunityData.description,
      requiredBadges: opportunityData.requiredBadges,
      reward: opportunityData.reward,
      applicationLink: opportunityData.applicationLink,
      postedBy: opportunityData.postedBy,
      expiryDate: new Date(opportunityData.expiryDate || Date.now() + 30 * 24 * 60 * 60 * 1000),
      applicants: 0,
      maxApplicants: opportunityData.maxApplicants || undefined,
      type: opportunityData.type,
      createdAt: new Date(),
    };

    // In production, save to database
    MOCK_OPPORTUNITIES.push(newOpportunity);

    return NextResponse.json({
      success: true,
      data: newOpportunity,
    });

  } catch (error) {
    console.error('Opportunity creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}

