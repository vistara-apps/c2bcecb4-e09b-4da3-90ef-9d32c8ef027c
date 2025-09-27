'use client';

import { useState } from 'react';
import { Coins, Lock, TrendingUp, Info } from 'lucide-react';

interface StakingInputProps {
  variant?: 'small' | 'large';
  balance?: number;
  stakedAmount?: number;
  onStake?: (amount: number) => void;
  onUnstake?: (amount: number) => void;
}

export function StakingInput({ 
  variant = 'large', 
  balance = 0, 
  stakedAmount = 0,
  onStake,
  onUnstake 
}: StakingInputProps) {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'stake' | 'unstake'>('stake');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      if (mode === 'stake' && onStake) {
        onStake(numAmount);
      } else if (mode === 'unstake' && onUnstake) {
        onUnstake(numAmount);
      }
      setAmount('');
    }
  };

  const maxAmount = mode === 'stake' ? balance : stakedAmount;

  if (variant === 'small') {
    return (
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Coins className="w-5 h-5 text-accent" />
          <h4 className="font-semibold text-fg">Quick Stake</h4>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full px-3 py-2 bg-surface border border-gray-700 rounded-lg text-fg placeholder-text-secondary focus:border-accent focus:outline-none"
          />
          <button type="submit" className="btn-primary w-full text-sm py-2">
            Stake $RVCH
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Lock className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-fg">Stake $RVCH</h3>
          <p className="text-sm text-text-secondary">Earn rewards and governance rights</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-surface/50 rounded-lg text-center">
          <div className="text-2xl font-bold text-accent">{balance.toFixed(2)}</div>
          <div className="text-xs text-text-secondary">Available</div>
        </div>
        <div className="p-4 bg-surface/50 rounded-lg text-center">
          <div className="text-2xl font-bold text-accent">{stakedAmount.toFixed(2)}</div>
          <div className="text-xs text-text-secondary">Staked</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('stake')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'stake'
              ? 'bg-accent text-black'
              : 'bg-surface text-text-secondary hover:bg-surface/80'
          }`}
        >
          Stake
        </button>
        <button
          onClick={() => setMode('unstake')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
            mode === 'unstake'
              ? 'bg-accent text-black'
              : 'bg-surface text-text-secondary hover:bg-surface/80'
          }`}
        >
          Unstake
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-text-secondary">Amount</label>
            <button
              type="button"
              onClick={() => setAmount(maxAmount.toString())}
              className="text-xs text-accent hover:text-yellow-400 transition-colors"
            >
              Max: {maxAmount.toFixed(2)}
            </button>
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              max={maxAmount}
              className="w-full px-4 py-3 bg-surface border border-gray-700 rounded-lg text-fg placeholder-text-secondary focus:border-accent focus:outline-none pr-16"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
              $RVCH
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-accent/5 rounded-lg border border-accent/20">
          <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <div className="text-xs text-text-secondary">
            {mode === 'stake' 
              ? 'Staked tokens earn rewards and provide governance voting power. Unstaking has a 7-day cooldown period.'
              : 'Unstaking will start a 7-day cooldown period. You will stop earning rewards immediately.'
            }
          </div>
        </div>

        <button
          type="submit"
          disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          {mode === 'stake' ? 'Stake Tokens' : 'Unstake Tokens'}
        </button>
      </form>

      <div className="mt-4 p-3 bg-surface/30 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">Estimated APY</span>
          <span className="font-semibold text-green-400">12.5%</span>
        </div>
      </div>
    </div>
  );
}
