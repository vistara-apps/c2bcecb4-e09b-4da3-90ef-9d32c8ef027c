'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Coins, TrendingUp, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface StakingInfo {
  stakedAmount: string;
  rewards: string;
  apy: number;
  unstakingPeriod: number;
}

export function StakingInterface() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      loadStakingInfo();
    } else {
      setStakingInfo(null);
      setLoading(false);
    }
  }, [isConnected, address]);

  const loadStakingInfo = async () => {
    try {
      // In production, this would fetch real staking data
      // For demo, we'll use mock data
      setStakingInfo({
        stakedAmount: '1250.50',
        rewards: '45.25',
        apy: 12.5,
        unstakingPeriod: 7 * 24 * 60 * 60, // 7 days in seconds
      });
    } catch (error) {
      console.error('Failed to load staking info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid stake amount.',
        variant: 'destructive',
      });
      return;
    }

    setIsStaking(true);
    try {
      const response = await fetch('/api/staking/stake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: stakeAmount,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Staking successful!',
          description: `Successfully staked ${stakeAmount} $RVCH tokens.`,
        });
        setStakeAmount('');
        loadStakingInfo(); // Refresh data
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Staking error:', error);
      toast({
        title: 'Staking failed',
        description: 'There was an error staking your tokens. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid unstake amount.',
        variant: 'destructive',
      });
      return;
    }

    setIsUnstaking(true);
    try {
      const response = await fetch('/api/staking/unstake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: unstakeAmount,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Unstaking initiated!',
          description: `Unstaking ${unstakeAmount} $RVCH tokens. Funds will be available after ${result.data.unstakingPeriod / (24 * 60 * 60)} days.`,
        });
        setUnstakeAmount('');
        loadStakingInfo(); // Refresh data
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Unstaking error:', error);
      toast({
        title: 'Unstaking failed',
        description: 'There was an error unstaking your tokens. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUnstaking(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-accent" />
            Token Staking
          </CardTitle>
          <CardDescription>
            Connect your wallet to stake $RVCH tokens and earn rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">
            Staking allows you to earn rewards while participating in platform governance.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Staking Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Staking Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-surface/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {stakingInfo?.stakedAmount || '0'}
              </div>
              <div className="text-sm text-text-secondary">$RVCH Staked</div>
            </div>
            <div className="text-center p-4 bg-surface/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {stakingInfo?.rewards || '0'}
              </div>
              <div className="text-sm text-text-secondary">Rewards Earned</div>
            </div>
            <div className="text-center p-4 bg-surface/50 rounded-lg">
              <div className="text-2xl font-bold text-accent">
                {stakingInfo?.apy || 0}%
              </div>
              <div className="text-sm text-text-secondary">Current APY</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stake Tokens */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Stake Tokens</CardTitle>
          <CardDescription>
            Stake your $RVCH tokens to earn rewards and participate in governance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stake-amount">Amount to Stake</Label>
            <div className="flex gap-2">
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.00"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleStake}
                disabled={isStaking || !stakeAmount}
                className="min-w-[100px]"
              >
                {isStaking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Staking...
                  </>
                ) : (
                  'Stake'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unstake Tokens */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400" />
            Unstake Tokens
          </CardTitle>
          <CardDescription>
            Unstake your tokens with a {stakingInfo?.unstakingPeriod ? Math.floor(stakingInfo.unstakingPeriod / (24 * 60 * 60)) : 7} day waiting period
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unstake-amount">Amount to Unstake</Label>
            <div className="flex gap-2">
              <Input
                id="unstake-amount"
                type="number"
                placeholder="0.00"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleUnstake}
                disabled={isUnstaking || !unstakeAmount}
                variant="outline"
                className="min-w-[100px]"
              >
                {isUnstaking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Unstaking...
                  </>
                ) : (
                  'Unstake'
                )}
              </Button>
            </div>
          </div>

          <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-medium">Unstaking Period</span>
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Tokens will be locked for {stakingInfo?.unstakingPeriod ? Math.floor(stakingInfo.unstakingPeriod / (24 * 60 * 60)) : 7} days after unstaking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

