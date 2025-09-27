'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { WalletConnector } from './WalletConnector'
import { calculateReputationScore } from '@/lib/reputation'
import { getAllChainTransactions } from '@/lib/blockchain'
import type { ReputationAnalysis } from '@/lib/types'
import { Award, Sparkles, CheckCircle, Loader2 } from 'lucide-react'

export function MintBadge() {
  const { address, isConnected } = useAccount()
  const [analysis, setAnalysis] = useState<ReputationAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mintingBadge, setMintingBadge] = useState<string | null>(null)
  const [mintedBadges, setMintedBadges] = useState<Set<string>>(new Set())

  const analyzeForMinting = async () => {
    if (!address) return

    setIsAnalyzing(true)
    try {
      const transactions = await getAllChainTransactions(address)
      const reputationAnalysis = calculateReputationScore(transactions)
      setAnalysis(reputationAnalysis)
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const mintBadge = async (badgeId: string) => {
    if (!analysis) return

    setMintingBadge(badgeId)
    try {
      // Simulate minting delay
      await new Promise(resolve => setTimeout(resolve, 3000))

      // In production, this would call the NFT minting API
      setMintedBadges(prev => new Set(prev).add(badgeId))
    } catch (error) {
      console.error('Minting error:', error)
    } finally {
      setMintingBadge(null)
    }
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <WalletConnector />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Mint Your Reputation Badges</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Transform your on-chain achievements into verifiable NFTs that showcase your Web3 expertise.
        </p>
      </div>

      {/* Analysis Section */}
      {!analysis && (
        <Card className="metric-card">
          <CardHeader className="text-center">
            <CardTitle>Analyze Your Reputation</CardTitle>
            <CardDescription>
              First, let's analyze your on-chain activity to see which badges you qualify for
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              onClick={analyzeForMinting}
              disabled={isAnalyzing}
              className="btn-primary"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Reputation
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Badge Minting Section */}
      {analysis && (
        <div className="space-y-6">
          <Card className="metric-card">
            <CardHeader>
              <CardTitle>Your Reputation Score: {analysis.totalScore}</CardTitle>
              <CardDescription>
                You qualify for {analysis.badges.length} badge{analysis.badges.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.badges.map((badge) => {
              const isMinted = mintedBadges.has(badge.id)
              const isMinting = mintingBadge === badge.id

              return (
                <Card key={badge.id} className="metric-card relative overflow-hidden">
                  {isMinted && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-accent" />
                      <div>
                        <CardTitle className="text-lg">{badge.title}</CardTitle>
                        <Badge
                          variant={badge.rarity === 'legendary' ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {badge.rarity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-text-secondary">{badge.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span>Score Required:</span>
                      <span className="font-mono">{badge.score}</span>
                    </div>

                    <Button
                      onClick={() => mintBadge(badge.id)}
                      disabled={isMinted || isMinting}
                      className="w-full btn-primary"
                      variant={isMinted ? 'secondary' : 'default'}
                    >
                      {isMinting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Minting...
                        </>
                      ) : isMinted ? (
                        'Minted ✓'
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Mint Badge
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {analysis.badges.length === 0 && (
            <Card className="metric-card">
              <CardContent className="text-center py-12">
                <Award className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Badges Available Yet</h3>
                <p className="text-text-secondary mb-4">
                  Keep participating in DeFi, NFTs, and governance to earn your first reputation badge!
                </p>
                <Button onClick={analyzeForMinting} variant="outline">
                  Refresh Analysis
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Info Section */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>How Badge Minting Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Analyze Activity</h4>
              <p className="text-sm text-text-secondary">
                We scan your on-chain history across multiple blockchains
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Earn Badges</h4>
              <p className="text-sm text-text-secondary">
                Qualify for badges based on your DeFi, NFT, and governance activity
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Mint NFTs</h4>
              <p className="text-sm text-text-secondary">
                Mint your achievements as verifiable NFTs on the blockchain
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

