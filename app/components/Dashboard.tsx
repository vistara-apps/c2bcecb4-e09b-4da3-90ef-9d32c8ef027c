'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { TrendingUp, Award, Coins, Search, Vote, Loader2, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WalletConnector } from './WalletConnector';
import { calculateReputationLevel, formatNumber } from '@/lib/utils';

interface DashboardData {
  reputationScore: number;
  badges: string[];
  stakedTokens: number;
  rewards: number;
  transactionCount: number;
  opportunitiesAvailable: number;
  activeProposals: number;
}

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && address) {
      loadDashboardData();
    } else {
      setDashboardData(null);
      setLoading(false);
    }
  }, [isConnected, address]);

  const loadDashboardData = async () => {
    try {
      // In production, this would fetch real data from APIs
      // For demo, we'll simulate loading data
      await new Promise(resolve => setTimeout(resolve, 1000));

      setDashboardData({
        reputationScore: 2450,
        badges: ['defi-master', 'nft-collector', 'governance-participant'],
        stakedTokens: 1250.50,
        rewards: 45.25,
        transactionCount: 156,
        opportunitiesAvailable: 12,
        activeProposals: 3,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return <WalletConnector />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const reputationLevel = calculateReputationLevel(dashboardData?.reputationScore || 0);
  const reputationProgress = ((dashboardData?.reputationScore || 0) % 1000) / 10; // Progress to next level

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-fg mb-2">
              Welcome to RepVouch DAO
            </h1>
            <p className="text-text-secondary">
              Transform your on-chain activity into verifiable reputation and unlock exclusive opportunities.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-sm text-text-secondary">Current Level</div>
              <div className="text-2xl font-bold text-accent">{reputationLevel}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {dashboardData?.reputationScore.toLocaleString()}
                </div>
                <div className="text-sm text-text-secondary">Reputation Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {dashboardData?.badges.length}
                </div>
                <div className="text-sm text-text-secondary">Badges Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Coins className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {dashboardData?.stakedTokens.toFixed(2)}
                </div>
                <div className="text-sm text-text-secondary">$RVCH Staked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {dashboardData?.transactionCount}
                </div>
                <div className="text-sm text-text-secondary">Transactions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reputation Progress */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Reputation Progress
          </CardTitle>
          <CardDescription>
            Your journey to becoming a Web3 reputation leader
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-fg">Current Level: {reputationLevel}</span>
            <span className="text-sm text-text-secondary">
              {dashboardData?.reputationScore}/5000 to Master
            </span>
          </div>
          <Progress value={(dashboardData?.reputationScore || 0) / 50} className="h-3" />
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            <div className="text-text-secondary">Beginner</div>
            <div className="text-text-secondary">Intermediate</div>
            <div className="text-text-secondary">Advanced</div>
            <div className="text-text-secondary">Expert</div>
            <div className="text-accent font-medium">Master</div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Badges */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" />
            Your Badges
          </CardTitle>
          <CardDescription>
            Reputation badges you've earned through your on-chain activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {dashboardData?.badges.map((badge) => (
              <Badge key={badge} className="bg-accent/20 text-accent border-accent/30">
                {badge.replace('-', ' ')}
              </Badge>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              <Award className="w-4 h-4 mr-2" />
              Mint New Badge
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card hover:bg-surface/90 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Search className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-fg mb-2">Explore Opportunities</h3>
            <p className="text-sm text-text-secondary mb-4">
              {dashboardData?.opportunitiesAvailable} opportunities available
            </p>
            <Button variant="outline" size="sm">
              View Opportunities
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-surface/90 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Coins className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-fg mb-2">Staking Rewards</h3>
            <p className="text-sm text-text-secondary mb-4">
              Earn {dashboardData?.rewards} $RVCH in rewards
            </p>
            <Button variant="outline" size="sm">
              Manage Staking
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-surface/90 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Vote className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-fg mb-2">DAO Governance</h3>
            <p className="text-sm text-text-secondary mb-4">
              {dashboardData?.activeProposals} active proposals
            </p>
            <Button variant="outline" size="sm">
              Vote Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

