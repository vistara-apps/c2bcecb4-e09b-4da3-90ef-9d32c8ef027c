'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Navigation } from './components/Navigation';
import { WalletConnector } from './components/WalletConnector';
import { BadgeCard } from './components/BadgeCard';
import { OpportunityCard } from './components/OpportunityCard';
import { StakingInput } from './components/StakingInput';
import { ProgressBar } from './components/ProgressBar';
import { 
  TrendingUp, 
  Award, 
  Users, 
  Zap, 
  ArrowRight, 
  Star,
  Shield,
  Target,
  Coins
} from 'lucide-react';

// Mock data
const mockBadges = [
  {
    id: '1',
    title: 'DeFi Pioneer',
    description: 'Completed over 100 DeFi transactions across multiple protocols',
    type: 'defi' as const,
    score: 850,
    rarity: 'rare' as const,
    mintedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'NFT Collector',
    description: 'Owns 25+ NFTs from verified collections',
    type: 'nft' as const,
    score: 650,
    rarity: 'common' as const,
  },
  {
    id: '3',
    title: 'Governance Participant',
    description: 'Voted in 10+ DAO proposals',
    type: 'governance' as const,
    score: 750,
    rarity: 'epic' as const,
  },
];

const mockOpportunities = [
  {
    id: '1',
    title: 'Base Summer Airdrop',
    description: 'Exclusive airdrop for early Base adopters with proven DeFi activity',
    reward: '500 BASE tokens',
    requiredBadges: ['DeFi Pioneer'],
    applicants: 1247,
    maxApplicants: 5000,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    postedBy: 'Base Protocol',
    applicationLink: '#',
    type: 'airdrop' as const,
  },
  {
    id: '2',
    title: 'NFT Marketplace Beta',
    description: 'Get early access to the next-gen NFT marketplace',
    reward: 'Beta Access + 100 USDC',
    requiredBadges: ['NFT Collector'],
    applicants: 89,
    maxApplicants: 200,
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    postedBy: 'OpenSea',
    applicationLink: '#',
    type: 'beta' as const,
  },
];

export default function Dashboard() {
  const { isConnected } = useAccount();
  const [reputationScore, setReputationScore] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate reputation analysis
  useEffect(() => {
    if (isConnected && reputationScore === 0) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        setReputationScore(1250);
        setIsAnalyzing(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, reputationScore]);

  const handleAnalyzeReputation = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setReputationScore(1250);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleMintBadge = (badgeId: string) => {
    console.log('Minting badge:', badgeId);
    // Implement badge minting logic
  };

  const handleStake = (amount: number) => {
    console.log('Staking:', amount);
    // Implement staking logic
  };

  const handleUnstake = (amount: number) => {
    console.log('Unstaking:', amount);
    // Implement unstaking logic
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="lg:ml-64">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Verify Your On-Chain Reputation
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">RepVouch</span> DAO
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
              Transform your on-chain activity into verifiable reputation badges and unlock exclusive Web3 opportunities.
            </p>
            
            {!isConnected && (
              <div className="max-w-md mx-auto">
                <WalletConnector />
              </div>
            )}
          </div>

          {isConnected && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="metric-card text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {isAnalyzing ? '...' : reputationScore.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Reputation Score</div>
                </div>

                <div className="metric-card text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {mockBadges.filter(b => b.mintedAt).length}
                  </div>
                  <div className="text-sm text-text-secondary">Badges Earned</div>
                </div>

                <div className="metric-card text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {mockOpportunities.length}
                  </div>
                  <div className="text-sm text-text-secondary">Available Opportunities</div>
                </div>

                <div className="metric-card text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Coins className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">0</div>
                  <div className="text-sm text-text-secondary">$RVCH Staked</div>
                </div>
              </div>

              {/* Reputation Analysis */}
              {reputationScore === 0 && (
                <div className="glass-card p-8 text-center mb-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold text-fg mb-3">Analyze Your Reputation</h2>
                  <p className="text-text-secondary mb-6 max-w-md mx-auto">
                    Let our AI analyze your on-chain activity across multiple blockchains to generate your reputation score.
                  </p>
                  <button
                    onClick={handleAnalyzeReputation}
                    disabled={isAnalyzing}
                    className="btn-primary"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                  </button>
                </div>
              )}

              {/* Reputation Progress */}
              {reputationScore > 0 && (
                <div className="glass-card p-6 mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-fg">Reputation Progress</h2>
                    <div className="text-2xl font-bold text-accent">{reputationScore}</div>
                  </div>
                  <ProgressBar
                    value={reputationScore}
                    max={2000}
                    variant="labeled"
                    label="Next Level: Expert (2000)"
                    color="accent"
                  />
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-400">DeFi</div>
                      <div className="text-sm text-text-secondary">Strong</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-blue-400">NFTs</div>
                      <div className="text-sm text-text-secondary">Moderate</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-400">Governance</div>
                      <div className="text-sm text-text-secondary">Growing</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Available Badges */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-fg">Available Badges</h2>
                    <a href="/badges" className="flex items-center gap-1 text-accent hover:text-yellow-400 transition-colors">
                      View All <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {mockBadges.slice(0, 4).map((badge) => (
                      <BadgeCard
                        key={badge.id}
                        badge={badge}
                        onMint={() => handleMintBadge(badge.id)}
                      />
                    ))}
                  </div>

                  {/* Featured Opportunities */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-fg">Featured Opportunities</h2>
                    <a href="/opportunities" className="flex items-center gap-1 text-accent hover:text-yellow-400 transition-colors">
                      View All <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="space-y-6">
                    {mockOpportunities.slice(0, 2).map((opportunity) => (
                      <OpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        variant="detailed"
                        userBadges={mockBadges.filter(b => b.mintedAt).map(b => b.title)}
                      />
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Staking */}
                  <StakingInput
                    balance={1000}
                    stakedAmount={250}
                    onStake={handleStake}
                    onUnstake={handleUnstake}
                  />

                  {/* Quick Stats */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-fg mb-4">Platform Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Total Users</span>
                        <span className="font-semibold text-fg">12,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Badges Minted</span>
                        <span className="font-semibold text-fg">45,231</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Opportunities</span>
                        <span className="font-semibold text-fg">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">$RVCH Staked</span>
                        <span className="font-semibold text-accent">2.4M</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-fg mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-text-secondary">Badge minted: DeFi Pioneer</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-text-secondary">Applied to Base Summer Airdrop</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-text-secondary">Staked 250 $RVCH tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
