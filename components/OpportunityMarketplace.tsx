'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { formatNumber, formatDate } from '@/lib/utils'
import type { Opportunity } from '@/lib/types'
import { Briefcase, ExternalLink, Search, Filter, Users, Calendar, DollarSign, Award } from 'lucide-react'

// Mock opportunities data
const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'DeFi Protocol Beta Tester',
    description: 'Join our exclusive beta testing program for a revolutionary DeFi protocol. Help shape the future of decentralized finance.',
    requiredBadges: ['defi-pioneer'],
    reward: '$500 USDC + Protocol Tokens',
    applicants: 23,
    maxApplicants: 50,
    type: 'beta',
    postedBy: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    applicationLink: 'https://example.com/apply/defi-beta',
    expiryDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'NFT Community Curator',
    description: 'Curate and manage a premium NFT community. Help onboard new members and organize community events.',
    requiredBadges: ['nft-collector'],
    reward: '15% Commission on Sales',
    applicants: 45,
    maxApplicants: 100,
    type: 'bounty',
    postedBy: '0x8ba1f109551bD4328030126452617686',
    applicationLink: 'https://example.com/apply/nft-curator',
    expiryDate: new Date('2024-02-20'),
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '3',
    title: 'DAO Governance Consultant',
    description: 'Provide expert consultation on DAO governance structures and help implement best practices.',
    requiredBadges: ['governance-participant'],
    reward: '$2000 + Equity',
    applicants: 12,
    maxApplicants: 20,
    type: 'exclusive',
    postedBy: '0x9c2d4e8f1a5b7c3d6e8f2a4b6c8d9e1f',
    applicationLink: 'https://example.com/apply/dao-consultant',
    expiryDate: new Date('2024-02-10'),
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    title: 'Early Access to Launchpad',
    description: 'Get early access to our upcoming token launchpad with guaranteed allocation.',
    requiredBadges: ['early-adopter'],
    reward: 'Guaranteed Allocation + Bonus Tokens',
    applicants: 89,
    maxApplicants: 200,
    type: 'airdrop',
    postedBy: '0xa1b2c3d4e5f678901234567890abcdef',
    applicationLink: 'https://example.com/apply/launchpad',
    expiryDate: new Date('2024-02-25'),
    createdAt: new Date('2024-01-18'),
  },
]

export function OpportunityMarketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [opportunities] = useState<Opportunity[]>(mockOpportunities)

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || opp.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'airdrop': return 'bg-green-500/20 text-green-400'
      case 'beta': return 'bg-blue-500/20 text-blue-400'
      case 'bounty': return 'bg-purple-500/20 text-purple-400'
      case 'exclusive': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Opportunity Marketplace</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Discover exclusive Web3 opportunities that match your reputation profile and unlock your potential.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="metric-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
              >
                All
              </Button>
              <Button
                variant={selectedType === 'airdrop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('airdrop')}
              >
                Airdrops
              </Button>
              <Button
                variant={selectedType === 'beta' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('beta')}
              >
                Beta
              </Button>
              <Button
                variant={selectedType === 'bounty' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('bounty')}
              >
                Bounties
              </Button>
              <Button
                variant={selectedType === 'exclusive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('exclusive')}
              >
                Exclusive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="metric-card hover:bg-surface/90 transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={getTypeColor(opportunity.type)}>
                      {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {opportunity.requiredBadges.length} badge{opportunity.requiredBadges.length !== 1 ? 's' : ''} required
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-text-secondary hover:text-fg">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-text-secondary line-clamp-3">
                {opportunity.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-accent" />
                  <span className="font-medium">{opportunity.reward}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span>{opportunity.applicants}/{opportunity.maxApplicants || '∞'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Expires {formatDate(opportunity.expiryDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span>{opportunity.type}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-text-secondary mb-2">Required Badges:</p>
                <div className="flex flex-wrap gap-1">
                  {opportunity.requiredBadges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-xs">
                      {badge.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full btn-primary" asChild>
                <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card className="metric-card">
          <CardContent className="text-center py-12">
            <Briefcase className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Opportunities Found</h3>
            <p className="text-text-secondary mb-4">
              Try adjusting your search terms or filters to find more opportunities.
            </p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedType('all')
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* How It Works */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>How the Opportunity Marketplace Works</CardTitle>
          <CardDescription>
            Unlock exclusive opportunities based on your verified reputation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Earn Reputation</h4>
              <p className="text-sm text-text-secondary">
                Build your on-chain reputation through DeFi, NFT, and governance activities
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Discover Opportunities</h4>
              <p className="text-sm text-text-secondary">
                Browse curated opportunities that match your reputation profile
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Claim Rewards</h4>
              <p className="text-sm text-text-secondary">
                Apply and earn rewards from exclusive Web3 opportunities
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
