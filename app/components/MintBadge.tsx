'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Badge, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MintBadgeProps {
  onBadgeMinted?: (tokenId: string) => void;
}

export function MintBadge({ onBadgeMinted }: MintBadgeProps) {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string>('');

  const badgeTypes = [
    {
      id: 'reputation-badge',
      name: 'Reputation Badge',
      description: 'Mint your current reputation score as an NFT',
      icon: '🏆',
    },
    {
      id: 'achievement-badge',
      name: 'Achievement Badge',
      description: 'Special achievement badge for milestones',
      icon: '⭐',
    },
    {
      id: 'community-badge',
      name: 'Community Badge',
      description: 'Badge for active community participation',
      icon: '🤝',
    },
  ];

  const handleMint = async (badgeType: string) => {
    if (!isConnected || !address) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to mint badges.',
        variant: 'destructive',
      });
      return;
    }

    setIsMinting(true);
    setSelectedBadge(badgeType);

    try {
      const response = await fetch('/api/nft/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress: address,
          badgeType,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Badge minted successfully!',
          description: `Your ${badgeType} NFT has been minted with token ID ${result.data.tokenId}`,
        });

        onBadgeMinted?.(result.data.tokenId);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Minting error:', error);
      toast({
        title: 'Minting failed',
        description: 'There was an error minting your badge. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsMinting(false);
      setSelectedBadge('');
    }
  };

  if (!isConnected) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="w-5 h-5 text-accent" />
            Mint Reputation Badge
          </CardTitle>
          <CardDescription>
            Connect your wallet to mint your reputation as an NFT badge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">
            Minting your reputation score creates a verifiable, on-chain credential that you can use to access exclusive opportunities.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Mint Your Badge
        </CardTitle>
        <CardDescription>
          Choose a badge type to mint as an NFT on Base
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {badgeTypes.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center justify-between p-4 border border-gray-700/50 rounded-lg hover:bg-surface/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <h4 className="font-medium text-fg">{badge.name}</h4>
                <p className="text-sm text-text-secondary">{badge.description}</p>
              </div>
            </div>
            <Button
              onClick={() => handleMint(badge.id)}
              disabled={isMinting}
              variant="outline"
              size="sm"
              className="min-w-[100px]"
            >
              {isMinting && selectedBadge === badge.id ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting...
                </>
              ) : (
                'Mint'
              )}
            </Button>
          </div>
        ))}

        <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="w-4 h-4 text-accent" />
            <span className="font-medium text-sm">About Badge NFTs</span>
          </div>
          <p className="text-xs text-text-secondary">
            Badge NFTs are soulbound tokens that cannot be transferred. They serve as verifiable proof of your on-chain reputation and achievements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

