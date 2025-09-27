'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Search, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { OpportunityCard } from './OpportunityCard';
import { Opportunity } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function OpportunityMarketplace() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    loadOpportunities();
    if (isConnected && address) {
      loadUserBadges();
    }
  }, [isConnected, address]);

  const loadOpportunities = async (loadMore = false) => {
    try {
      const params = new URLSearchParams();
      if (userBadges.length > 0) {
        params.append('badges', userBadges.join(','));
      }
      if (typeFilter !== 'all') {
        params.append('type', typeFilter);
      }
      if (loadMore) {
        params.append('offset', opportunities.length.toString());
      }

      const response = await fetch(`/api/opportunities?${params}`);
      const result = await response.json();

      if (result.success) {
        if (loadMore) {
          setOpportunities(prev => [...prev, ...result.data.opportunities]);
        } else {
          setOpportunities(result.data.opportunities);
        }
        setHasMore(result.data.hasMore);
      }
    } catch (error) {
      console.error('Failed to load opportunities:', error);
      toast({
        title: 'Error loading opportunities',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserBadges = async () => {
    // In production, this would fetch user's actual badges
    // For demo, we'll use mock badges
    setUserBadges(['defi-master', 'nft-collector', 'governance-participant']);
  };

  const handleApply = async (opportunityId: string) => {
    // In production, this would handle the application process
    toast({
      title: 'Application submitted!',
      description: 'Your application has been submitted successfully.',
    });
  };

  const filteredOpportunities = opportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setLoading(true);
    loadOpportunities();
  };

  if (!isConnected) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-fg mb-2">Connect Your Wallet</h3>
        <p className="text-text-secondary">
          Connect your wallet to discover opportunities that match your reputation badges.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-fg">Opportunity Marketplace</h2>
            <p className="text-text-secondary">
              Discover exclusive opportunities based on your reputation badges
            </p>
          </div>
          <div className="flex items-center gap-2">
            {userBadges.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge.replace('-', ' ')}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="airdrop">Airdrops</SelectItem>
              <SelectItem value="beta">Beta Access</SelectItem>
              <SelectItem value="bounty">Bounties</SelectItem>
              <SelectItem value="exclusive">Exclusive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Opportunities Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : filteredOpportunities.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-surface/50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-fg mb-2">No opportunities found</h3>
          <p className="text-text-secondary">
            {searchTerm || typeFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Earn more badges to unlock exclusive opportunities.'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                userBadges={userBadges}
                onApply={handleApply}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button
                onClick={() => loadOpportunities(true)}
                variant="outline"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-accent">{opportunities.length}</div>
          <div className="text-sm text-text-secondary">Available</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {opportunities.filter(o => o.type === 'airdrop').length}
          </div>
          <div className="text-sm text-text-secondary">Airdrops</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {opportunities.filter(o => o.type === 'beta').length}
          </div>
          <div className="text-sm text-text-secondary">Beta Access</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {userBadges.length}
          </div>
          <div className="text-sm text-text-secondary">Your Badges</div>
        </div>
      </div>
    </div>
  );
}

