'use client';

import { ExternalLink, Clock, Users, Award, ArrowRight } from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  reward: string;
  requiredBadges: string[];
  applicants: number;
  maxApplicants?: number;
  expiryDate: Date;
  postedBy: string;
  applicationLink: string;
  type: 'airdrop' | 'beta' | 'bounty' | 'exclusive';
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  variant?: 'preview' | 'detailed';
  userBadges?: string[];
}

const typeColors = {
  airdrop: 'bg-green-500/20 text-green-400 border-green-500/30',
  beta: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  bounty: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  exclusive: 'bg-accent/20 text-accent border-accent/30',
};

export function OpportunityCard({ 
  opportunity, 
  variant = 'preview', 
  userBadges = [] 
}: OpportunityCardProps) {
  const isEligible = opportunity.requiredBadges.every(badge => userBadges.includes(badge));
  const daysLeft = Math.ceil((opportunity.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const typeStyle = typeColors[opportunity.type];

  if (variant === 'preview') {
    return (
      <div className="glass-card p-4 hover:bg-surface/90 transition-all duration-200 cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${typeStyle}`}>
            {opportunity.type}
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Clock className="w-3 h-3" />
            {daysLeft}d left
          </div>
        </div>

        <h4 className="font-semibold text-fg mb-2">{opportunity.title}</h4>
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">{opportunity.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-accent">{opportunity.reward}</div>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Users className="w-3 h-3" />
            {opportunity.applicants}
            {opportunity.maxApplicants && `/${opportunity.maxApplicants}`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${typeStyle}`}>
          {opportunity.type}
        </div>
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock className="w-4 h-4" />
          {daysLeft} days left
        </div>
      </div>

      <h3 className="text-xl font-semibold text-fg mb-3">{opportunity.title}</h3>
      <p className="text-text-secondary mb-4">{opportunity.description}</p>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Reward</span>
          <span className="font-semibold text-accent">{opportunity.reward}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Applicants</span>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-text-secondary" />
            <span className="font-medium">
              {opportunity.applicants}
              {opportunity.maxApplicants && `/${opportunity.maxApplicants}`}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Posted by</span>
          <span className="font-medium">{opportunity.postedBy}</span>
        </div>
      </div>

      {opportunity.requiredBadges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-text-secondary mb-2">Required Badges</h4>
          <div className="flex flex-wrap gap-2">
            {opportunity.requiredBadges.map((badge) => (
              <div
                key={badge}
                className={`px-2 py-1 rounded-full text-xs border ${
                  userBadges.includes(badge)
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                <Award className="w-3 h-3 inline mr-1" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        disabled={!isEligible}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isEligible
            ? 'btn-primary'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isEligible ? 'Apply Now' : 'Not Eligible'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
