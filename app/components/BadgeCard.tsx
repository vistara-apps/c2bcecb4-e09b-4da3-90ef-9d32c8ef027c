'use client';

import { Award, Star, TrendingUp, Users } from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  type: 'defi' | 'nft' | 'governance' | 'early-adopter';
  score: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  mintedAt?: Date;
}

interface BadgeCardProps {
  badge: Badge;
  variant?: 'display' | 'list-item';
  onMint?: () => void;
}

const badgeIcons = {
  defi: TrendingUp,
  nft: Star,
  governance: Users,
  'early-adopter': Award,
};

const rarityColors = {
  common: 'text-gray-400 border-gray-400/30',
  rare: 'text-blue-400 border-blue-400/30',
  epic: 'text-purple-400 border-purple-400/30',
  legendary: 'text-accent border-accent/30',
};

export function BadgeCard({ badge, variant = 'display', onMint }: BadgeCardProps) {
  const Icon = badgeIcons[badge.type];
  const rarityStyle = rarityColors[badge.rarity];

  if (variant === 'list-item') {
    return (
      <div className="flex items-center gap-4 p-4 glass-card hover:bg-surface/90 transition-all duration-200">
        <div className={`p-2 rounded-lg border ${rarityStyle} bg-current/10`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-fg">{badge.title}</h4>
          <p className="text-sm text-text-secondary">{badge.description}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-accent">{badge.score}</div>
          <div className="text-xs text-text-secondary capitalize">{badge.rarity}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 hover:bg-surface/90 transition-all duration-200 ${badge.mintedAt ? 'badge-glow' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg border ${rarityStyle} bg-current/10`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">{badge.score}</div>
          <div className="text-xs text-text-secondary uppercase tracking-wide">{badge.rarity}</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-fg mb-2">{badge.title}</h3>
      <p className="text-sm text-text-secondary mb-4">{badge.description}</p>

      {badge.mintedAt ? (
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <Award className="w-4 h-4" />
          Minted {badge.mintedAt.toLocaleDateString()}
        </div>
      ) : (
        <button 
          onClick={onMint}
          className="btn-secondary w-full"
        >
          Mint Badge
        </button>
      )}
    </div>
  );
}
