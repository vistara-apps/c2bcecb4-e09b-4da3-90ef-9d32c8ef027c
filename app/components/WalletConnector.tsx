'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Address } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import { Wallet as WalletIcon, Shield, Zap } from 'lucide-react';

interface WalletConnectorProps {
  variant?: 'default' | 'compact';
}

export function WalletConnector({ variant = 'default' }: WalletConnectorProps) {
  const { isConnected } = useAccount();

  if (variant === 'compact') {
    return (
      <Wallet>
        <ConnectWallet>
          {isConnected ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-accent/20">
              <Avatar className="w-6 h-6" />
              <Name className="text-sm font-medium" />
            </div>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors">
              <WalletIcon className="w-4 h-4" />
              Connect
            </button>
          )}
        </ConnectWallet>
      </Wallet>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent/10 rounded-lg">
          <Shield className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-fg">Wallet Connection</h3>
          <p className="text-sm text-text-secondary">Connect to start building your reputation</p>
        </div>
      </div>

      <Wallet>
        <ConnectWallet>
          {isConnected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <Avatar className="w-12 h-12" />
                <div className="flex-1">
                  <Name className="text-lg font-semibold text-fg" />
                  <Address className="text-sm text-text-secondary font-mono" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  Connected
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-surface/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">0</div>
                  <div className="text-xs text-text-secondary">Badges</div>
                </div>
                <div className="p-3 bg-surface/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">--</div>
                  <div className="text-xs text-text-secondary">Score</div>
                </div>
                <div className="p-3 bg-surface/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">0</div>
                  <div className="text-xs text-text-secondary">$RVCH</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h4 className="font-semibold text-fg mb-2">Connect Your Wallet</h4>
                <p className="text-sm text-text-secondary mb-4">
                  Connect your Base wallet to start analyzing your on-chain reputation
                </p>
                <button className="btn-primary w-full">
                  Connect Wallet
                </button>
              </div>
            </div>
          )}
        </ConnectWallet>
      </Wallet>
    </div>
  );
}
