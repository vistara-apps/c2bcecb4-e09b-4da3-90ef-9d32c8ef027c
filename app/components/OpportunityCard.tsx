'use client';

import { Opportunity } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Users, Calendar, Trophy } from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/lib/utils';

interface OpportunityCardProps {
  opportunity: Opportunity;
  userBadges?: string[];
  onApply?: (opportunityId: string) => void;
}

export function OpportunityCard({ opportunity, userBadges = [], onApply }: OpportunityCardProps) {
  const hasRequiredBadges = opportunity.requiredBadges.every(badge =>
    userBadges.includes(badge)
  );

  const isExpired = new Date() > opportunity.expiryDate;
  const progressPercentage = opportunity.maxApplicants
    ? (opportunity.applicants / opportunity.maxApplicants) * 100
    : 0;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'airdrop': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'beta': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'bounty': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'exclusive': return 'bg-gold-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'airdrop': return '🎁';
      case 'beta': return '🧪';
      case 'bounty': return '💰';
      case 'exclusive': return '👑';
      default: return '🎯';
    }
  };

  return (
    <Card className="glass-card hover:bg-surface/90 transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{getTypeIcon(opportunity.type)}</span>
              <Badge className={`text-xs ${getTypeColor(opportunity.type)}`}>
                {opportunity.type.toUpperCase()}
              </Badge>
              {isExpired && (
                <Badge variant="destructive" className="text-xs">
                  EXPIRED
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{opportunity.title}</CardTitle>
            <CardDescription className="mt-1">
              {opportunity.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Required Badges */}
        <div>
          <h4 className="text-sm font-medium text-fg mb-2">Required Badges:</h4>
          <div className="flex flex-wrap gap-1">
            {opportunity.requiredBadges.map((badge) => (
              <Badge
                key={badge}
                variant={userBadges.includes(badge) ? "default" : "secondary"}
                className={`text-xs ${
                  userBadges.includes(badge)
                    ? 'bg-accent text-black'
                    : 'bg-surface text-text-secondary'
                }`}
              >
                {badge.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Reward */}
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-fg">Reward:</span>
          <span className="text-sm text-accent">{opportunity.reward}</span>
        </div>

        {/* Application Progress */}
        {opportunity.maxApplicants && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-secondary">Applications</span>
              <span className="text-fg">
                {opportunity.applicants} / {opportunity.maxApplicants}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{opportunity.applicants} applicants</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Expires {formatRelativeTime(opportunity.expiryDate)}</span>
          </div>
        </div>

        {/* Posted By */}
        <div className="text-xs text-text-secondary">
          Posted by: {opportunity.postedBy}
        </div>

        {/* Action Button */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onApply?.(opportunity.id)}
            disabled={!hasRequiredBadges || isExpired}
            className="flex-1"
            size="sm"
          >
            {hasRequiredBadges ? 'Apply Now' : 'Missing Badges'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(opportunity.applicationLink, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>

        {!hasRequiredBadges && (
          <p className="text-xs text-orange-400">
            You need the required badges to apply for this opportunity.
          </p>
        )}

        {isExpired && (
          <p className="text-xs text-red-400">
            This opportunity has expired.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

