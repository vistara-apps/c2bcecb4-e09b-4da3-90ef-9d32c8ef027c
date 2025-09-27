'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Vote, Plus, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { formatDate, formatRelativeTime } from '@/lib/utils';

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  voteStart: Date;
  voteEnd: Date;
  forVotes: string;
  againstVotes: string;
  abstainVotes: string;
  executed: boolean;
  status: 'active' | 'passed' | 'failed' | 'executed';
}

export function GovernancePanel() {
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [votingProposal, setVotingProposal] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (isConnected) {
      loadProposals();
    }
  }, [isConnected]);

  const loadProposals = async () => {
    try {
      const response = await fetch('/api/governance/proposals');
      const result = await response.json();

      if (result.success) {
        setProposals(result.data.proposals.map((p: any) => ({
          ...p,
          voteStart: new Date(p.voteStart),
          voteEnd: new Date(p.voteEnd),
        })));
      }
    } catch (error) {
      console.error('Failed to load proposals:', error);
      toast({
        title: 'Error loading proposals',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (proposalId: string, support: number) => {
    setVotingProposal(proposalId);
    try {
      const response = await fetch('/api/governance/proposals', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId,
          support,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Vote cast successfully!',
          description: 'Your vote has been recorded on-chain.',
        });
        loadProposals(); // Refresh proposals
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Voting error:', error);
      toast({
        title: 'Voting failed',
        description: 'There was an error casting your vote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setVotingProposal(null);
    }
  };

  const handleCreateProposal = async () => {
    if (!newProposal.title || !newProposal.description) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in both title and description.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch('/api/governance/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newProposal.title,
          description: newProposal.description,
          calldata: '0x', // Empty calldata for demo
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Proposal created!',
          description: 'Your proposal has been submitted to the governance system.',
        });
        setNewProposal({ title: '', description: '' });
        setIsCreateDialogOpen(false);
        loadProposals(); // Refresh proposals
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Proposal creation error:', error);
      toast({
        title: 'Proposal creation failed',
        description: 'There was an error creating your proposal. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'passed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'executed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'executed': return <CheckCircle className="w-4 h-4" />;
      default: return <Vote className="w-4 h-4" />;
    }
  };

  if (!isConnected) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
          <Vote className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-semibold text-fg mb-2">DAO Governance</h3>
        <p className="text-text-secondary">
          Connect your wallet to participate in platform governance and vote on proposals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-fg">DAO Governance</h2>
          <p className="text-text-secondary">
            Vote on proposals and shape the future of RepVouch DAO
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
              <DialogDescription>
                Submit a proposal for the community to vote on. Make sure your proposal is clear and actionable.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title</Label>
                <Input
                  id="title"
                  placeholder="Enter proposal title..."
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Proposal Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your proposal in detail..."
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateProposal}>
                  Create Proposal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Proposals */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : proposals.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-surface/50 rounded-full flex items-center justify-center mb-4">
            <Vote className="w-8 h-8 text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-fg mb-2">No proposals yet</h3>
          <p className="text-text-secondary mb-4">
            Be the first to create a proposal for the community to vote on.
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create First Proposal
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const totalVotes = parseFloat(proposal.forVotes) + parseFloat(proposal.againstVotes) + parseFloat(proposal.abstainVotes);
            const forPercentage = totalVotes > 0 ? (parseFloat(proposal.forVotes) / totalVotes) * 100 : 0;
            const againstPercentage = totalVotes > 0 ? (parseFloat(proposal.againstVotes) / totalVotes) * 100 : 0;
            const abstainPercentage = totalVotes > 0 ? (parseFloat(proposal.abstainVotes) / totalVotes) * 100 : 0;

            const isActive = proposal.status === 'active';
            const hasEnded = new Date() > proposal.voteEnd;

            return (
              <Card key={proposal.id} className="glass-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(proposal.status)}
                        <Badge className={`text-xs ${getStatusColor(proposal.status)}`}>
                          {proposal.status.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {proposal.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Voting Progress */}
                  {totalVotes > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">For: {proposal.forVotes}</span>
                        <span className="text-red-400">Against: {proposal.againstVotes}</span>
                        <span className="text-gray-400">Abstain: {proposal.abstainVotes}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>For ({forPercentage.toFixed(1)}%)</span>
                          <span>Against ({againstPercentage.toFixed(1)}%)</span>
                        </div>
                        <div className="flex gap-1">
                          <div
                            className="h-2 bg-green-500 rounded-l"
                            style={{ width: `${forPercentage}%` }}
                          />
                          <div
                            className="h-2 bg-red-500"
                            style={{ width: `${againstPercentage}%` }}
                          />
                          <div
                            className="h-2 bg-gray-500 rounded-r"
                            style={{ width: `${abstainPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Proposal Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Proposed by:</span>
                      <div className="font-mono text-xs">{proposal.proposer}</div>
                    </div>
                    <div>
                      <span className="text-text-secondary">
                        {isActive ? 'Voting ends:' : 'Voting ended:'}
                      </span>
                      <div>{formatRelativeTime(proposal.voteEnd)}</div>
                    </div>
                  </div>

                  {/* Voting Actions */}
                  {isActive && !hasEnded && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleVote(proposal.id, 1)}
                        disabled={votingProposal === proposal.id}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        {votingProposal === proposal.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Vote For
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, 0)}
                        disabled={votingProposal === proposal.id}
                        variant="destructive"
                        className="flex-1"
                        size="sm"
                      >
                        {votingProposal === proposal.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <XCircle className="w-4 h-4 mr-2" />
                        )}
                        Vote Against
                      </Button>
                    </div>
                  )}

                  {hasEnded && isActive && (
                    <div className="text-center text-sm text-text-secondary">
                      Voting has ended. Results will be finalized soon.
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

