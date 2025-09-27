'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { WalletConnector } from './WalletConnector'
import { formatNumber, calculateProgress, getReputationLevel } from '@/lib/utils'
import { calculateReputationScore } from '@/lib/reputation'
import { getAllChainTransactions } from '@/lib/blockchain'
import type { ReputationAnalysis } from '@/lib/types'
import { Trophy, TrendingUp, Activity, Award, RefreshCw } from 'lucide-react'

export function Dashboard() {
  const { address, isConnected } = useAccount()
  const [analysis, setAnalysis] = useState<ReputationAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeReputation = async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)

    try {
      const transactions = await getAllChainTransactions(address)
      const reputationAnalysis = calculateReputationScore(transactions)
      setAnalysis(reputationAnalysis)
    } catch (err) {
      setError('Failed to analyze reputation. Please try again.')
      console.error('Reputation analysis error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isConnected && address && !analysis) {
      analyzeReputation()
    }
  }, [isConnected, address])

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <WalletConnector />
      </div>
    )
  }

  const reputationLevel = analysis ? getReputationLevel(analysis.totalScore) : 'Beginner'
  const levelProgress = analysis ? calculateProgress(analysis.totalScore, 5000) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Welcome to RepVouch DAO</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Transform your on-chain activity into verifiable reputation badges and unlock exclusive Web3 opportunities.
        </p>
      </div>

      {/* Reputation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            <Trophy className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analysis ? formatNumber(analysis.totalScore) : '0'}
            </div>
            <p className="text-xs text-text-secondary">
              {reputationLevel} Level
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analysis ? formatNumber(analysis.transactionCount) : '0'}
            </div>
            <p className="text-xs text-text-secondary">
              Across {analysis ? analysis.chains.length : 0} chains
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analysis ? analysis.badges.length : '0'}
            </div>
            <p className="text-xs text-text-secondary">
              Achievement badges
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protocols</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analysis ? formatNumber(analysis.uniqueProtocols) : '0'}
            </div>
            <p className="text-xs text-text-secondary">
              Unique protocols used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reputation Progress */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>Reputation Progress</CardTitle>
          <CardDescription>
            Your journey to becoming a Web3 reputation master
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{reputationLevel}</span>
            <span className="text-sm text-text-secondary">
              {analysis ? `${Math.round(levelProgress)}%` : '0%'}
            </span>
          </div>
          <Progress value={levelProgress} className="w-full" />
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Current: {analysis ? formatNumber(analysis.totalScore) : '0'}</span>
            <span>Next: 5,000</span>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg">DeFi Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {formatNumber(analysis.defiScore)}
              </div>
              <p className="text-sm text-text-secondary mt-2">
                Based on DeFi protocol interactions
              </p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg">NFT Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {formatNumber(analysis.nftScore)}
              </div>
              <p className="text-sm text-text-secondary mt-2">
                Based on NFT collection and trading
              </p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardHeader>
              <CardTitle className="text-lg">Governance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {formatNumber(analysis.governanceScore)}
              </div>
              <p className="text-sm text-text-secondary mt-2">
                Based on DAO participation and voting
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Badges Preview */}
      {analysis && analysis.badges.length > 0 && (
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
            <CardDescription>
              Achievement badges earned through your on-chain activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysis.badges.map((badge) => (
                <Badge key={badge.id} variant="secondary" className="badge-glow">
                  {badge.title}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={analyzeReputation}
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Analysis
            </>
          )}
        </Button>
        <Button variant="outline" onClick={() => window.open('/badges', '_blank')}>
          View All Badges
        </Button>
      </div>

      {error && (
        <div className="text-center text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

