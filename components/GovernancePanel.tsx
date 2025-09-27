'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Input } from './ui/input'
import { formatNumber, formatDate } from '@/lib/utils'
import type { Proposal } from '@/lib/types'
import { Vote, Plus, TrendingUp, TrendingDown, Clock, Users, CheckCircle, XCircle } from 'lucide-react'

export function GovernancePanel() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    // Simulate API call
    const fetchProposals = async () => {
      setIsLoading(true)
      // In production, this would call the governance API
      await new Promise(resolve => setTimeout(resolve, 1000))

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

      setProposals(mockProposals)
      setIsLoading(false)
    }

    fetchProposals()
  }, [])

  const handleVote = async (proposalId: string, support: number) => {
    // In production, this would call the voting API
    alert(`Vote cast for proposal ${proposalId} with support: ${support}`)
  }

  const handleCreateProposal = async () => {
    if (!newProposal.title || !newProposal.description) return

    // In production, this would call the create proposal API
    alert('Proposal created successfully!')
    setNewProposal({ title: '', description: '' })
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400'
      case 'passed': return 'bg-green-500/20 text-green-400'
      case 'failed': return 'bg-red-500/20 text-red-400'
      case 'executed': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />
      case 'passed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'executed': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading governance proposals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">DAO Governance</h1>
          <p className="text-lg text-text-secondary">
            Participate in shaping the future of RepVouch DAO
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Proposal
        </Button>
      </div>

      {/* Create Proposal Form */}
      {showCreateForm && (
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>Create New Proposal</CardTitle>
            <CardDescription>
              Propose changes to the RepVouch DAO platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Proposal Title</label>
              <Input
                placeholder="Enter proposal title"
                value={newProposal.title}
                onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea
                className="w-full h-32 px-3 py-2 text-sm bg-background border border-input rounded-md resize-none"
                placeholder="Describe your proposal in detail"
                value={newProposal.description}
                onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateProposal} className="btn-primary">
                Submit Proposal
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Proposals List */}
      <div className="space-y-6">
        {proposals.map((proposal) => {
          const totalVotes = parseInt(proposal.forVotes) + parseInt(proposal.againstVotes) + parseInt(proposal.abstainVotes)
          const forPercentage = totalVotes > 0 ? (parseInt(proposal.forVotes) / totalVotes) * 100 : 0
          const againstPercentage = totalVotes > 0 ? (parseInt(proposal.againstVotes) / totalVotes) * 100 : 0

          return (
            <Card key={proposal.id} className="metric-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusIcon(proposal.status)}
                        <span className="ml-1 capitalize">{proposal.status}</span>
                      </Badge>
                      <span className="text-sm text-text-secondary">
                        Proposed by {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-text-secondary">{proposal.description}</p>

                {/* Voting Period */}
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Started: {formatDate(proposal.voteStart)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Ends: {formatDate(proposal.voteEnd)}</span>
                  </div>
                </div>

                {/* Vote Results */}
                {totalVotes > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>For: {formatNumber(parseInt(proposal.forVotes))}</span>
                      <span>Against: {formatNumber(parseInt(proposal.againstVotes))}</span>
                      <span>Abstain: {formatNumber(parseInt(proposal.abstainVotes))}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm">For ({forPercentage.toFixed(1)}%)</span>
                        <Progress value={forPercentage} className="flex-1 h-2" />
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <span className="text-sm">Against ({againstPercentage.toFixed(1)}%)</span>
                        <Progress value={againstPercentage} className="flex-1 h-2" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Voting Actions */}
                {proposal.status === 'active' && (
                  <div className="flex gap-2 pt-4 border-t border-gray-700">
                    <Button
                      onClick={() => handleVote(proposal.id, 1)}
                      className="btn-primary flex-1"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Vote For
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, 0)}
                      variant="outline"
                      className="flex-1"
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Vote Against
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, 2)}
                      variant="secondary"
                      className="flex-1"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Abstain
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {proposals.length === 0 && (
        <Card className="metric-card">
          <CardContent className="text-center py-12">
            <Vote className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Proposals Yet</h3>
            <p className="text-text-secondary mb-4">
              Be the first to create a proposal and shape the future of RepVouch DAO.
            </p>
            <Button onClick={() => setShowCreateForm(true)} className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create First Proposal
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Governance Info */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>How DAO Governance Works</CardTitle>
          <CardDescription>
            Participate in decentralized decision-making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Vote className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Stake & Vote</h4>
              <p className="text-sm text-text-secondary">
                Stake $RVCH tokens to gain voting power and participate in governance
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Create Proposals</h4>
              <p className="text-sm text-text-secondary">
                Submit proposals for platform improvements and new features
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Community Driven</h4>
              <p className="text-sm text-text-secondary">
                Decisions are made collectively by the community of stakers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

