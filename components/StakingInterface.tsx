'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { WalletConnector } from './WalletConnector'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { Coins, TrendingUp, Clock, Award } from 'lucide-react'

interface StakingInfo {
  stakedAmount: number
  pendingRewards: number
  apy: number
  unstakingPeriod: number
  lastRewardClaim: Date
}

export function StakingInterface() {
  const { isConnected } = useAccount()
  const [stakeAmount, setStakeAmount] = useState('')
  const [unstakeAmount, setUnstakeAmount] = useState('')
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  // Mock staking data - in production, this would come from the API
  const stakingInfo: StakingInfo = {
    stakedAmount: 1250,
    pendingRewards: 45.67,
    apy: 12.5,
    unstakingPeriod: 7 * 24 * 60 * 60, // 7 days in seconds
    lastRewardClaim: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  }

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return

    setIsStaking(true)
    try {
      // In production, this would call the staking API
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully staked ${stakeAmount} $RVCH tokens!`)
      setStakeAmount('')
    } catch (error) {
      console.error('Staking error:', error)
    } finally {
      setIsStaking(false)
    }
  }

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return

    setIsUnstaking(true)
    try {
      // In production, this would call the unstaking API
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Unstaking initiated for ${unstakeAmount} $RVCH tokens. Funds will be available in 7 days.`)
      setUnstakeAmount('')
    } catch (error) {
      console.error('Unstaking error:', error)
    } finally {
      setIsUnstaking(false)
    }
  }

  const handleClaimRewards = async () => {
    try {
      // In production, this would call the claim rewards API
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully claimed ${stakingInfo.pendingRewards} $RVCH rewards!`)
    } catch (error) {
      console.error('Claim rewards error:', error)
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
        <h1 className="text-4xl font-bold gradient-text mb-4">$RVCH Token Staking</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Stake your $RVCH tokens to earn rewards, participate in governance, and unlock premium features.
        </p>
      </div>

      {/* Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staked Amount</CardTitle>
            <Coins className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(stakingInfo.stakedAmount)}
            </div>
            <p className="text-xs text-text-secondary">$RVCH tokens</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Rewards</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatNumber(stakingInfo.pendingRewards)}
            </div>
            <p className="text-xs text-text-secondary">$RVCH tokens</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stakingInfo.apy}%
            </div>
            <p className="text-xs text-text-secondary">Annual percentage yield</p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unstaking Period</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-text-secondary">Days to unstake</p>
          </CardContent>
        </Card>
      </div>

      {/* Staking Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stake Tokens */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>Stake $RVCH Tokens</CardTitle>
            <CardDescription>
              Lock your tokens to earn rewards and governance rights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Amount to Stake ($RVCH)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                min="10"
                step="0.01"
              />
              <p className="text-xs text-text-secondary mt-1">
                Minimum stake: 10 $RVCH
              </p>
            </div>
            <Button
              onClick={handleStake}
              disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) < 10}
              className="w-full btn-primary"
            >
              {isStaking ? 'Staking...' : 'Stake Tokens'}
            </Button>
          </CardContent>
        </Card>

        {/* Unstake Tokens */}
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>Unstake $RVCH Tokens</CardTitle>
            <CardDescription>
              Initiate unstaking process (7-day waiting period)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Amount to Unstake ($RVCH)
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                max={stakingInfo.stakedAmount.toString()}
                step="0.01"
              />
              <p className="text-xs text-text-secondary mt-1">
                Available: {formatNumber(stakingInfo.stakedAmount)} $RVCH
              </p>
            </div>
            <Button
              onClick={handleUnstake}
              disabled={isUnstaking || !unstakeAmount || parseFloat(unstakeAmount) > stakingInfo.stakedAmount}
              variant="outline"
              className="w-full"
            >
              {isUnstaking ? 'Initiating Unstake...' : 'Unstake Tokens'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Claim Rewards */}
      {stakingInfo.pendingRewards > 0 && (
        <Card className="metric-card">
          <CardHeader>
            <CardTitle>Claim Rewards</CardTitle>
            <CardDescription>
              Claim your accumulated staking rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pending Rewards:</span>
              <span className="text-lg font-bold text-accent">
                {formatNumber(stakingInfo.pendingRewards)} $RVCH
              </span>
            </div>
            <Button onClick={handleClaimRewards} className="w-full btn-primary">
              Claim Rewards
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Staking Benefits */}
      <Card className="metric-card">
        <CardHeader>
          <CardTitle>Staking Benefits</CardTitle>
          <CardDescription>
            What you get by staking your $RVCH tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="p-2">
                  <Award className="w-4 h-4" />
                </Badge>
                <div>
                  <h4 className="font-semibold">Governance Rights</h4>
                  <p className="text-sm text-text-secondary">
                    Vote on platform decisions and proposals
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="p-2">
                  <TrendingUp className="w-4 h-4" />
                </Badge>
                <div>
                  <h4 className="font-semibold">Reward Earnings</h4>
                  <p className="text-sm text-text-secondary">
                    Earn {stakingInfo.apy}% APY on staked tokens
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="p-2">
                  <Coins className="w-4 h-4" />
                </Badge>
                <div>
                  <h4 className="font-semibold">Premium Features</h4>
                  <p className="text-sm text-text-secondary">
                    Access exclusive opportunities and analytics
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="p-2">
                  <Clock className="w-4 h-4" />
                </Badge>
                <div>
                  <h4 className="font-semibold">Platform Governance</h4>
                  <p className="text-sm text-text-secondary">
                    Shape the future of RepVouch DAO
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

